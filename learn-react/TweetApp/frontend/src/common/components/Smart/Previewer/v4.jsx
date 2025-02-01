import yaml from "js-yaml";
import React, { useMemo } from "react";
import { addUniqueIdsToTree } from "../../../util/id-adder-util";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";
import CopyButton from "../../../../components/memory-maps/copy-to-clipboard/CopyButton";
import { SupportedOutFormats } from "../common/utils.v4";
import { isValidString } from "../../../service/basic-validations";

const debug = false;

const SmartPreviewerV4 = ({ data }) => {
  const { content, textOutputType, yamlProcessedData, resultData, errorMessage } = useMemo(() => {
    const content = isValidString(data?.content) ? data.content : "";
    const textOutputType =
      isValidString(data?.textOutputType) && Object.values(SupportedOutFormats).includes(data.textOutputType)
        ? data.textOutputType
        : SupportedOutFormats.TEXT;
    let yamlProcessedData = null;
    let resultData = [];
    let errorMessage = "";

    if (
      content &&
      (textOutputType === SupportedOutFormats.YAML || textOutputType === SupportedOutFormats.YAML_to_SKELETON)
    ) {
      try {
        const yamlResponse = yaml.load(content);
        yamlProcessedData = yamlResponse;

        if (textOutputType === SupportedOutFormats.YAML_to_SKELETON) {
          resultData = yamlResponse;
        }
      } catch (e) {
        const error = e.mark
          ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}`
          : `Error parsing YAML: ${e.message}`;
        errorMessage = error;
      }
    }
    if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
      const { data: skeletonData, isValid, message } = buildTree(content);
      if (!isValid) {
        // setErrorMessage(message || "Missing error message");
        errorMessage = message || "Missing error message";
      } else {
        // setResultData([...addUniqueIdsToTree(skeletonData)]);
        resultData = [...addUniqueIdsToTree(skeletonData)];
      }
    }

    return {
      content,
      textOutputType,
      yamlProcessedData,
      resultData,
      errorMessage,
    };
  }, [data]);

  return (
    <>
      {textOutputType === SupportedOutFormats.TEXT && <pre>{content}</pre>}
      {textOutputType === SupportedOutFormats.HTML && (
        <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: content }} />
      )}
      {textOutputType === SupportedOutFormats.MARKDOWN && <MarkdownComponent markdownText={content} />}
      {textOutputType === SupportedOutFormats.YAML && (
        <div>
          <pre>{JSON.stringify(yamlProcessedData, null, 2)}</pre>
          <span style={{ color: "red" }}>{errorMessage}</span>
        </div>
      )}
      {textOutputType === SupportedOutFormats.TIS_to_SKELETON && resultData && resultData.length > 0 && (
        <>
          <Tree
            data={resultData}
            expandAll={true}
            renderNode={(node) => <MarkdownComponent markdownText={node.name || "**tree node name is missing!**"} />}
          />
          <span style={{ color: "red" }}>{errorMessage}</span>
          {/* <JSONDataViewer metadata={resultData} title="Skeleton Raw Data Preview"/> */}
        </>
      )}
      {(!textOutputType || !Object.values(SupportedOutFormats).includes(textOutputType)) && (
        <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
      )}
      {debug && <CopyButton buttonText={"Copy Skeleton As Yaml"} textToCopy={""} onCopy={() => {}} />}
      {debug && <JSONDataViewer metadata={{ data, resultData, errorMessage }} title="X-Ray" />}
    </>
  );
};

export default SmartPreviewerV4;
