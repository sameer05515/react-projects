// linksSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";

// Create an async thunk to fetch links
export const fetchLinks = createAsyncThunk("links/fetchLinks", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const fetchLinksByUniqueId = createAsyncThunk("links/fetchLinksByUniqueId", async (uniqueId) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/links/${uniqueId}`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

export const createLink = createAsyncThunk("links/createLink", async (tagData) => {
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
  async (updatedLink) => {
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

const linksSlice = createSlice({
  name: "links",
  initialState: {
    data: [],
    linkDetails: {},
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        if(!action.payload?.parentId)
          state.data.push(action.payload);
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        const updatedLink = action.payload;
        const index = state.data.findIndex((link) => link.uniqueId === updatedLink.uniqueId);
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
        state.error = action.error.message;
      });
  },
});

export default linksSlice.reducer;
