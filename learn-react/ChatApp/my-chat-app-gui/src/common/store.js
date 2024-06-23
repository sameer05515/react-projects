// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    user: userReducer, // Add your user reducer here
    // ...other reducers if you have them
  },
});

export default store;
