import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BACKEND_APPLICATION_BASE_URL } from '../common/globalConstants';

// Define an async thunk to fetch all topics
export const fetchTopics = createAsyncThunk('topics/fetchTopics', async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics`); // Replace with your API endpoint
  return response.json();
});

// Define an async thunk to create a new topic
export const createTopic = createAsyncThunk('topics/createTopic', async (topicData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topicData),
  });
  return response.json();
});

// Define an async thunk to update a topic by topicId
export const updateTopic = createAsyncThunk('topics/updateTopic', async (topicData) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/topics/${topicData.topicId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topicData),
  });
  return response.json();
});

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        const updatedTopic = action.payload;
        const index = state.data.findIndex((topic) => topic.topicId === updatedTopic.topicId);
        if (index !== -1) {
          state.data[index] = updatedTopic;
        }
      });
  },
});

export default topicSlice.reducer;
