import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomButton from "../custom-button/CustomButton";
import { SmartPreviewer } from "../Smart/Editor/v3";

type EditableLabelProps = {
  text?: string;
  postUpdateClick?: (updatedText: string) => void;
  placeholder?: string;
  editMode?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  flushSavedText?: boolean;
  saveOnBlur?: boolean;
  editable?: boolean;
  className?: string;
  containerClassName?: string;
  displayClassName?: string;
  editorClassName?: string;
  labelStyle?: React.CSSProperties;
  textAreaStyle?: React.CSSProperties;
};

function EditableLabel({
  text = "",
  postUpdateClick = () => {},
  placeholder = "No placeholder given",
  editMode = false,
  submitButtonText = "Update",
  cancelButtonText = "Cancel",
  flushSavedText = false,
  saveOnBlur = true,
  editable = true,
  className = "",
  containerClassName = "",
  displayClassName = "",
  editorClassName = "",
  labelStyle = {},
  textAreaStyle = {},
}: EditableLabelProps) {
  const [editing, setEditing] = useState(editMode);
  const [editedText, setEditedText] = useState(text);

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleEditorChange = (event: unknown, editor: any) => {
    const data = editor.getData();
    setEditedText(data);
    if (saveOnBlur) {
      // noop; preserved prop for backward compatibility
    }
  };

  const handleSubmitClick = () => {
    setEditing(false);
    postUpdateClick(editedText);
    if (flushSavedText) {
      setEditedText("");
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className={`space-y-3 ${containerClassName} ${className}`}>
      {editing ? (
        <>
          <div
            className={`rounded-xl border border-gray-200 bg-white p-3 shadow-inner ${editorClassName}`}
            style={textAreaStyle}
          >
            <CKEditor editor={ClassicEditor as any} data={editedText} onChange={handleEditorChange} />
          </div>
          <div className="flex flex-wrap gap-2">
            <CustomButton className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmitClick}>
              {submitButtonText}
            </CustomButton>
            <CustomButton className="bg-gray-200 text-gray-800" onClick={cancelEdit}>
              {cancelButtonText}
            </CustomButton>
          </div>
        </>
      ) : (
        <div
          onDoubleClick={handleLabelClick}
          className={`rounded-xl border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-900 transition ${
            editable ? "cursor-pointer hover:border-gray-400" : "cursor-default"
          } ${displayClassName}`}
          style={labelStyle}
        >
          <SmartPreviewer
            data={{ content: text || placeholder, textOutputType: "html", textInputType: "TextArea" }}
          />
        </div>
      )}
    </div>
  );
}

export default EditableLabel;
