import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Define an async thunk to fetch all topics
export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics`); // Replace with your API endpoint
  return response.json();
});

// Define an async thunk to create a new topic
export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (topicData) => {
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
  async (topicData) => {
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
  async (sectionData) => {
    console.log(
      `[topicSlice]: [createTopicSection]: sectionData: ${JSON.stringify(
        sectionData
      )}`
    );
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
  async (sectionData) => {
    console.log(
      `[topicSlice]: [updateTopicSectionsById]: sectionData: ${JSON.stringify(
        sectionData
      )}`
    );
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
  async (topicData) => {
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

const getNameWithAncestors = (topic) => {
  if (!topic) {
      return "";
  }
  let ancestorNames = [];
  let currentAncestor = topic.ancestors?.find(
      (ancestor) => !ancestor.parentId
  )||null;
  while (currentAncestor) {
      ancestorNames.push(currentAncestor.name);
      currentAncestor = topic.ancestors.find(
          (ancestor) => ancestor.parentId === currentAncestor.uniqueId
      );
  }
  ancestorNames.push(topic.name);
  const fullyQualifiedName = ancestorNames.join(" / ");
  return fullyQualifiedName;
};

const prepareTopicsQueue = (list, prevQueue = []) => {
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
          const childQ = prepareTopicsQueue(t.children, []);
          queue = [...queue, ...childQ];
      });
  }
  // console.log(JSON.stringify(queue, null, 2));
  return queue;
};

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    selectedTopicUniqueId: null,
    data: [],
    flatData:[],
    searchedData:[],
    searchString:'',
    loading: "idle",
    error: null,
  },
  reducers: {
    setSelectedTopicUniqueId: (state, action) => {
      state.selectedTopicUniqueId = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.flatData = prepareTopicsQueue(action.payload);
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
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
export const { setSelectedTopicUniqueId,setSearchString } = topicSlice.actions;


/* ============== Selectors ======================*/
const selectTopicsState = (state) => state.topics;

export const selectAllTreeTopics = createSelector(
  selectTopicsState,
  (topicsState) => topicsState.data
);

export const selectAllFlatTopics = createSelector(
  selectTopicsState,
  (topicsState) => topicsState.flatData
);

export const selectSelectedTopicUniqueId = createSelector(
  selectTopicsState,
  (topicsState) => topicsState.selectedTopicUniqueId
);

export const selectNextTopicUniqueId = createSelector(
  [selectAllFlatTopics, selectSelectedTopicUniqueId],
  (flatTopicList, selectedTopicUId) => {
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
  (flatTopicList, selectedTopicUId) => {
    const dataLength = flatTopicList?.length || 0;
    const selectedIndex = flatTopicList.findIndex((topic) => topic.uniqueId === selectedTopicUId);
    if (selectedIndex < 0 ) {
      return null
    };
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatTopicList[prevIndex].uniqueId;
  }
);