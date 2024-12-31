import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState } from "react";
import { addUniqueIdsToTree } from "../../../util/id-adder-util";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import CustomButton from "../../custom-button/CustomButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";
import CopyButton from "../../../../components/memory-maps/copy-to-clipboard/CopyButton";

const debug = false;

const SupportedOutFormats = {
  HTML: "html",
  YAML: "yaml",
  MARKDOWN: "markdown",
  TEXT: "text",
  TIS_to_SKELETON: "skeleton",
  YAML_to_SKELETON: "yaml_to_skeleton",
};

const availableInputTypes = {
  textArea: "TextArea",
  ckEditor: "CKEditor",
};

const inputOutputMapping = {
  RT_from_RT: {
    detailedName: "RawText from RawText",
    textOutputType: SupportedOutFormats.TEXT,
    textInputType: availableInputTypes.textArea,
  },
  HTML_FROM_RT: {
    detailedName: "HTML generated from RawText",
    textOutputType: SupportedOutFormats.HTML,
    textInputType: availableInputTypes.textArea,
  },
  HTML_FROM_CKEditor: {
    detailedName: "HTML generated from CKEditor",
    textOutputType: SupportedOutFormats.HTML,
    textInputType: availableInputTypes.ckEditor,
  },
  YAML_From_RT: {
    detailedName: "YAML format text, input from RawText. Will show parsing error if invalid YAML text given",
    textOutputType: SupportedOutFormats.YAML,
    textInputType: availableInputTypes.textArea,
  },
  MARKDOWN_From_RT: {
    detailedName: "MARKDOWN format text, input from RawText",
    textOutputType: SupportedOutFormats.MARKDOWN,
    textInputType: availableInputTypes.textArea,
  },
  SKELETON_From_TIS: {
    detailedName: "Tabbed Indented String (TIS) format text, input from RawText. Will show parsing error if invalid YAML text given",
    textOutputType: SupportedOutFormats.SKELETON,
    textInputType: availableInputTypes.textArea,
  },
};

const getKeyName = (textOutputType, textInputType) =>
  Object.keys(inputOutputMapping).find(
    (key) => inputOutputMapping[key].textOutputType === textOutputType && inputOutputMapping[key].textInputType === textInputType
  ) || "HTML_FROM_RT";

const SmartEditor = ({ initialValue, preview: previewInitialValue = true, onChange = () => {}, onError = () => {} }) => {
  const textareaRef = useRef(null);

  const [selectedOutputType, setSelectedOutputType] = useState(getKeyName(initialValue?.textOutputType, initialValue?.textInputType));
  const [showPreview, setShowPreview] = useState(previewInitialValue);

  const [formData, setFormData] = useState({
    content: initialValue?.content || "",
    textOutputType: inputOutputMapping[selectedOutputType].textOutputType,
    textInputType: inputOutputMapping[selectedOutputType].textInputType,
  });

  useEffect(() => {
    const { textInputType, textOutputType } = inputOutputMapping[selectedOutputType];
    if (formData.textOutputType !== textOutputType || formData.textInputType !== textInputType) {
      setFormData((prev) => ({ ...prev, textInputType, textOutputType }));
    }
  }, [selectedOutputType]);

  useEffect(() => {
    const { textOutputType, content } = formData;

    let error = "";
    if (textOutputType === SupportedOutFormats.YAML && content) {
      try {
        yaml.load(content);
      } catch (e) {
        error = e.mark ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}` : `Error parsing YAML: ${e.message}`;
      }
    }

    if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
      const { isValid, message } = buildTree(content);
      if (!isValid) error = message;
    }

    if (!content.trim()) error = "Content is empty";

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 1.3}px`;
    }

    onError(error);
    onChange(formData);
  }, [formData.content, formData.textOutputType]);

  const handleChangeOutputTypes = (event) => setSelectedOutputType(event.target.value);
  const handleInputChange = (e) => setFormData((prev) => ({ ...prev, content: e.target.value }));
  const handleEditorChange = (event, editor) => setFormData((prev) => ({ ...prev, content: editor.getData() }));

  return (
    <div>
      <label htmlFor="outputType" style={labelStyle}>
        Select Output Type:
      </label>
      <select value={selectedOutputType} title={inputOutputMapping[selectedOutputType]?.detailedName || ""} onChange={handleChangeOutputTypes}>
        {Object.keys(inputOutputMapping).map((outputType) => (
          <option key={outputType} value={outputType}>
            {outputType.replace(/_/g, " ")}
          </option>
        ))}
      </select>

      {formData.textInputType === availableInputTypes.textArea && (
        <div>
          <label htmlFor="content" style={labelStyle}>
            Content:
          </label>
          <textarea ref={textareaRef} id="content" name="content" value={formData.content} onChange={handleInputChange} style={styles.textarea} />
        </div>
      )}

      {formData.textInputType === availableInputTypes.ckEditor && (
        <div>
          <label htmlFor="ckeditor" style={labelStyle}>
            Content:
          </label>
          <CKEditor id="ckeditor" name="content" editor={ClassicEditor} data={formData.content} onChange={handleEditorChange} />
        </div>
      )}

      {formData.content && (
        <div>
          <b>Preview:</b> <CustomButton onClick={() => setShowPreview((prev) => !prev)}>{showPreview ? "Hide" : "Show"}</CustomButton>
        </div>
      )}

      {showPreview && <SmartPreviewer data={formData} />}
      <JSONDataViewer metadata={{ selectedOutputType }} title="selectedOutputType" />
    </div>
  );
};

const labelStyle = { fontWeight: "bold" };

const styles = {
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "none",
    overflow: "hidden",
  },
};

const SmartPreviewer = ({ data }) => {
  const { content, textOutputType } = data;

  const [yamlProcessedData, setYamlProcessedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    if ((textOutputType === SupportedOutFormats.YAML || textOutputType === SupportedOutFormats.YAML_to_SKELETON) && content) {
      try {
        const yamlResponse = yaml.load(content);
        setYamlProcessedData(yamlResponse);
        if (textOutputType === SupportedOutFormats.YAML_to_SKELETON) {
          setResultData(() => yamlResponse);
        }
        setErrorMessage("");
      } catch (e) {
        const error = e.mark ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}` : `Error parsing YAML: ${e.message}`;
        setErrorMessage(error);
      }
    }
    if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
      const { data: skeletonData, isValid, message } = buildTree(content);
      if (!isValid) setErrorMessage(message || "Missing error message");
      else setResultData([...addUniqueIdsToTree(skeletonData)]);
    }
  }, [content, textOutputType]);

  return (
    <>
      {textOutputType === SupportedOutFormats.TEXT && <pre>{content}</pre>}
      {textOutputType === SupportedOutFormats.HTML && <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: content }} />}
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
      {(!textOutputType || !Object.values(SupportedOutFormats).includes(textOutputType)) && <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>}
      {debug && <CopyButton buttonText={"Copy Skeleton As Yaml"} textToCopy={""} onCopy={() => {}} />}
      {debug && <JSONDataViewer metadata={{ data, resultData, errorMessage }} title="VandanaKiMaaKaBhosda" />}
    </>
  );
};

export { SmartEditor as SmartEditorV4, SmartPreviewer as SmartPreviewerV4 };
