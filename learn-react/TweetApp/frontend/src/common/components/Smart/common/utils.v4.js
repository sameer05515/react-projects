import yaml from "js-yaml";
import React from "react";
import { isValidString } from "../../../service/basic-validations";
import { addUniqueIdsToTree } from "../../../util/id-adder-util";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";

export const SupportedOutFormats = {
  HTML: "html",
  YAML: "yaml",
  MARKDOWN: "markdown",
  TEXT: "text",
  TIS_to_SKELETON: "skeleton",
  YAML_to_SKELETON: "yaml_to_skeleton",
};

export const SupportedInputComponents = {
  textArea: "TextArea",
  ckEditor: "CKEditor",
};

const inputOutputMapping = {
  RT_from_RT: {
    detailedName: "RawText from RawText",
    textOutputType: SupportedOutFormats.TEXT,
    textInputType: SupportedInputComponents.textArea,
  },
  HTML_FROM_RT: {
    detailedName: "HTML generated from RawText",
    textOutputType: SupportedOutFormats.HTML,
    textInputType: SupportedInputComponents.textArea,
  },
  HTML_FROM_CKEditor: {
    detailedName: "HTML generated from CKEditor",
    textOutputType: SupportedOutFormats.HTML,
    textInputType: SupportedInputComponents.ckEditor,
  },
  YAML_From_RT: {
    detailedName: "YAML format text, input from RawText. Will show parsing error if invalid YAML text given",
    textOutputType: SupportedOutFormats.YAML,
    textInputType: SupportedInputComponents.textArea,
  },
  MARKDOWN_From_RT: {
    detailedName: "MARKDOWN format text, input from RawText",
    textOutputType: SupportedOutFormats.MARKDOWN,
    textInputType: SupportedInputComponents.textArea,
  },
  SKELETON_From_TIS: {
    detailedName:
      "Tabbed Indented String (TIS) format text, input from RawText. Will show parsing error if invalid YAML text given",
    textOutputType: SupportedOutFormats.TIS_to_SKELETON,
    textInputType: SupportedInputComponents.textArea,
  },
};

export const getKeyName = (textOutputType, textInputType) =>
  Object.keys(inputOutputMapping).find(
    (key) =>
      inputOutputMapping[key].textOutputType === textOutputType &&
      inputOutputMapping[key].textInputType === textInputType
  ) || "";

const getDetailedNameForKey = (key = "") => {
  if (!key || typeof key !== "string") return "";

  return inputOutputMapping[key]?.detailedName || "";
};

export const getDetailedName = (textOutputType, textInputType) => {
  const key = getKeyName(textOutputType, textInputType);
  const detailedName = getDetailedNameForKey(key);
  return detailedName;
};

export const getInpOupDetailsForKey = (key = "") => {
  //   console.log("[getInpOupDetailsForKey]: key: '", key, "'");
  if (!key || typeof key !== "string") {
    return {
      textOutputType: "",
      textInputType: "",
    };
  }

  const obj = inputOutputMapping[key.trim()] || {};
  //   console.log("obj", JSON.stringify(obj))
  return {
    textOutputType: obj.textOutputType || "",
    textInputType: obj.textInputType || "",
  };
};

export const getComboOptions = () => (
  <>
    {Object.keys(inputOutputMapping).map((outputType) => (
      <option key={outputType} value={outputType}>
        {outputType.replace(/_/g, " ")}
      </option>
    ))}
  </>
);

//=========================================

export const getSmartPreviewerProcessedData = (data) => {
  const content = isValidString(data?.content) ? data.content : "";
  const textOutputType = Object.values(SupportedOutFormats).includes(data?.textOutputType)
    ? data.textOutputType
    : SupportedOutFormats.TEXT;

  let yamlProcessedData = null;
  let resultData = [];
  let errorMessage = "";

  if (content && [SupportedOutFormats.YAML, SupportedOutFormats.YAML_to_SKELETON].includes(textOutputType)) {
    try {
      yamlProcessedData = yaml.load(content);
      if (textOutputType === SupportedOutFormats.YAML_to_SKELETON) resultData = yamlProcessedData;
    } catch (e) {
      errorMessage = e.mark
        ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}`
        : `Error parsing YAML: ${e.message}`;
    }
  } else if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
    const { data: skeletonData, isValid, message } = buildTree(content);
    if (isValid) resultData = addUniqueIdsToTree(skeletonData);
    else errorMessage = message || "Missing error message";
  }

  return { content, textOutputType, yamlProcessedData, resultData, errorMessage };
};


//--------------------

export const validateSmartContent = (content, outputType) => {
  try {
    if (outputType === SupportedOutFormats.YAML) yaml.load(content);
    if (outputType === SupportedOutFormats.TIS_to_SKELETON) {
      const { isValid, message } = buildTree(content);
      if (!isValid) return message;
    }
  } catch (e) {
    return e.mark ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}` : `Error parsing YAML: ${e.message}`;
  }
  return "";
};