// comparableDataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";

// Define the initial state
const initialState = {
  data: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define an async thunk for fetching data
export const fetchData = createAsyncThunk(
  "comparableData/fetchData",
  async () => {
    try {
      const response = await axios.get(
        `${BACKEND_APPLICATION_BASE_URL}/c-objects`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an async thunk for saving data
export const saveData = createAsyncThunk(
  "comparableData/saveData",
  async (dataToSave) => {
    try {
      const response = await axios.post(
        `${BACKEND_APPLICATION_BASE_URL}/c-objects`,
        dataToSave
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define an async thunk for updating data
export const updateData = createAsyncThunk(
  "comparableData/updateData",
  async (updatedData) => {
    try {
      // console.log(JSON.stringify(updatedData));
      const response = await fetch(
        `${BACKEND_APPLICATION_BASE_URL}/c-objects/${updatedData.uniqueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the slice
const comparableDataSlice = createSlice({
  name: "comparableData",
  initialState,
  reducers: {
    // Other synchronous actions can be added here if needed
  },
  extraReducers: (builder) => {
    // Handle the pending state while fetching data
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
    });

    // Handle the success state after successfully fetching data
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });

    // Handle the error state if there's an issue fetching data
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Handle the pending state while saving data
    builder.addCase(saveData.pending, (state) => {
      state.status = "loading";
    });

    // Handle the success state after successfully saving data
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data.push(action.payload); // Assuming the saved data is returned by the server
    });

    // Handle the error state if there's an issue saving data
    builder.addCase(saveData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Handle the pending state while updating data
    builder.addCase(updateData.pending, (state) => {
      state.status = "loading";
    });

    // Handle the success state after successfully updating data
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Assuming you have an ID to identify the data in the state and updating it
      // console.log(
      //   "updateData.fulfilled   --------",
      //   JSON.stringify(action.payload)
      // );
      if(!action.payload){
        return;
      }
      const updatedIndex = state.data.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = action.payload;
      }
    });

    // Handle the error state if there's an issue updating data
    builder.addCase(updateData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

// Export the async thunks for external use
// export { fetchData, saveData, updateData };

// Export the reducer
export default comparableDataSlice.reducer;
