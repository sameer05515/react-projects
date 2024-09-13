import parseLines from "./parse-lines";
import validate, { ValidationResult } from "./validate";

function buildTree(text: string): ValidationResult {
  const parsed = parseLines(text);

  if (!parsed.isValid) {
    return {
      //   data: parsed.data,
      data: [],
      isValid: false,
      errorCode: parsed.errorCode,
      message: parsed.message,
    };
  }

  return validate(parsed.data);
}

export default buildTree;
