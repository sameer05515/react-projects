import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Define an async thunk to fetch all topics
export const fetchPinnedItems = createAsyncThunk("pinnedItems/fetchPinnedItems", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/pinned-items`); // Replace with your API endpoint
  return response.json();
});

// Define an async thunk to create a new topic
export const upsertPinnedItem = createAsyncThunk(
  "pinnedItems/upsertPinnedItem",
  async (topicData: any) => {
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


type PinnedItem = {
  uniqueId?: string;
  [key: string]: any;
};

type PinnedItemsState = {
  data: PinnedItem[];
  status: "idle" | "loading" | "succeeded" | "failed"; // ✅ Standardized: changed from loading to status
  error: string | null;
};

const pinnedItemSlice = createSlice({
  name: "pinnedItems",
  initialState: {
    data: [],
    status: "idle", // ✅ Standardized: changed from loading to status
    error: null,
  } as PinnedItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPinnedItems.pending, (state) => {
        state.status = "loading"; // ✅ Standardized: pending -> loading
      })
      .addCase(fetchPinnedItems.fulfilled, (state, action) => {
        state.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.data = action.payload as PinnedItem[];
      })
      .addCase(fetchPinnedItems.rejected, (state, action) => {
        state.status = "failed"; // ✅ Standardized: rejected -> failed
        state.error = action.error.message ?? null;
      }).addCase(upsertPinnedItem.fulfilled, (state, action) => {
        const updatedTopic = action.payload as PinnedItem;
        const index = state.data.findIndex(
          (topic: PinnedItem) => topic.uniqueId === updatedTopic.uniqueId
        );
        if (index !== -1) {
          state.data[index] = updatedTopic as PinnedItem;
        } else if (updatedTopic.uniqueId) {
          state.data.push(updatedTopic as PinnedItem);
        }
      });
  }
});


export default pinnedItemSlice.reducer;