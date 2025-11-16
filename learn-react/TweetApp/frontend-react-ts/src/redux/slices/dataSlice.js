// redux/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    addData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
