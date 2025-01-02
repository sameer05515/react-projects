import { isValidObject } from "../../../common/service/basic-validations";
import { truncateAndUpdate } from "../../../common/service/safely-updations";
import {
  ALLOWED_MAX_V3_DESCRIPTION_LENGTH,
  ALLOWED_MAX_V3_SUBTITLE_LENGTH,
  ALLOWED_MAX_V3_TITLE_LENGTH,
} from "./initialState";

export const sanitizeAndUpdateV3 = (oldObj = {}, newObj = {}) => {
  if (!isValidObject(newObj)) return oldObj;

  return {
    ...oldObj,
    title: truncateAndUpdate(
      oldObj.title,
      newObj.title,
      ALLOWED_MAX_V3_TITLE_LENGTH
    ),
    subtitle: truncateAndUpdate(
      oldObj.subtitle,
      newObj.subtitle,
      ALLOWED_MAX_V3_SUBTITLE_LENGTH
    ),
    description: truncateAndUpdate(
      oldObj.description,
      newObj.description,
      ALLOWED_MAX_V3_DESCRIPTION_LENGTH
    ),
  };
};
