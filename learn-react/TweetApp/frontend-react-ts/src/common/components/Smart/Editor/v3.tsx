import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { addUniqueIdsToTree } from "../../../util/id-adder-util";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import CustomButton from "../../custom-button/CustomButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import MarkdownComponent from "../../markdown-component/MarkdownComponent";
import Tree from "../../tree-viewer/TreeViewer";

const debug = false;

export const availableOutputTypes = {
  TEXT: "text",
  HTML: "html",
  YAML: "yaml",
  MARKDOWN: "markdown",
  SKELETON: "skeleton",
};

const availableInputTypes = {
  textArea: "TextArea",
  ckEditor: "CKEditor",
};

const inputOutputMapping = {
  RAW_TEXT: {
    textOutputType: availableOutputTypes.TEXT,
    textInputType: availableInputTypes.textArea,
  },
  HTML_OUTPUT_FROM_RAW_TEXT: {
    textOutputType: availableOutputTypes.HTML,
    textInputType: availableInputTypes.textArea,
  },
  HTML_OUTPUT_FROM_CKEDITOR: {
    textOutputType: availableOutputTypes.HTML,
    textInputType: availableInputTypes.ckEditor,
  },
  YAML: {
    textOutputType: availableOutputTypes.YAML,
    textInputType: availableInputTypes.textArea,
  },
  MARKDOWN: {
    textOutputType: availableOutputTypes.MARKDOWN,
    textInputType: availableInputTypes.textArea,
  },
  SKELETON: {
    textOutputType: availableOutputTypes.SKELETON,
    textInputType: availableInputTypes.textArea,
  },
};

const getKeyName = (textOutputType: string, textInputType: string) =>
  Object.keys(inputOutputMapping).find(
    (key) => (inputOutputMapping as any)[key].textOutputType === textOutputType && (inputOutputMapping as any)[key].textInputType === textInputType
  ) || "HTML_OUTPUT_FROM_RAW_TEXT";

interface SmartEditorValue {
  content: string;
  textOutputType: string;
  textInputType: string;
}

interface SmartEditorProps {
  initialValue?: Partial<SmartEditorValue>;
  preview?: boolean;
  onChange?: (value: SmartEditorValue) => void;
  onError?: (message: string) => void;
}

