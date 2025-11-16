// linksSlice.js
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
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

export const fetchLinksByUniqueId = createAsyncThunk("links/fetchLinksByUniqueId", async (uniqueId: string) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links/${uniqueId}`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const createLink = createAsyncThunk("links/createLink", async (tagData: any) => {
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
  async (updatedLink: { uniqueId: string } & Record<string, any>) => {
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

type LinkNode = {
  uniqueId: string;
  name: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: LinkNode[];
  _id?: string;
};

type FlatLink = {
  uniqueId: string;
  name: string;
  title: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: LinkNode[];
  _id?: string;
};

const getNameWithAncestors = (link: LinkNode | null | undefined) => {
  if (!link) {
    return "";
  }
  const ancestorNames: string[] = [];
  let currentAncestor =
    link.ancestors?.find((ancestor) => !ancestor.parentId) || null;

  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    const currentId = currentAncestor.uniqueId;
    currentAncestor =
      link.ancestors?.find((ancestor) => ancestor.parentId === currentId) ||
      null;
  }

  ancestorNames.push(link.name);
  return ancestorNames.join(" / ");
};

// Helper function to prepare flat data from tree-structured data
// Export for use in selectors
export const prepareLinksQueue = (list: LinkNode[] = [], prevQueue: FlatLink[] = []) => {
  let queue: FlatLink[] = [...prevQueue];
  
  if (list && list.length > 0) {
      list.forEach((t: LinkNode) => {
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
  return queue;
};

type LinksState = {
  selectedLinkUniqueId: string | null;
  data: LinkNode[];
  linkDetails: any;
  searchedData: any[];
  searchString: string;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
};

const linksSlice = createSlice({
  name: "links",
  initialState: {
    selectedLinkUniqueId: null,
    data: [], // Only store tree structure - flatData computed via selector
    linkDetails: {},
    searchedData:[],
    searchString:'',
    loading: "idle",
    error: null,
  } as LinksState,
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
        state.data = action.payload as LinkNode[];
        // flatData now computed via memoized selector
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message ?? null; 
      })
      .addCase(createLink.fulfilled, (state, action) => {
        if(!action.payload?.parentId)
          state.data.push(action.payload as LinkNode);
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        const updatedLink = action.payload as LinkNode;
        const index = state.data.findIndex((link: LinkNode) => link.uniqueId === updatedLink.uniqueId);
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
        state.error = action.error.message ?? null;
      });
  },
});

export default linksSlice.reducer;

// Export the reducer and actions
export const { setSelectedLinkUniqueId,setSearchString } = linksSlice.actions;


/* ============== Selectors ======================*/
const selectLinksState = (state: RootState) => state.links;

export const selectAllTreeLinks = createSelector(
  selectLinksState,
  (linksState) => linksState.data as LinkNode[]
);

// Memoized selector to derive flat data from tree structure
export const selectAllFlatLinks = createSelector(
  [selectAllTreeLinks],
  (treeLinks: LinkNode[]) => prepareLinksQueue(treeLinks)
);

export const selectSelectedLinkUniqueId = createSelector(
  selectLinksState,
  (linksState) => linksState.selectedLinkUniqueId
);

export const selectNextLinkUniqueId = createSelector(
  [selectAllFlatLinks, selectSelectedLinkUniqueId],
  (flatLinkList: FlatLink[], selectedLinkUId: string | null) => {
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
  (flatLinkList: FlatLink[], selectedLinkUId: string | null) => {
    const dataLength = flatLinkList?.length || 0;
    const selectedIndex = flatLinkList.findIndex((link) => link.uniqueId === selectedLinkUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatLinkList[prevIndex].uniqueId;
  }
);

// Combined selector for common link state properties (optimizes multiple useSelector calls)
// Use this instead of multiple useSelector calls for links, loading, error, selectedId, and linkDetails
export const selectLinksStateCombined = createSelector(
  [
    selectAllTreeLinks,
    selectSelectedLinkUniqueId,
    selectLinksState,
  ],
  (links: LinkNode[], selectedId: string | null, linksState: LinksState) => ({
    links,
    loading: linksState.loading,
    error: linksState.error,
    selectedId,
    linkDetails: linksState.linkDetails,
  })
);
