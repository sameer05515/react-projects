import React, { useState } from "react";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";

function EditableLabel({
  text,
  postUpdateClick = () => {},
  labelStyle = { fontSize: "10px" },
  textAreaStyle = {},
  placeholder = "No placeholder given",
  editMode = false,
  submitButtonText = "Update",
  cancelButtonText = "Cancel",
  flushSavedText = false,
  saveOnBlur = true,
  editable = true,
}) {
  const [editing, setEditing] = useState(editMode);
  const [editedText, setEditedText] = useState(text);

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleQuillChange = (value) => {
    setEditedText((prevEditedText) => value);
  };

  const handleSubmitClick = () => {
    setEditing(false);
    postUpdateClick(editedText);
    if (flushSavedText) {
      setEditedText((prevEditedText) => "");
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <ReactQuill
            value={editedText}
            onChange={handleQuillChange}
            //onBlur={handleTextAreaBlur}
            placeholder={placeholder}
            editable={editing}            
            style={{
              ...textAreaStyle, // Apply custom style passed via prop
              width: "100%", // Expand the textarea width
              //height: `${editedText.split("\n").length + 3}em`, // Set height based on number of lines
            }}
          />
          <button onClick={handleSubmitClick}>{submitButtonText}</button>
          <button onClick={cancelEdit}>{cancelButtonText}</button>
        </>
      ) : (
        <>          
          <div
            onDoubleClick={handleLabelClick}
            className={`cursor-pointer ${editable ? "border border-gray-300" : ""}`}
            style={labelStyle}
          >
            {ReactHtmlParser(text || placeholder)}
          </div>
        </>
      )}
    </div>
  );
}

export default EditableLabel;
