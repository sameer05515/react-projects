// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice1";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
