import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import CustomButton from "../../custom-button/CustomButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import {
  getDetailedName,
  SupportedInputComponents,
  SupportedOutFormats,
  getInpOupDetailsForKey,
  getComboOptions,
  getKeyName,
} from "../common/utils.v4";
import SmartPreviewer from "../Previewer/v4";

const debug = true;

const FormError = ({ error }) => {
  if (!error) return null;
  return <div className="alert alert-danger mt-2">{error}</div>;
};

const SmartEditorV4 = ({ initialValue, preview: previewInitialValue = true, onChange = () => {}, onError = () => {} }) => {
  const textareaRef = useRef(null);

  const [showPreview, setShowPreview] = useState(previewInitialValue);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    content: "",
    textOutputType: "",
    textInputType: "",
  });

  const { detailedName, selectedOutputType } = useMemo(() => {
    const selectedOutputType = getKeyName(formData.textOutputType, formData.textInputType);
    const detailedName = getDetailedName(formData.textOutputType, formData.textInputType);
    return { detailedName, selectedOutputType };
  }, [formData.textInputType, formData.textOutputType]);

  const handleFormUpdate = useCallback((newContent, newOutputType) => {
    const { textInputType: newTextInputType, textOutputType: newTextOutputType } = getInpOupDetailsForKey(newOutputType);

    let validationError = "";
    if (newTextOutputType === SupportedOutFormats.YAML && newContent) {
      try {
        yaml.load(newContent);
      } catch (e) {
        validationError = e.mark ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}` : `Error parsing YAML: ${e.message}`;
      }
    }

    if (newTextOutputType === SupportedOutFormats.TIS_to_SKELETON && newContent) {
      const { isValid, message } = buildTree(newContent);
      if (!isValid) validationError = message;
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 1.3}px`;
    }

    setError(validationError);

    setFormData((prev) => ({
      ...prev,
      content: newContent ? newContent : prev.content,
      textOutputType: newTextOutputType && prev.textOutputType !== newTextOutputType ? newTextOutputType : prev.textOutputType,
      textInputType: newTextInputType && prev.textInputType !== newTextInputType ? newTextInputType : prev.textInputType,
    }));
  }, []);

  useEffect(() => {
    if (initialValue) {
      const keyName = getKeyName(initialValue?.textOutputType, initialValue.textInputType);
      handleFormUpdate(initialValue?.content, keyName);
    }
  }, [handleFormUpdate, initialValue]);

  const handleChangeOutputTypes = useCallback(
    (newOutputType, content) => {
      if (!newOutputType) {
        setError(`Invalid newOutputType : '${newOutputType}'`);
        console.error("Invalid newOutputType", newOutputType);
        return;
      }

      handleFormUpdate(content, newOutputType);
    },
    [handleFormUpdate]
  );

  const updateFormContent = useCallback(
    (content = "") => {
      if (!content) {
        setError(`Invalid content : '${content}'`);
        console.error("Invalid content", content);
        return;
      }
      handleFormUpdate(content);
    },
    [handleFormUpdate]
  );

  return (
    <div>
      <label htmlFor="outputType" style={{ fontWeight: "bold" }}>
        Select Output Type:
      </label>
      <select
        value={selectedOutputType}
        title={detailedName || ""}
        onChange={(event) => handleChangeOutputTypes(event.target.value, formData.content)}
      >
        {getComboOptions()}
      </select>

      {formData.textInputType === SupportedInputComponents.textArea && (
        <div>
          <label htmlFor="content" style={{ fontWeight: "bold" }}>
            Content:
          </label>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) => updateFormContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "none",
              overflow: "hidden",
            }}
          />
        </div>
      )}

      {formData.textInputType === SupportedInputComponents.ckEditor && (
        <div>
          <label htmlFor="ckeditor" style={{ fontWeight: "bold" }}>
            Content:
          </label>
          <CKEditor
            id="ckeditor"
            name="content"
            editor={ClassicEditor}
            data={formData.content}
            onChange={(event, editor) => updateFormContent(editor.getData())}
          />
        </div>
      )}

      <FormError error={error} />

      {formData.content && (
        <div>
          <b>Preview:</b> <CustomButton onClick={() => setShowPreview((prev) => !prev)}>{showPreview ? "Hide" : "Show"}</CustomButton>
        </div>
      )}

      {showPreview && <SmartPreviewer data={formData} />}
      {debug && <JSONDataViewer metadata={{ formData }} title="selectedOutputType" />}
    </div>
  );
};

export default SmartEditorV4;
