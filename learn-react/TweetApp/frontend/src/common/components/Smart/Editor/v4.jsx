import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
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

const debug = false;

const FormError = ({ error }) => (error ? <div className="alert alert-danger mt-2">{error}</div> : null);

const SmartEditorV4 = ({
  initialValue,
  preview: previewInitialValue = true,
  onChange = () => {},
  onError = () => {},
}) => {
  const textareaRef = useRef(null);

  const [showPreview, setShowPreview] = useState(previewInitialValue);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    content: "",
    textOutputType: "",
    textInputType: "",
  });

  const { detailedName, selectedOutputType } = useMemo(
    () => ({
      selectedOutputType: getKeyName(formData.textOutputType, formData.textInputType),
      detailedName: getDetailedName(formData.textOutputType, formData.textInputType),
    }),
    [formData.textInputType, formData.textOutputType]
  );

  const validateContent = (content, outputType) => {
    try {
      if (outputType === SupportedOutFormats.YAML) yaml.load(content);
      if (outputType === SupportedOutFormats.TIS_to_SKELETON) {
        const { isValid, message } = buildTree(content);
        if (!isValid) return message;
      }
    } catch (e) {
      return e.mark
        ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}`
        : `Error parsing YAML: ${e.message}`;
    }
    return "";
  };

  const handleFormUpdate = useCallback((newContent, newOutputType) => {
    if (newContent == null) return;
    const { textInputType, textOutputType } = getInpOupDetailsForKey(newOutputType);
    const validationError = validateContent(newContent, textOutputType);
    setError(validationError);

    setFormData((prev) => ({
      content: newContent,
      textOutputType: textOutputType || prev.textOutputType,
      textInputType: textInputType || prev.textInputType,
    }));
  }, []);

  useEffect(() => {
    if (initialValue)
      handleFormUpdate(initialValue.content, getKeyName(initialValue.textOutputType, initialValue.textInputType));
  }, [handleFormUpdate, initialValue]);

  const handleChangeOutputTypes = useCallback(
    (newOutputType) => {
      if (typeof newOutputType !== "string") return setError(`Invalid newOutputType: '${newOutputType}'`);
      handleFormUpdate(formData.content || "", newOutputType);
    },
    [handleFormUpdate, formData.content]
  );

  const updateFormContent = useCallback(
    (content = "") => {
      if (!content?.trim()) {
        setError("Content cannot be empty");
      }
      handleFormUpdate(content || "");
    },
    [handleFormUpdate]
  );

  return (
    <div className="container">
      {/* Output Type Selection */}
      <div className="form-floating">
        <select
          className="form-select"
          id="OutputTypeCombobox"
          value={selectedOutputType}
          title={detailedName || ""}
          onChange={(e) => handleChangeOutputTypes(e.target.value)}
        >
          {getComboOptions()}
        </select>
        <label htmlFor="OutputTypeCombobox" style={{ fontWeight: "bold" }}>
          Select Output Type:
        </label>
      </div>

      {/* Textarea Input */}
      {formData.textInputType === SupportedInputComponents.textArea && (
        <div className="form-floating">
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={(e) => updateFormContent(e.target.value)}
            style={{ height: "100px" }}
          />
          <label htmlFor="content" style={{ fontWeight: "bold" }}>
            Content:
          </label>
        </div>
      )}

      {/* CKEditor Input */}
      {formData.textInputType === SupportedInputComponents.ckEditor && (
        <div className="form-floating">
          <CKEditor
            id="ckeditor"
            name="ckeditorContent"
            editor={ClassicEditor}
            data={formData.content}
            onChange={(event, editor) => updateFormContent(editor.getData())}
          />
        </div>
      )}

      <FormError error={error} />

      {/* Preview Button */}
      {formData.content && (
        <div>
          <button
            className="btn btn-info btn-sm p-1 m-1 text-uppercase"
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && <SmartPreviewer data={formData} />}
        </div>
      )}

      {debug && <JSONDataViewer metadata={{ formData }} title="selectedOutputType" />}
    </div>
  );
};

export default SmartEditorV4;
