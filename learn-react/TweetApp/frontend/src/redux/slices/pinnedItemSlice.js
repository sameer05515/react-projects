import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";

// Define an async thunk to fetch all topics
export const fetchPinnedItems = createAsyncThunk("pinnedItems/fetchPinnedItems", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/pinned-items`); // Replace with your API endpoint
  return response.json();
});

// Define an async thunk to create a new topic
export const upsertPinnedItem = createAsyncThunk(
  "pinnedItems/upsertPinnedItem",
  async (topicData) => {
    const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/pinned-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicData),
    });
    return response.json();
  }
);



const pinnedItemSlice = createSlice({
  name: "pinnedItems",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPinnedItems.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPinnedItems.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchPinnedItems.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      }).addCase(upsertPinnedItem.fulfilled, (state, action) => {
        const updatedTopic = action.payload;
        const index = state.data.findIndex(
          (topic) => topic.uniqueId === updatedTopic.uniqueId
        );
        if (index !== -1) {
          state.data[index] = updatedTopic;
        } else if (updatedTopic.uniqueId) {
          state.data.push(action.payload);
        }
      });
  }
});


export default pinnedItemSlice.reducer;