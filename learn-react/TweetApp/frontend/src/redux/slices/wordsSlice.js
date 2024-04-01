// wordsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching paginated data
export const fetchWords = createAsyncThunk('words/fetchWords', async ({ page, pageSize }) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/words?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

// Create a slice
const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk for use in components
// export { fetchWords };

// Export the reducer
export default wordsSlice.reducer;
