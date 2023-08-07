// redux/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace 'your-api-base-url' with your actual API base URL.
const API_BASE_URL = "http://localhost:3001/api";

// Async Thunks for CRUD Operations

// Fetch all data from the server
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(`${API_BASE_URL}/get-data`);
  return response.data;
});

// // Fetch all data from the server
// export const fetchDataById = createAsyncThunk('data/fetchDataById', async (id) => {
//   const response = await axios.get(`${API_BASE_URL}/get-data/${id}`);
//   return response.data;
// });

// Save new data to the server
export const saveData = createAsyncThunk("data/saveData", async (newData) => {
  const response = await axios.post(`${API_BASE_URL}/save-data`, newData);
  return response.data;
});

// Update data on the server
export const updateData = createAsyncThunk(
  "data/updateData",
  async (updatedData) => {
    const response = await axios.put(
      `${API_BASE_URL}/update-data/${updatedData.id}`,
      updatedData
    );
    return response.data;
  }
);

// Delete data from the server
export const deleteData = createAsyncThunk("data/deleteData", async (id) => {
  await axios.delete(`${API_BASE_URL}/delete-data/${id}`);
  return id;
});

const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the fetch data success case
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload;
      })

      // // Handle the fetch data by id success case
      // .addCase(fetchDataById.fulfilled, (state, action) => {
      //   return action.payload;
      // })
      // Handle the save data success case
      .addCase(saveData.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      // Handle the update data success case
      .addCase(updateData.fulfilled, (state, action) => {
        const updatedData = action.payload;
        const index = state.findIndex((item) => item._id === updatedData._id);
        if (index !== -1) {
          state[index] = updatedData;
        }
      })
      // Handle the delete data success case
      .addCase(deleteData.fulfilled, (state, action) => {
        const id = action.payload;
        return state.filter((item) => item._id !== id);
      });
  },
});

export default dataSlice.reducer;
