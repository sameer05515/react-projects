import { isValidObject } from "../../../common/service/basic-validations";
import { getSanitizedString } from "../../../common/service/safely-updations";

type BackdropText = { title?: string; subtitle?: string; description?: string; [k: string]: any };

export const sanitizeAndUpdateV3 = (oldObj: BackdropText = {}, newObj: BackdropText = {}) => {
  if (!isValidObject(newObj)) return oldObj;

  return {
    ...oldObj,
    title: getSanitizedString(newObj.title as string),
    subtitle: getSanitizedString(newObj.subtitle as string),
    description: getSanitizedString(newObj.description as string),
  };
};
