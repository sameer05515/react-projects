// tagsSlice.js
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Create an async thunk to fetch tags
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/tags`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const createTag = createAsyncThunk("tags/createTag", async (tagData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/tags`, {
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

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async (updatedTag) => {
    // console.log(`slice: ${JSON.stringify(updateTag)}`);
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/tags/${updatedTag.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTag),
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

const getNameWithAncestors = (tag) => {
  if (!tag) {
      return "";
  }
  let ancestorNames = [];
  let currentAncestor = tag.ancestors?.find(
      (ancestor) => !ancestor.parentId
  )||null;
  while (currentAncestor) {
      ancestorNames.push(currentAncestor.name);
      currentAncestor = tag.ancestors.find(
          (ancestor) => ancestor.parentId === currentAncestor.uniqueId
      );
  }
  ancestorNames.push(tag.name);
  const fullyQualifiedName = ancestorNames.join(" / ");
  return fullyQualifiedName;
};

const prepareTagsQueue = (list, prevQueue = []) => {
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
          const childQ = prepareTagsQueue(t.children, []);
          queue = [...queue, ...childQ];
      });
  }
  // console.log(JSON.stringify(queue, null, 2));
  return queue;
};

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
    flatData:[],
    searchedData:[],
    searchString:'',
    selectedTagUniqueId: null
  },
  reducers: {
    setSelectedTagUniqueId: (state, action) => {
      state.selectedTagUniqueId = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;        
        state.flatData = prepareTagsQueue(action.payload);
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
// Export the reducer and actions
export const { setSelectedTagUniqueId,setSearchString } = tagsSlice.actions;

/* ============== Selectors ======================*/
const selectTagsState = (state) => state.tags;

export const selectAllTreeTags = createSelector(
  selectTagsState,
  (tagsState) => tagsState.data
);

export const selectAllFlatTags = createSelector(
  selectTagsState,
  (tagsState) => tagsState.flatData
);

export const selectSelectedTagUniqueId = createSelector(
  selectTagsState,
  (tagsState) => tagsState.selectedTagUniqueId
);

export const selectNextTagUniqueId = createSelector(
  [selectAllFlatTags, selectSelectedTagUniqueId],
  (flatTagList, selectedTagUId) => {
    const dataLength = flatTagList?.length || 0;
    const selectedIndex = flatTagList.findIndex((tag) => tag.uniqueId === selectedTagUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatTagList[nextIndex].uniqueId;
  }
);

export const selectPrevTagUniqueId = createSelector(
  [selectAllFlatTags, selectSelectedTagUniqueId],
  (flatTagList, selectedTagUId) => {
    const dataLength = flatTagList?.length || 0;
    const selectedIndex = flatTagList.findIndex((tag) => tag.uniqueId === selectedTagUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatTagList[prevIndex].uniqueId;
  }
);