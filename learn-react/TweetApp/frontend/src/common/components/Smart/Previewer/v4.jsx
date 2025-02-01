import React, { useMemo } from "react";
import CopyButton from "../../../../components/memory-maps/copy-to-clipboard/CopyButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";
import { SupportedOutFormats, getSmartPreviewerProcessedData } from "../common/utils.v4";

const debug = false;

const SmartPreviewerV4 = ({ data }) => {
  const { content, textOutputType, yamlProcessedData, resultData, errorMessage } = useMemo(
    () => getSmartPreviewerProcessedData(data),
    [data]
  );

  const renderContent = () => {
    switch (textOutputType) {
      case SupportedOutFormats.TEXT:
        return <pre>{content}</pre>;

      case SupportedOutFormats.HTML:
        return <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: content }} />;

      case SupportedOutFormats.MARKDOWN:
        return <MarkdownComponent markdownText={content} />;

      case SupportedOutFormats.YAML:
        return (
          <>
            <pre>{JSON.stringify(yamlProcessedData, null, 2)}</pre>
            {!!errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          </>
        );

      case SupportedOutFormats.TIS_to_SKELETON:
        return resultData.length > 0 ? (
          <>
            <Tree
              data={resultData}
              expandAll={true}
              renderNode={(node) => <MarkdownComponent markdownText={node.name || "**tree node name is missing!**"} />}
            />
            {!!errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            {debug && <JSONDataViewer metadata={resultData} title="Skeleton Raw Data Preview" />}
          </>
        ) : null;

      default:
        return <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>;
    }
  };

  return (
    <>
      {renderContent()}

      {debug && (
        <>
          <CopyButton buttonText="Copy Skeleton As Yaml" textToCopy="" onCopy={() => {}} />
          <JSONDataViewer metadata={{ data, resultData, errorMessage }} title="X-Ray" />
        </>
      )}
    </>
  );
};

export default SmartPreviewerV4;
