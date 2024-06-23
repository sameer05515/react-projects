// linksSlice.js
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Create an async thunk to fetch links
export const fetchLinks = createAsyncThunk("links/fetchLinks", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const fetchLinksByUniqueId = createAsyncThunk("links/fetchLinksByUniqueId", async (uniqueId) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links/${uniqueId}`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const createLink = createAsyncThunk("links/createLink", async (tagData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagData),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create the tag: ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
});

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async (updatedLink) => {
    // console.log(`slice: ${JSON.stringify(updatedLink)}`);
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/links/${updatedLink.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLink),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update the tag: ${response.status} - ${response.statusText}`
      );
    }

    return response.json();
  }
);

const getNameWithAncestors = (link) => {
  if (!link) {
      return "";
  }
  let ancestorNames = [];
  let currentAncestor = link.ancestors?.find(
      (ancestor) => !ancestor.parentId
  )||null;
  while (currentAncestor) {
      ancestorNames.push(currentAncestor.name);
      currentAncestor = link.ancestors.find(
          (ancestor) => ancestor.parentId === currentAncestor.uniqueId
      );
  }
  ancestorNames.push(link.name);
  const fullyQualifiedName = ancestorNames.join(" / ");
  return fullyQualifiedName;
};

const prepareLinksQueue = (list, prevQueue = []) => {
  let queue = [...prevQueue];
  
  if (list && list.length > 0) {
      list.forEach((t) => {
          queue = [
              ...queue,
              {
                  uniqueId: t.uniqueId,
                  name: t.name,
                  title: getNameWithAncestors(t),
                  ancestors: t.ancestors,
                  children: t.children,
                  _id: t._id,
              },
          ];
          const childQ = prepareLinksQueue(t.children, []);
          queue = [...queue, ...childQ];
      });
  }
  // console.log(JSON.stringify(queue, null, 2));
  return queue;
};

const linksSlice = createSlice({
  name: "links",
  initialState: {
    selectedLinkUniqueId: null,
    data: [],
    linkDetails: {},
    flatData:[],
    searchedData:[],
    searchString:'',
    loading: "idle",
    error: null,
  },
  reducers: {
    setSelectedLinkUniqueId: (state, action) => {
      state.selectedLinkUniqueId = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;               
        state.flatData = prepareLinksQueue(action.payload);
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message; 
      })
      .addCase(createLink.fulfilled, (state, action) => {
        if(!action.payload?.parentId)
          state.data.push(action.payload);
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        const updatedLink = action.payload;
        const index = state.data.findIndex((link) => link.uniqueId === updatedLink.uniqueId);
        if (index !== -1) {
          state.data[index] = updatedLink;
        }
      })
      .addCase(fetchLinksByUniqueId.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLinksByUniqueId.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.linkDetails = action.payload;
      })
      .addCase(fetchLinksByUniqueId.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default linksSlice.reducer;

// Export the reducer and actions
export const { setSelectedLinkUniqueId,setSearchString } = linksSlice.actions;


/* ============== Selectors ======================*/
const selectLinksState = (state) => state.links;

export const selectAllTreeLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.data
);

export const selectAllFlatLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.flatData
);

export const selectSelectedLinkUniqueId = createSelector(
  selectLinksState,
  (linksState) => linksState.selectedLinkUniqueId
);

export const selectNextLinkUniqueId = createSelector(
  [selectAllFlatLinks, selectSelectedLinkUniqueId],
  (flatLinkList, selectedLinkUId) => {
    const dataLength = flatLinkList?.length || 0;
    const selectedIndex = flatLinkList.findIndex((link) => link.uniqueId === selectedLinkUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatLinkList[nextIndex].uniqueId;
  }
);

export const selectPrevLinkUniqueId = createSelector(
  [selectAllFlatLinks, selectSelectedLinkUniqueId],
  (flatLinkList, selectedLinkUId) => {
    const dataLength = flatLinkList?.length || 0;
    const selectedIndex = flatLinkList.findIndex((link) => link.uniqueId === selectedLinkUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatLinkList[prevIndex].uniqueId;
  }
);
