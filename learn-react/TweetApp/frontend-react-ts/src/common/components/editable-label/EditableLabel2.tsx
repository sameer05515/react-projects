import React, { useState } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../custom-button/CustomButton";

interface EditableLabelProps {
  text?: string;
  postUpdateClick?: (updatedText: string) => void;
  placeholder?: string;
  editMode?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  flushSavedText?: boolean;
  editable?: boolean;
  containerClassName?: string;
  displayClassName?: string;
  editorClassName?: string;
  labelStyle?: React.CSSProperties;
  textAreaStyle?: React.CSSProperties;
}

function EditableLabel({
  text = "",
  postUpdateClick = () => {},
  placeholder = "No placeholder given",
  editMode = false,
  submitButtonText = "Update",
  cancelButtonText = "Cancel",
  flushSavedText = false,
  editable = true,
  containerClassName = "",
  displayClassName = "",
  editorClassName = "",
  labelStyle = {},
  textAreaStyle = {},
}: EditableLabelProps) {
  const [editing, setEditing] = useState<boolean>(editMode || false);
  const [editedText, setEditedText] = useState<string>(text || "");

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleQuillChange = (value: string) => {
    setEditedText(value);
  };

  const handleSubmitClick = () => {
    setEditing(false);
    postUpdateClick && postUpdateClick(editedText);
    if (flushSavedText) {
      setEditedText("");
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className={`space-y-3 ${containerClassName}`}>
      {editing ? (
        <>
          <div
            className={`rounded-xl border border-gray-200 bg-white p-3 shadow-inner ${editorClassName}`}
            style={textAreaStyle}
          >
            <ReactQuill value={editedText} onChange={handleQuillChange} placeholder={placeholder} />
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
          <span dangerouslySetInnerHTML={{ __html: (text || placeholder) as string }} />
        </div>
      )}
    </div>
  );
}

export default EditableLabel;
