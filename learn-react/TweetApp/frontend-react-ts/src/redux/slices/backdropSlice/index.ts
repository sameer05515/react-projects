// store/backdropSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getSanitizedString } from "../../../common/service/safely-updations";
import initialState, { v3InitialState } from "./initialState";

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
      state.customBackdrop.v3 = {
        ...v3InitialState,
        title: getSanitizedString(action.payload?.title || ""),
        subtitle: getSanitizedString(action.payload?.subtitle),
        description: getSanitizedString(action.payload?.description),
        active: true,
      };
    },
    hideBackdropV3: (state) => {
      state.customBackdrop.v3 = { ...v3InitialState, active: false };
    },

    updateBackdropV3: (state, action) => {
      const { v3 } = state.customBackdrop;
      if (!v3.active) return;

      if (v3.active) {
        state.customBackdrop.v3 = {
          ...v3,
          title: getSanitizedString(action.payload?.title || ""),
          subtitle: getSanitizedString(action.payload?.subtitle),
          description: getSanitizedString(action.payload?.description),
          active: true,
        };
      }

      console.log("state.customBackdrop.v3: ", state.customBackdrop.v3);
    },
  },
});

export const {
  showBackdrop,
  hideBackdrop,
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} = backdropSlice.actions;
//showBackdropV3, hideBackdropV3
// export const v3 = {
//   show: backdropSlice.actions.showBackdropV3,
//   hide: backdropSlice.actions.hideBackdropV3,
//   updateTitle: backdropSlice.actions.updateBackdropV3,
// };
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

export const selectCustomBackdropV3CurrentSubtitle = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.customBackdrop.v3.subtitle
);

export const selectCustomBackdropV3CurrentDescription = createSelector(
  selectBackdropState,
  (topicsState) => topicsState.customBackdrop.v3.description
);
