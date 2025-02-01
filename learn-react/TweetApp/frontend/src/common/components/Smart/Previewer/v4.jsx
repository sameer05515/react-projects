import yaml from "js-yaml";
import React, { useMemo } from "react";
import CopyButton from "../../../../components/memory-maps/copy-to-clipboard/CopyButton";
import { isValidString } from "../../../service/basic-validations";
import { addUniqueIdsToTree } from "../../../util/id-adder-util";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";
import { SupportedOutFormats } from "../common/utils.v4";

const debug = false;

const getSPProcessedData = (data) => {
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

const SmartPreviewerV4 = ({ data }) => {
  const { content, textOutputType, yamlProcessedData, resultData, errorMessage } = useMemo(
    () => getSPProcessedData(data),
    [data]
  );

  return (
    <>
      {textOutputType === SupportedOutFormats.TEXT && <pre>{content}</pre>}

      {textOutputType === SupportedOutFormats.HTML && (
        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {textOutputType === SupportedOutFormats.MARKDOWN && <MarkdownComponent markdownText={content} />}

      {textOutputType === SupportedOutFormats.YAML && (
        <>
          <pre>{JSON.stringify(yamlProcessedData, null, 2)}</pre>
          {!!errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        </>
      )}

      {textOutputType === SupportedOutFormats.TIS_to_SKELETON && resultData.length > 0 && (
        <>
          <Tree
            data={resultData}
            expandAll={true}
            renderNode={(node) => <MarkdownComponent markdownText={node.name || "**tree node name is missing!**"} />}
          />
          {!!errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          {debug && <JSONDataViewer metadata={resultData} title="Skeleton Raw Data Preview" />}
        </>
      )}

      {!Object.values(SupportedOutFormats).includes(textOutputType) && (
        <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
      )}

      {debug && <CopyButton buttonText="Copy Skeleton As Yaml" textToCopy="" onCopy={() => {}} />}
      {debug && <JSONDataViewer metadata={{ data, resultData, errorMessage }} title="X-Ray" />}
    </>
  );
};

export default SmartPreviewerV4;
