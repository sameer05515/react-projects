import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import yaml from "js-yaml";
import React, { useEffect, useRef, useState } from "react";
import { buildTree } from "../../../util/indentation-based-string-parser-to-tree-data";
import CustomButton from "../../custom-button/CustomButton";
import JSONDataViewer from "../../json-data-viewer/JSONDataViewer";
import { getKeyName, inputOutputMapping, SupportedInputComponents, SupportedOutFormats } from "../common/utils.v4";
import SmartPreviewer from "../Previewer/v4";

const SmartEditorV4 = ({ initialValue, preview: previewInitialValue = true, onChange = () => {}, onError = () => {} }) => {
  const textareaRef = useRef(null);

  const [selectedOutputType, setSelectedOutputType] = useState(getKeyName(initialValue?.textOutputType, initialValue?.textInputType));
  const [showPreview, setShowPreview] = useState(previewInitialValue);

  const [formData, setFormData] = useState({
    content: initialValue?.content || "",
    textOutputType: inputOutputMapping[selectedOutputType].textOutputType,
    textInputType: inputOutputMapping[selectedOutputType].textInputType,
  });

  // useEffect(() => {
  //   const { textInputType, textOutputType } = inputOutputMapping[selectedOutputType];
  //   if (formData.textOutputType !== textOutputType || formData.textInputType !== textInputType) {
  //     setFormData((prev) => ({ ...prev, textInputType, textOutputType }));
  //   }
  // }, [selectedOutputType]);

  // useEffect(() => {
  //   const { textOutputType, content } = formData;

  //   let error = "";
  //   if (textOutputType === SupportedOutFormats.YAML && content) {
  //     try {
  //       yaml.load(content);
  //     } catch (e) {
  //       error = e.mark ? `Error parsing YAML at line ${e.mark.line + 1}: ${e.message}` : `Error parsing YAML: ${e.message}`;
  //     }
  //   }

  //   if (textOutputType === SupportedOutFormats.TIS_to_SKELETON && content) {
  //     const { isValid, message } = buildTree(content);
  //     if (!isValid) error = message;
  //   }

  //   if (!content.trim()) error = "Content is empty";

  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight * 1.3}px`;
  //   }

  //   // onError(error);
  //   // onChange(formData);
  // }, [formData.content, formData.textOutputType]);

  const handleFormUpdate = (content, textOutputType, textInputType) => {
    // const { textOutputType, content } = formData;

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

    // onError(error);
    // onChange(formData);
  };
  // , [formData.content, formData.textOutputType]);

  const handleChangeOutputTypes = (event) => {
    setSelectedOutputType(event.target.value);
    const { textInputType, textOutputType } = inputOutputMapping[selectedOutputType];
    if (formData.textOutputType !== textOutputType || formData.textInputType !== textInputType) {
      setFormData((prev) => ({ ...prev, textInputType, textOutputType }));
    }
  };
  // const handleInputChange = (e) => setFormData((prev) => ({ ...prev, content: e.target.value }));
  // const handleEditorChange = (event, editor) => setFormData((prev) => ({ ...prev, content: editor.getData() }));

  const updateFormContent = (content = "") => {
    if (!content) {
      console.error("Invalid content", content);
      return;
    }
    setFormData((prev) => ({ ...prev, content: content }));
  };

  return (
    <div>
      <label htmlFor="outputType" style={styles.labelStyle}>
        Select Output Type:
      </label>
      <select value={selectedOutputType} title={inputOutputMapping[selectedOutputType]?.detailedName || ""} onChange={handleChangeOutputTypes}>
        {Object.keys(inputOutputMapping).map((outputType) => (
          <option key={outputType} value={outputType}>
            {outputType.replace(/_/g, " ")}
          </option>
        ))}
      </select>

      {formData.textInputType === SupportedInputComponents.textArea && (
        <div>
          <label htmlFor="content" style={styles.labelStyle}>
            Content:
          </label>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) => updateFormContent(e.target.value)}
            style={styles.textarea}
          />
        </div>
      )}

      {formData.textInputType === SupportedInputComponents.ckEditor && (
        <div>
          <label htmlFor="ckeditor" style={styles.labelStyle}>
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

      {formData.content && (
        <div>
          <b>Preview:</b> <CustomButton onClick={() => setShowPreview((prev) => !prev)}>{showPreview ? "Hide" : "Show"}</CustomButton>
        </div>
      )}

      {showPreview && <SmartPreviewer data={formData} />}
      <JSONDataViewer metadata={{ formData, selectedOutputType }} title="selectedOutputType" />
    </div>
  );
};

// const labelStyle = { fontWeight: "bold" };

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
  labelStyle: { fontWeight: "bold" },
};

export default SmartEditorV4;
