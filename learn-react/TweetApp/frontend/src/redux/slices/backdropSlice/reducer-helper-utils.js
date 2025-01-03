import {
    isString,
    isValidObject,
} from "../../../common/service/basic-validations";

export const getSanitizedString = (value) => (isString(value) ? value : "");

export const sanitizeAndUpdateV3 = (oldObj = {}, newObj = {}) => {
  if (!isValidObject(newObj)) return oldObj;

  return {
    ...oldObj,
    title: getSanitizedString(newObj.title),
    subtitle: getSanitizedString(newObj.subtitle),
    description: getSanitizedString(newObj.description),
  };
};
