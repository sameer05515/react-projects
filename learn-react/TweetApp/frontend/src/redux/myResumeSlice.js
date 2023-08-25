// myResumeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_APPLICATION_BASE_URL } from "../common/globalConstants";
// Replace 'YOUR_API_ENDPOINT' with the actual endpoint for fetching MyResumeModel data
const API_ENDPOINT = BACKEND_APPLICATION_BASE_URL;

// Async thunk for fetching data by uniqueId
export const fetchMyResumeData = createAsyncThunk('myResume/fetchMyResumeData', async (uniqueId) => {
  try {
    console.log(`${API_ENDPOINT}/my-resume/${uniqueId}`);
    const response = await axios.get(`${API_ENDPOINT}/my-resume/${uniqueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Slice
const myResumeSlice = createSlice({
  name: 'myResume',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyResumeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyResumeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMyResumeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default myResumeSlice.reducer;
// export { fetchMyResumeData };
