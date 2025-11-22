// myResumeSlice.js

import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
// Replace 'YOUR_API_ENDPOINT' with the actual endpoint for fetching MyResumeModel data
const API_ENDPOINT = BACKEND_APPLICATION_BASE_URL;

// Async thunk for fetching data by uniqueId
export const fetchMyResumeData = createAsyncThunk('myResume/fetchMyResumeData', async (uniqueId: string) => {
  try {
    // console.log(`${API_ENDPOINT}/my-resume/${uniqueId}`);
    const response = await axios.get(`${API_ENDPOINT}/my-resume/${uniqueId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Slice
type MyResumeState = {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const myResumeSlice = createSlice({
  name: 'myResume',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  } as MyResumeState,
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
        state.error = action.error.message ?? null;
      });
  },
});

export default myResumeSlice.reducer;
// export { fetchMyResumeData };

/* ============== Selectors ======================*/
const selectMyResumeState = (state: RootState) => state.myResume;

export const selectMyResumeData = createSelector(
  selectMyResumeState,
  (myResumeState) => myResumeState.data
);

export const selectMyResumeStatus = createSelector(
  selectMyResumeState,
  (myResumeState) => myResumeState.status
);

export const selectMyResumeError = createSelector(
  selectMyResumeState,
  (myResumeState) => myResumeState.error
);

// Combined selector for common myResume state properties (optimizes multiple useSelector calls)
export const selectMyResumeStateCombined = createSelector(
  [selectMyResumeState],
  (myResumeState) => ({
    data: myResumeState.data,
    status: myResumeState.status,
    error: myResumeState.error,
  })
);
