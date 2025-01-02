import initialState from "./initialState";
import { toJsonString } from "../../../common/service/transformations";

const customBackdropV3InitialState = initialState.customBackdrop.v3;

export const reset = (prev, payload) => {
  console.log(
    "prev: ",
    toJsonString(prev),
    "\n payload: ",
    toJsonString(payload),
    "\n customBackdropV3InitialState: ",
    toJsonString(customBackdropV3InitialState)
  );
  // return{
  //     ...prev,
  //     ...customBackdropV3InitialState,
  //     ...payload
  // }
  return prev;
};
