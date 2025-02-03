import { isValidString } from "../../../../../common/service/basic-validations";
import {
    // sortTodosByCreatedDate,
    // sortTodosByCreatedDate,
    // sortTodosByGroomed,
    // sortTodosByStatus,
    // sortTodosByUrgencyAndImportance,
    Status
} from "../../Item.dto";

export const FilterActionTypes = {
  SHOW_ALL: "show-all",
  SHOW_OPEN_ONLY: "show-open-only",
  SHOW_CLOSED_ONLY: "show-closed-only",
};

export const FilterActions = {
  [FilterActionTypes.SHOW_ALL]: (todo) => true,
  [FilterActionTypes.SHOW_OPEN_ONLY]: (todo) => todo.status === Status.OPEN,
  [FilterActionTypes.SHOW_CLOSED_ONLY]: (todo) => todo.status === Status.CLOSED,
};

export const PurposeToOpenModal = {
  BAS_AISE_HI_TESTING_KE_LIYE: "just-to-test",
  SAVE_NEW_TODO: "save-new-to-do",
  UPDATE_SMART_CONTENT_OF_EXISTING_TTITEM: "update-smart-content-of-existing-tt-item",
};

export const ValidationStrategies = {
  THROW_ERROR: "THROW_ERROR",
  RETURN_RESULT: "RETURN_RESULT",
};

/**
 * Validates the given purpose against predefined values in `PurposeToOpenModal`
 * and applies a validation strategy.
 *
 * @param {string} [purpose=""] - The purpose to validate.
 * @param {keyof typeof ValidationStrategies} [strategy=ValidationStrategies.RETURN_RESULT] -
 *        The strategy to use when validation fails: `THROW_ERROR` throws an error,
 *        while `RETURN_RESULT` returns an object with validation status.
 * @returns {{ isValid: boolean, message: string }} - An object containing validation status (`isValid`)
 *          and an error message (`message`) if validation fails.
 * @throws {Error} If validation fails and the strategy is `THROW_ERROR`.
 */
export const validatePurposeWithStrategy = (purpose = "", strategy = ValidationStrategies.RETURN_RESULT) => {
  const isValid = isValidString(purpose) && Object.values(PurposeToOpenModal).includes(purpose);
  const message = isValid ? "" : "Not a valid purpose: " + purpose;

  if (!isValid && strategy === ValidationStrategies.THROW_ERROR) {
    throw new Error(message);
  }

  return { isValid, message };
};
