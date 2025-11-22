// tagsSlice.js
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
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

export const createTag = createAsyncThunk("tags/createTag", async (tagData: any) => {
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
  async (updatedTag: { uniqueId: string } & Record<string, any>) => {
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

type TagNode = {
  uniqueId: string;
  name: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TagNode[];
  _id?: string;
};

type FlatTag = {
  uniqueId: string;
  name: string;
  title: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TagNode[];
  _id?: string;
};

const getNameWithAncestors = (tag: TagNode | null | undefined) => {
  if (!tag) {
    return "";
  }
  const ancestorNames: string[] = [];
  let currentAncestor =
    tag.ancestors?.find((ancestor) => !ancestor.parentId) || null;

  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    const currentId = currentAncestor.uniqueId;
    currentAncestor =
      tag.ancestors?.find((ancestor) => ancestor.parentId === currentId) ||
      null;
  }

  ancestorNames.push(tag.name);
  return ancestorNames.join(" / ");
};

// Helper function to prepare flat data from tree-structured data
// Export for use in selectors
export const prepareTagsQueue = (list: TagNode[] = [], prevQueue: FlatTag[] = []) => {
  let queue: FlatTag[] = [...prevQueue];

  if (list && list.length > 0) {
    list.forEach((t: TagNode) => {
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
  return queue;
};

type TagsState = {
  data: TagNode[];
  status: "idle" | "loading" | "succeeded" | "failed"; // ✅ Standardized: changed from loading to status
  error: string | null;
  searchedData: any[];
  searchString: string;
  selectedTagUniqueId: string | null;
};

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    data: [], // Only store tree structure - flatData computed via selector
    status: "idle", // ✅ Standardized: changed from loading to status
    error: null,
    searchedData: [],
    searchString: "",
    selectedTagUniqueId: null,
  } as TagsState,
  reducers: {
    setSelectedTagUniqueId: (state, action) => {
      state.selectedTagUniqueId = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    // ✅ Phase 3: State cleanup actions
    clearTags: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
      state.searchedData = [];
      state.searchString = "";
      state.selectedTagUniqueId = null;
    },
    resetTagsState: (state) => {
      return {
        data: [],
        status: "idle",
        error: null,
        searchedData: [],
        searchString: "",
        selectedTagUniqueId: null,
      } as TagsState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading"; // ✅ Standardized: pending -> loading
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.data = action.payload;
        // flatData now computed via memoized selector
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed"; // ✅ Standardized: rejected -> failed
        state.error = action.error.message ?? null;
      });
  },
});

export default tagsSlice.reducer;
// Export the reducer and actions
export const { setSelectedTagUniqueId, setSearchString, clearTags, resetTagsState } = tagsSlice.actions;

/* ============== Selectors ======================*/
const selectTagsState = (state: RootState) => state.tags;

export const selectAllTreeTags = createSelector(
  selectTagsState,
  (tagsState) => tagsState.data as TagNode[]
);

// Memoized selector to derive flat data from tree structure
export const selectAllFlatTags = createSelector(
  [selectAllTreeTags],
  (treeTags: TagNode[]) => prepareTagsQueue(treeTags)
);

export const selectSelectedTagUniqueId = createSelector(
  selectTagsState,
  (tagsState) => tagsState.selectedTagUniqueId
);

export const selectNextTagUniqueId = createSelector(
  [selectAllFlatTags, selectSelectedTagUniqueId],
  (flatTagList: FlatTag[], selectedTagUId: string | null) => {
    const dataLength = flatTagList?.length || 0;
    const selectedIndex = flatTagList.findIndex(
      (tag) => tag.uniqueId === selectedTagUId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatTagList[nextIndex].uniqueId;
  }
);

export const selectPrevTagUniqueId = createSelector(
  [selectAllFlatTags, selectSelectedTagUniqueId],
  (flatTagList: FlatTag[], selectedTagUId: string | null) => {
    const dataLength = flatTagList?.length || 0;
    const selectedIndex = flatTagList.findIndex(
      (tag) => tag.uniqueId === selectedTagUId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatTagList[prevIndex].uniqueId;
  }
);

/**
 * Optimized selectors - Removed factory pattern that created new selectors on every call
 * Components should use useMemo with selectAllFlatTags instead
 */

// ✅ Stable selector - no factory pattern
export const selectTagsForComboOptions = createSelector(
  [selectAllFlatTags],
  (flatTagList: FlatTag[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.trace("Tag options ka request aaya");
    }
    return (
      flatTagList.map((tag) => ({
        value: tag.uniqueId,
        label: tag.title,
      })) || []
    );
  }
);

// Combined selector for common tag state properties (optimizes multiple useSelector calls)
// Use this instead of multiple useSelector calls for tags, loading, error, and selectedId
export const selectTagsStateCombined = createSelector(
  [
    selectAllTreeTags,
    selectSelectedTagUniqueId,
    selectTagsState,
  ],
  (tags, selectedId, tagsState) => ({
    tags,
    status: tagsState.status, // ✅ Standardized: loading -> status
    error: tagsState.error,
    selectedId,
  })
);
