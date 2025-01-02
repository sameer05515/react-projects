// store/backdropSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { toJsonString } from "../../../common/service/transformations";
import { getSanitizedAndUpdatedV3Title } from "./reducer-helper-utils";

const backdropSlice = createSlice({
  name: "backdrop",
  initialState: { ...initialState },
  reducers: {
    showBackdrop: (state) => {
      state.active = true;
    },
    hideBackdrop: (state) => {
      state.active = false;
    },

    showBackdropV3: (state, action) => {
      const customBackdropV3 = state.customBackdrop.v3;
      customBackdropV3.title = "";
      customBackdropV3.active = true;
    },
    hideBackdropV3: (state) => {
      state.customBackdrop.v3.active = false;
    },

    updateTitle: (state, action) => {
      const customBackdropV3 = state.customBackdrop.v3;
      console.log("action: ", toJsonString(action));

      if (customBackdropV3.active) {
        customBackdropV3.title = getSanitizedAndUpdatedV3Title(
          customBackdropV3.title,
          action.payload
        );
      }
    },
  },
});

export const { showBackdrop, hideBackdrop } = backdropSlice.actions;
//showBackdropV3, hideBackdropV3
export const v3 = {
  show: backdropSlice.actions.showBackdropV3,
  hide: backdropSlice.actions.hideBackdropV3,
  updateTitle: backdropSlice.actions.updateTitle,
};
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

export const selectCustomBackdropV3CurrentTitle = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.customBackdrop.v3.title
);
