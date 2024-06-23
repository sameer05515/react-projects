// tagsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";

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
      `${BACKEND_APPLICATION_BASE_URL}/tags/${updatedTag.tagId}`,
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

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
