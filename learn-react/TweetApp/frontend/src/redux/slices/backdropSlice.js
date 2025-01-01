// store/backdropSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";

const backdropSlice = createSlice({
  name: "backdrop",
  initialState: {
    active: false, // CustomBackdropV2 visibility
    /** CustomBackdropV3 states */
    customBackdrop:{
      v3:{
        active:false
      }
    },
  },
  reducers: {
    showBackdrop: (state) => {
      state.active = true;
    },
    hideBackdrop: (state) => {
      state.active = false;
    },

    showBackdropV3: (state) => {
      state.customBackdrop.v3.active = true;
    },
    hideBackdropV3: (state) => {
      state.customBackdrop.v3.active = false;
    },

  },
});

export const { showBackdrop, hideBackdrop, showBackdropV3, hideBackdropV3 } = backdropSlice.actions;
export default backdropSlice.reducer;

/* ============== Selectors ======================*/
const selectBackdropState = (state) => state.backdrop;

export const selectIsBackdropActive = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.active
);

export const selectIsCustomBackdropV3Active = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.customBackdrop.v3.active
);
