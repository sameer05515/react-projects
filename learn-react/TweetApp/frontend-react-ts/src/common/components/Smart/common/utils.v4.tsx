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

export const getKeyName = (textOutputType: string, textInputType: string) =>
  Object.keys(inputOutputMapping).find(
    (key) =>
      (inputOutputMapping as any)[key].textOutputType === textOutputType &&
      (inputOutputMapping as any)[key].textInputType === textInputType
  ) || "";

const getDetailedNameForKey = (key: string = "") => {
  if (!key || typeof key !== "string") return "";

  return (inputOutputMapping as any)[key]?.detailedName || "";
};

export const getDetailedName = (textOutputType: string, textInputType: string) => {
  const key = getKeyName(textOutputType, textInputType);
  const detailedName = getDetailedNameForKey(key);
  return detailedName;
};

export const getInpOupDetailsForKey = (key: string = "") => {
  //   console.log("[getInpOupDetailsForKey]: key: '", key, "'");
  if (!key || typeof key !== "string") {
    return {
      textOutputType: "",
      textInputType: "",
    };
  }

  const obj = (inputOutputMapping as any)[key.trim()] || {};
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

export const getSmartPreviewerProcessedData = (data: { content?: string; textOutputType?: string }) => {
  const content = isValidString(data?.content || "") ? (data!.content as string) : "";
  const textOutputType = (Object.values(SupportedOutFormats) as string[]).includes(data?.textOutputType || "")
    ? (data!.textOutputType as string)
    : SupportedOutFormats.TEXT;

  let yamlProcessedData: any = null;
  let resultData: any[] = [];
  let errorMessage: string = "";

  if (content && [SupportedOutFormats.YAML, SupportedOutFormats.YAML_to_SKELETON].includes(textOutputType)) {
    try {
      yamlProcessedData = yaml.load(content);
      if (textOutputType === SupportedOutFormats.YAML_to_SKELETON) resultData = yamlProcessedData as any[];
    } catch (e: unknown) {
      const err = e as any;
      errorMessage = err?.mark
        ? `Error parsing YAML at line ${err.mark.line + 1}: ${String(err.message)}`
        : `Error parsing YAML: ${String(err?.message || e)}`;
    }
  } else if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
    const { data: skeletonData, isValid, message } = buildTree(content);
    if (isValid) resultData = addUniqueIdsToTree(skeletonData as any[]);
    else errorMessage = message || "Missing error message";
  }

  return { content, textOutputType, yamlProcessedData, resultData, errorMessage };
};


//--------------------

export const validateSmartContent = (content: string, outputType: string) => {
  try {
    if (outputType === SupportedOutFormats.YAML) yaml.load(content);
    if (outputType === SupportedOutFormats.TIS_to_SKELETON) {
      const { isValid, message } = buildTree(content);
      if (!isValid) return message;
    }
  } catch (e: unknown) {
    const err = e as any;
    return err?.mark ? `Error parsing YAML at line ${err.mark.line + 1}: ${String(err.message)}` : `Error parsing YAML: ${String(err?.message || e)}`;
  }
  return "";
};