const initialState = {
  active: false, // CustomBackdropV2 visibility
  /** CustomBackdropV3 states */
  customBackdrop: {
    v3: {
      active: false,
      title: "",
      subtitle: "",
      description: "",
    },
  },
};

export const v3InitialState = initialState.customBackdrop.v3;

export const ALLOWED_MAX_V3_TITLE_LENGTH = 30;
export const ALLOWED_MAX_V3_SUBTITLE_LENGTH = 50;
export const ALLOWED_MAX_V3_DESCRIPTION_LENGTH = 200;

export default initialState;
