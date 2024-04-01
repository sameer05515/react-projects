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
            style={{
              ...labelStyle, // Apply custom style passed via prop
              //whiteSpace: "pre-wrap", // Allows wrapping within <pre>
              cursor: "pointer", // Change cursor to pointer on hover
              //padding: "10px", // Add padding for visual comfort
              border: editable ? "1px solid #ccc" : "", // Add a border for clarity
            }}
            // dangerouslySetInnerHTML={{ __html: text || placeholder }}
          >
            {ReactHtmlParser(text || placeholder)}
          </div>
        </>
      )}
    </div>
  );
}

export default EditableLabel;
