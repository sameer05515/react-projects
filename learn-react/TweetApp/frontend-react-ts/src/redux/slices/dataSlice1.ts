// redux/dataSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Replace 'your-api-base-url' with your actual API base URL.
const API_BASE_URL = "http://localhost:3001/api";

// Async Thunks for CRUD Operations
type DataItem = {
  _id: string;
  [key: string]: any;
};

// Fetch all data from the server
export const fetchData = createAsyncThunk<DataItem[]>("data/fetchData", async () => {
  const response = await axios.get(`${API_BASE_URL}/get-data`);
  return response.data as DataItem[];
});

// // Fetch all data from the server
// export const fetchDataById = createAsyncThunk('data/fetchDataById', async (id) => {
//   const response = await axios.get(`${API_BASE_URL}/get-data/${id}`);
//   return response.data;
// });

// Save new data to the server
export const saveData = createAsyncThunk<DataItem, Partial<DataItem>>(
  "data/saveData",
  async (newData) => {
    const response = await axios.post(`${API_BASE_URL}/save-data`, newData);
    return response.data as DataItem;
  }
);

// Update data on the server
export const updateData = createAsyncThunk<DataItem, { id: string } & Partial<DataItem>>(
  "data/updateData",
  async (updatedData) => {
    const response = await axios.put(
      `${API_BASE_URL}/update-data/${updatedData.id}`,
      updatedData
    );
    return response.data as DataItem;
  }
);

// Delete data from the server
export const deleteData = createAsyncThunk<string, string>(
  "data/deleteData",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/delete-data/${id}`);
    return id;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: [] as DataItem[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the fetch data success case
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload as DataItem[];
      })

      // // Handle the fetch data by id success case
      // .addCase(fetchDataById.fulfilled, (state, action) => {
      //   return action.payload;
      // })
      // Handle the save data success case
      .addCase(saveData.fulfilled, (state, action) => {
        state.push(action.payload as DataItem);
      })
      // Handle the update data success case
      .addCase(updateData.fulfilled, (state, action) => {
        const updatedData = action.payload as DataItem;
        const index = state.findIndex((item: DataItem) => item._id === updatedData._id);
        if (index !== -1) {
          state[index] = updatedData as DataItem;
        }
      })
      // Handle the delete data success case
      .addCase(deleteData.fulfilled, (state, action) => {
        const id = action.payload as string;
        return state.filter((item: DataItem) => item._id !== id);
      });
  },
});

export default dataSlice.reducer;
