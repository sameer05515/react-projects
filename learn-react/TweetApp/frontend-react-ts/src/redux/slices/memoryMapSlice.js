import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Define an async thunk to fetch all memory maps
export const fetchMemoryMaps = createAsyncThunk("memoryMaps/fetchMemoryMaps", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/memory-maps`);
  return response.json();
});

// Define an async thunk to create a new memory map
export const createMemoryMap = createAsyncThunk("memoryMaps/createMemoryMap", async (memoryMapData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/memory-maps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memoryMapData),
  });
  return response.json();
});

// Define an async thunk to update a memory map by uniqueId
export const updateMemoryMap = createAsyncThunk("memoryMaps/updateMemoryMap", async (memoryMapData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/memory-maps/${memoryMapData.uniqueId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memoryMapData),
  });
  return response.json();
});

// Define an async thunk to update a memory map by uniqueId, for given skeleton
export const updateMemoryMapForGivenSkeleton = createAsyncThunk("memoryMaps/updateMemoryMap", async (memoryMapData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/memory-maps/${memoryMapData.uniqueId}/append-skeleton`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memoryMapData),
  });
  return response.json();
});

// Define an async thunk to fetch a memory map by uniqueId
export const fetchMemoryMapByUniqueId = createAsyncThunk("memoryMaps/fetchMemoryMapByUniqueId", async (uniqueId) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/memory-maps/${uniqueId}`);
  return response.json();
});

const getNameWithAncestors = (topic) => {
  if (!topic) {
    return "";
  }
  const ancestorNames = [];
  let currentAncestor =
    topic.ancestors?.find((ancestor) => !ancestor.parentId) || null;

  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    const currentId = currentAncestor.uniqueId;
    currentAncestor =
      topic.ancestors?.find((ancestor) => ancestor.parentId === currentId) ||
      null;
  }

  ancestorNames.push(topic.name);
  return ancestorNames.join(" / ");
};

// Helper function to prepare flat data from tree-structured data
// Export for use in selectors
export const prepareMemoryMapsQueue = (list, prevQueue = []) => {
  let queue = [...prevQueue];

  if (list && list.length > 0) {
    list.forEach((m) => {
      queue = [
        ...queue,
        {
          uniqueId: m.uniqueId,
          name: m.name,
          title: getNameWithAncestors(m),
          ancestors: m.ancestors,
          children: m.children,
          _id: m._id,
        },
      ];
      const childQ = prepareMemoryMapsQueue(m.children, []);
      queue = [...queue, ...childQ];
    });
  }

  return queue;
};

const memoryMapSlice = createSlice({
  name: "memoryMaps",
  initialState: {
    selectedMemoryMapUniqueId: null,
    data: [], // Only store tree structure - flatData computed via selector
    searchedData:[],
    searchString:'',
    loading: "idle",
    error: null,
  },
  reducers: {
    setSelectedMemoryMapUniqueId: (state, action) => {
      state.selectedMemoryMapUniqueId = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemoryMaps.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMemoryMaps.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        // flatData now computed via memoized selector
      })
      .addCase(fetchMemoryMaps.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchMemoryMapByUniqueId.fulfilled, (state, action) => {
        state.selectedMemoryMapUniqueId = action.payload.uniqueId;
      })
      .addCase(createMemoryMap.fulfilled, (state, action) => {
        state.data.push(action.payload);
        // flatData now computed via memoized selector
      })
      .addCase(updateMemoryMap.fulfilled, (state, action) => {
        const updatedMemoryMap = action.payload;
        const index = state.data.findIndex(
          (memoryMap) => memoryMap.uniqueId === updatedMemoryMap.uniqueId
        );
        if (index !== -1) {
          state.data[index] = updatedMemoryMap;
          // flatData now computed via memoized selector
        }
      });
  },
});

export default memoryMapSlice.reducer;
export const { setSelectedMemoryMapUniqueId } = memoryMapSlice.actions;

/* ============== Selectors ======================*/
const selectMemoryMapsState = (state) => state.memoryMaps;

export const selectAllTreeMemoryMaps = createSelector(
  selectMemoryMapsState,
  (memoryMapsState) => memoryMapsState.data
);

// Memoized selector to derive flat data from tree structure
export const selectAllFlatMemoryMaps = createSelector(
  [selectAllTreeMemoryMaps],
  (treeMemoryMaps) => prepareMemoryMapsQueue(treeMemoryMaps)
);

export const selectSelectedMemoryMapUniqueId = createSelector(
  selectMemoryMapsState,
  (memoryMapsState) => memoryMapsState.selectedMemoryMapUniqueId
);

export const selectNextMemoryMapUniqueId = createSelector(
  [selectAllFlatMemoryMaps, selectSelectedMemoryMapUniqueId],
  (flatMemoryMapList, selectedMemoryMapUId) => {
    const dataLength = flatMemoryMapList?.length || 0;
    const selectedIndex = flatMemoryMapList.findIndex((memoryMap) => memoryMap.uniqueId === selectedMemoryMapUId);
    if (selectedIndex < 0) {
      return null;
    }
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatMemoryMapList[nextIndex].uniqueId;
  }
);

export const selectPrevMemoryMapUniqueId = createSelector(
  [selectAllFlatMemoryMaps, selectSelectedMemoryMapUniqueId],
  (flatMemoryMapList, selectedMemoryMapUId) => {
    const dataLength = flatMemoryMapList?.length || 0;
    const selectedIndex = flatMemoryMapList.findIndex((memoryMap) => memoryMap.uniqueId === selectedMemoryMapUId);
    if (selectedIndex < 0) {
      return null;
    }
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatMemoryMapList[prevIndex].uniqueId;
  }
);

// Combined selector for common memory map state properties (optimizes multiple useSelector calls)
// Use this instead of multiple useSelector calls for memoryMaps, loading, error, and selectedId
export const selectMemoryMapsStateCombined = createSelector(
  [
    selectAllTreeMemoryMaps,
    selectSelectedMemoryMapUniqueId,
    selectMemoryMapsState,
  ],
  (memoryMaps, selectedId, memoryMapsState) => ({
    memoryMaps,
    loading: memoryMapsState.loading,
    error: memoryMapsState.error,
    selectedId,
  })
);