const SmartEditor: React.FC<SmartEditorProps> = ({ initialValue, preview: previewInitialValue = true, onChange = () => {}, onError = () => {} }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedOutputType, setSelectedOutputType] = useState(getKeyName(initialValue?.textOutputType || "", initialValue?.textInputType || ""));
  const [showPreview, setShowPreview] = useState(previewInitialValue);

  const [formData, setFormData] = useState<SmartEditorValue>({
    content: initialValue?.content || "",
    textOutputType: (inputOutputMapping as any)[selectedOutputType].textOutputType,
    textInputType: (inputOutputMapping as any)[selectedOutputType].textInputType,
  });

  useEffect(() => {
    const { textInputType, textOutputType } = (inputOutputMapping as any)[selectedOutputType];
    if (formData.textOutputType !== textOutputType || formData.textInputType !== textInputType) {
      setFormData((prev) => ({ ...prev, textInputType, textOutputType }));
    }
  }, [selectedOutputType, formData.textOutputType, formData.textInputType]);

  const handleFormDataChange = useCallback(() => {
    const { textOutputType, content } = formData;

    let error = "";
    if (textOutputType === availableOutputTypes.YAML && content) {
      try {
        yaml.load(content);
      } catch (e: unknown) {
        const err = e as any;
        error = err?.mark ? `Error parsing YAML at line ${err.mark.line + 1}: ${String(err.message)}` : `Error parsing YAML: ${String(err?.message || e)}`;
      }
    }

    if (textOutputType === availableOutputTypes.SKELETON && content) {
      const { isValid, message } = buildTree(content);
      if (!isValid) error = message || "";
    }

    if (!content.trim()) error = "Content is empty";

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 1.3}px`;
    }

    onError(error);
    onChange(formData);
  }, [formData, onError, onChange]);

  useEffect(() => {
    handleFormDataChange();
  }, [formData.content, formData.textOutputType, handleFormDataChange]);

  const handleChangeOutputTypes = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOutputType(event.target.value);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev) => ({ ...prev, content: e.target.value }));
  const handleEditorChange = (_event: any, editor: any) => setFormData((prev) => ({ ...prev, content: editor.getData() }));

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="outputType" className="font-bold block mb-2">
          Select Output Type:
        </label>
        <select 
          value={selectedOutputType} 
          onChange={handleChangeOutputTypes}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(inputOutputMapping).map((outputType) => (
            <option key={outputType} value={outputType}>
              {outputType.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {formData.textInputType === availableInputTypes.textArea && (
        <div>
          <label htmlFor="content" className="font-bold block mb-2">
            Content:
          </label>
          <textarea 
            ref={textareaRef} 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2.5 text-base rounded border border-gray-300 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {formData.textInputType === availableInputTypes.ckEditor && (
        <div>
          <label htmlFor="ckeditor" className="font-bold block mb-2">
            Content:
          </label>
          <CKEditor editor={ClassicEditor as any} data={formData.content} onChange={handleEditorChange} />
        </div>
      )}

      {formData.content && (
        <div className="mb-2">
          <b>Preview:</b> <CustomButton onClick={() => setShowPreview((prev) => !prev)}>{showPreview ? "Hide" : "Show"}</CustomButton>
        </div>
      )}

      {showPreview && <SmartPreviewer data={formData} />}
      {debug && <JSONDataViewer metadata={{ formData, initialValue } as any} title="X-Ray: formData" />}
    </div>
  );
};

const FONT_SIZE_CLASS_MAP = {
  "10px": "text-[10px]",
  "12px": "text-[12px]",
  "20px": "text-[20px]",
  "25px": "text-[25px]",
};

const SmartPreviewer: React.FC<{ data: SmartEditorValue; markdownStyles?: { fontSize?: string } }> = ({ data, markdownStyles: { fontSize } = { fontSize: "" } }) => {
  const { content, textOutputType } = data;

  const [yamlProcessedData, setYamlProcessedData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultData, setResultData] = useState<any[]>([]);

  useEffect(() => {
    if (textOutputType === availableOutputTypes.YAML && content) {
      try {
        setYamlProcessedData(yaml.load(content));
        setErrorMessage("");
      } catch (e: unknown) {
        const err = e as any;
        const error = err?.mark ? `Error parsing YAML at line ${err.mark.line + 1}: ${String(err.message)}` : `Error parsing YAML: ${String(err?.message || e)}`;
        setErrorMessage(error);
      }
    }
    if (textOutputType === availableOutputTypes.SKELETON && content) {
      const { data: skeletonData, isValid, message } = buildTree(content);
      if (!isValid) setErrorMessage(message || "Missing error message");
      else setResultData([...addUniqueIdsToTree(skeletonData as any[])]);
    }
  }, [content, textOutputType]);

  return (
    <>
      {textOutputType === availableOutputTypes.TEXT && <pre className="text-gray-900 dark:text-gray-100">{content}</pre>}
      {textOutputType === availableOutputTypes.HTML && <div className="text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{ __html: content }} />}
      {textOutputType === availableOutputTypes.MARKDOWN && (
        <MarkdownComponent markdownText={content} className={fontSize ? (FONT_SIZE_CLASS_MAP[fontSize] || "") : ""} />
      )}
      {textOutputType === availableOutputTypes.YAML && (
        <div>
          <pre className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-auto">{JSON.stringify(yamlProcessedData, null, 2)}</pre>
          {errorMessage && <span className="text-red-600 dark:text-red-400">{errorMessage}</span>}
        </div>
      )}
      {textOutputType === availableOutputTypes.SKELETON && resultData && resultData.length > 0 && (
        <>
          <Tree
            data={resultData}
            expandAll={true}
            renderNode={(node) => <MarkdownComponent markdownText={node.name || "**tree node name is missing!**"} />}
          />
          {errorMessage && <span className="text-red-600 dark:text-red-400">{errorMessage}</span>}
        </>
      )}

      {(!textOutputType || !Object.values(availableOutputTypes).includes(textOutputType)) && <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{content}</div>}
      {/* <JSONDataViewer metadata={{data,resultData,errorMessage  }} title="X-Ray"/> */}
    </>
  );
};

export { SmartEditor, SmartPreviewer };
