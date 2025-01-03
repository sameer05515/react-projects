import { isValidObject } from "../../../common/service/basic-validations";
import { getSanitizedString } from "../../../common/service/safely-updations";

export const sanitizeAndUpdateV3 = (oldObj = {}, newObj = {}) => {
  if (!isValidObject(newObj)) return oldObj;

  return {
    ...oldObj,
    title: getSanitizedString(newObj.title),
    subtitle: getSanitizedString(newObj.subtitle),
    description: getSanitizedString(newObj.description),
  };
};
