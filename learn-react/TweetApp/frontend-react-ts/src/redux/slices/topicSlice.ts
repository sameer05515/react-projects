import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Define an async thunk to fetch all topics
export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics`); // Replace with your API endpoint
  return response.json();
});

// Define an async thunk to create a new topic
export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (topicData: any) => {
    const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicData),
    });
    return response.json();
  }
);

export const searchTopic = createAsyncThunk(
  "topics/searchTopic",
  async (topicData: any) => {
    const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicData),
    });
    return response.json();
  }
);

// Define an async thunk to create a new topic
export const createTopicSection = createAsyncThunk(
  "topics/createTopic/Section",
  async (sectionData: { linkedTopicUniqueId: string; uniqueId?: string } & Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[topicSlice]: [createTopicSection]: sectionData: ${JSON.stringify(
          sectionData
        )}`
      );
    }
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/topics/section`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to update a topic by uniqueId
export const updateTopicSectionsById = createAsyncThunk(
  "topics/updateTopicSectionsById",
  async (sectionData: { linkedTopicUniqueId: string; uniqueId: string } & Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[topicSlice]: [updateTopicSectionsById]: sectionData: ${JSON.stringify(
          sectionData
        )}`
      );
    }
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/topics/${sectionData.linkedTopicUniqueId}/sections/${sectionData.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to update a topic by uniqueId
export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async (topicData: { uniqueId: string } & Record<string, any>) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/topics/${topicData.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topicData),
      }
    );
    return response.json();
  }
);

const getNameWithAncestors = (topic: TopicNode | null | undefined) => {
  if (!topic) {
    return "";
  }
  const ancestorNames: string[] = [];
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
export type TopicNode = {
  uniqueId: string;
  name: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TopicNode[];
  _id?: string;
};

export type FlatTopic = {
  uniqueId: string;
  name: string;
  title: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TopicNode[];
  _id?: string;
};

export const prepareTopicsQueue = (list: TopicNode[] = [], prevQueue: FlatTopic[] = []): FlatTopic[] => {
  let queue: FlatTopic[] = [...prevQueue];
  
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
          const childQ = prepareTopicsQueue(t.children, []);
          queue = [...queue, ...childQ];
      });
  }
  return queue;
};

type TopicsState = {
  selectedTopicUniqueId: string | null;
  data: TopicNode[];
  searchedData: any[];
  searchString: string;
  status: "idle" | "loading" | "succeeded" | "failed"; // ✅ Standardized: changed from loading to status
  error: string | null;
};

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    selectedTopicUniqueId: null,
    data: [], // Only store tree structure - flatData computed via selector
    searchedData:[],
    searchString:'',
    status: "idle", // ✅ Standardized: changed from loading to status
    error: null,
  } as TopicsState,
  reducers: {
    setSelectedTopicUniqueId: (state, action) => {
      state.selectedTopicUniqueId = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    },
    // ✅ Phase 3: State cleanup actions
    clearTopics: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
      state.searchedData = [];
      state.searchString = "";
      state.selectedTopicUniqueId = null;
    },
    resetTopicsState: (state) => {
      return {
        selectedTopicUniqueId: null,
        data: [],
        searchedData: [],
        searchString: "",
        status: "idle",
        error: null,
      } as TopicsState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = "loading"; // ✅ Standardized: pending -> loading
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.data = action.payload;
        // flatData now computed via memoized selector
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = "failed"; // ✅ Standardized: rejected -> failed
        state.error = action.error.message ?? null;
      })
      .addCase(searchTopic.fulfilled, (state, action) => {
        //state.loading = "fulfilled";
        state.searchedData = action.payload;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        // state.data.push(action.payload);
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        const updatedTopic = action.payload;
        const index = state.data.findIndex(
          (topic) => topic.uniqueId === updatedTopic.uniqueId
        );
        if (index !== -1) {
          state.data[index] = updatedTopic;
        }
      });
  },
});

// Helper method to get the next topic ID
// const getNextTopicId = (increment = 1) => (state) => {
//   const topicsData = state.topics.data; // Access data directly from state
//   const selectedTopicUniqueId= state.topics.selectedTopicUniqueId;
//   if (topicsData.length === 0 || !selectedTopicUniqueId) {
//     return null; // No topics available
//   }
//   const selectedIndex = topicsData.findIndex(t=>t.uniqueId===selectedTopicUniqueId);
//   const nextIndex=((selectedIndex+topicsData.length+increment)%topicsData.length);
//   console.log(`selectedIndex : ${selectedIndex}, nextIndex : ${nextIndex}`);
//   const nextTopicId = topicsData[nextIndex].uniqueId;
//   return nextTopicId;
// };

// Selector factory function
// const makeGetNextTopicIdSelector = () => {
//   return (increment) => (state) => getNextTopicId(increment)(state);
// };

export default topicSlice.reducer;
// Export the reducer and actions
export const { setSelectedTopicUniqueId, setSearchString, clearTopics, resetTopicsState } = topicSlice.actions;


/* ============== Selectors ======================*/
const selectTopicsState = (state: RootState) => state.topics;

export const selectAllTreeTopics = createSelector(
  selectTopicsState,
  (topicsState) => topicsState.data as TopicNode[]
);

// Memoized selector to derive flat data from tree structure
export const selectAllFlatTopics = createSelector(
  [selectAllTreeTopics],
  (treeTopics: TopicNode[]) => prepareTopicsQueue(treeTopics)
);

export const selectSelectedTopicUniqueId = createSelector(
  selectTopicsState,
  (topicsState) => topicsState.selectedTopicUniqueId
);

export const selectNextTopicUniqueId = createSelector(
  [selectAllFlatTopics, selectSelectedTopicUniqueId],
  (flatTopicList: FlatTopic[], selectedTopicUId: string | null) => {
    const dataLength = flatTopicList?.length || 0;
    const selectedIndex = flatTopicList.findIndex((topic) => topic.uniqueId === selectedTopicUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatTopicList[nextIndex].uniqueId;
  }
);

export const selectPrevTopicUniqueId = createSelector(
  [selectAllFlatTopics, selectSelectedTopicUniqueId],
  (flatTopicList: FlatTopic[], selectedTopicUId: string | null) => {
    const dataLength = flatTopicList?.length || 0;
    const selectedIndex = flatTopicList.findIndex((topic) => topic.uniqueId === selectedTopicUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatTopicList[prevIndex].uniqueId;
  }
);

// Combined selector for common topic state properties (optimizes multiple useSelector calls)
// Use this instead of multiple useSelector calls for topics, loading, error, and selectedId
export const selectTopicsStateCombined = createSelector(
  [
    selectAllTreeTopics,
    selectSelectedTopicUniqueId,
    selectTopicsState,
  ],
  (topics, selectedId, topicsState) => ({
    topics,
    status: topicsState.status, // ✅ Standardized: loading -> status
    error: topicsState.error,
    selectedId,
  })
);