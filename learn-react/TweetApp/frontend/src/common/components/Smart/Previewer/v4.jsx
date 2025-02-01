import React, { useMemo } from "react";
import CopyButton from "../../../../components/memory-maps/copy-to-clipboard/CopyButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";
import { SupportedOutFormats } from "../common/utils.v4";
import { getSmartPreviewerProcessedData } from "../common/utils.v4";

const debug = false;

const SmartPreviewerV4 = ({ data }) => {
  const { content, textOutputType, yamlProcessedData, resultData, errorMessage } = useMemo(
    () => getSmartPreviewerProcessedData(data),
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
