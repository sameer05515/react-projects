import React, { useState } from "react";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../custom-button/CustomButton";

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
}) {
  const [editing, setEditing] = useState(editMode);
  const [editedText, setEditedText] = useState(text);

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleQuillChange = (value) => {
    setEditedText(value);
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
          {ReactHtmlParser(text || placeholder)}
        </div>
      )}
    </div>
  );
}

export default EditableLabel;
