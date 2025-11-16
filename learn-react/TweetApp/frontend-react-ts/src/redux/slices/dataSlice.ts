// redux/dataSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SimpleDataItem = Record<string, unknown>;

const dataSlice = createSlice({
  name: "data",
  initialState: [] as SimpleDataItem[],
  reducers: {
    addData: (state, action: PayloadAction<SimpleDataItem>) => {
      state.push(action.payload as SimpleDataItem);
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
