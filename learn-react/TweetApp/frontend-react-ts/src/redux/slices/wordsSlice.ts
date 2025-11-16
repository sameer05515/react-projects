// wordsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Define the initial state
type WordsState = {
  data: any[];
  loading: boolean;
  error: string | null;
};

const initialState: WordsState = {
  data: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching paginated data
export const fetchWords = createAsyncThunk<any, { page: number; pageSize: number }>('words/fetchWords', async ({ page, pageSize }) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/words?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<any>;
      throw axiosErr.response?.data ?? axiosErr.message;
    }
    throw (err as Error).message ?? 'Unknown error';
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
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

// Export the async thunk for use in components
// export { fetchWords };

// Export the reducer
export default wordsSlice.reducer;
