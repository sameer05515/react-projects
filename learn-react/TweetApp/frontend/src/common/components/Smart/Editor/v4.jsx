import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import {
  getDetailedName,
  SupportedInputComponents,
  getInpOupDetailsForKey,
  getComboOptions,
  getKeyName,
  validateSmartContent,
} from "../common/utils.v4";
import SmartPreviewer from "../Previewer/v4";
import FormMessagesV1 from "../../FormMessages/v1";

const debug = false;

// const FormError = ({ error }) => (error ? <div className="alert alert-danger mt-2">{error}</div> : null);

const SmartEditorV4 = ({
  initialValue = {
    content: "",
    textOutputType: "",
    textInputType: "",
  },
  preview: previewInitialValue = true,
  onSubmit = async () => ({ isError: false, messages: [] }),
}) => {
  const [showPreview, setShowPreview] = useState(previewInitialValue);
  const [formMessages, setFormMessages] = useState([]);

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

  const handleFormUpdate = useCallback((newContent, newOutputType) => {
    if (newContent == null) return;
    const { textInputType, textOutputType } = getInpOupDetailsForKey(newOutputType);
    const validationError = validateSmartContent(newContent, textOutputType);
    setFormMessages(validationError);

    setFormData((prev) => ({
      content: newContent,
      textOutputType: textOutputType || prev.textOutputType,
      textInputType: textInputType || prev.textInputType,
    }));
  }, []);

  useEffect(() => {
    if (initialValue)
      handleFormUpdate(
        initialValue?.content || "",
        getKeyName(initialValue.textOutputType, initialValue.textInputType)
      );
  }, [handleFormUpdate, initialValue]);

  const handleChangeOutputTypes = useCallback(
    (newOutputType) => {
      if (typeof newOutputType !== "string") {
        setFormMessages([{ type: "error", message: `Invalid newOutputType: '${newOutputType}'` }]);
        return;
      }
      handleFormUpdate(formData.content || "", newOutputType);
    },
    [handleFormUpdate, formData.content]
  );

  const updateFormContent = useCallback(
    (content = "") => {
      if (!content?.trim()) {
        setFormMessages([{ type: "error", message: "Content cannot be empty" }]);
      }
      handleFormUpdate(content || "");
    },
    [handleFormUpdate]
  );

  const handleSave = async () => {
    const result = await onSubmit(formData);
    console.log("result: ", result);
    if (result.isError) {
      setFormMessages([...result.messages] || [{ type: "error", message: "Some unexpected error occurred!" }]);
    } else {
      setFormMessages([...result.messages]);
    }
  };

  const handleReset = () => {
    setFormData({
      content: initialValue?.content || "",
      textOutputType: initialValue?.textOutputType || "",
      textInputType: initialValue?.textInputType || "",
    });
  };

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
            // ref={textareaRef}
            id="content"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={(e) => updateFormContent(e.target.value)}
            style={{ height: "300px" }}
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

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-outline-secondary me-2" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* <FormError error={error} /> */}
      {<FormMessagesV1 messages={formMessages} />}

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
