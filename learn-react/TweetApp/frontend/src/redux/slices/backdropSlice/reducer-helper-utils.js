import initialState from "./initialState";
import {
  safelyTruncateString,
  safelyUpdateString,
} from "../../../common/service/safely-updations";
import { isValidString } from "../../../common/service/basic-validations";
// import { toJsonString } from "../../../common/service/transformations";

const ALLOWED_MAX_V3_TITLE_LENGTH = 0;
const customBackdropV3InitialState = { ...initialState.customBackdrop.v3 };

export const getV3InitialState = () => {
  return customBackdropV3InitialState;
};

export const getSanitizedAndUpdatedV3Title = (oldTitle = "", newTitle = "") => {
  if (!isValidString(newTitle)) {
    return oldTitle;
  }
  return safelyTruncateString(
    safelyUpdateString(oldTitle, newTitle),
    ALLOWED_MAX_V3_TITLE_LENGTH
  );
};
