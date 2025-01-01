// store/backdropSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";

const backdropSlice = createSlice({
  name: "backdrop",
  initialState: {
    active: false, // Backdrop visibility
  },
  reducers: {
    showBackdrop: (state) => {
      state.active = true;
    },
    hideBackdrop: (state) => {
      state.active = false;
    },
  },
});

export const { showBackdrop, hideBackdrop } = backdropSlice.actions;
export default backdropSlice.reducer;

/* ============== Selectors ======================*/
const selectBackdropState = (state) => state.backdrop;

export const selectIsBackdropActive = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.active
);
