import React, { useState } from "react";

function EditableLabel({ text, postUpdateClick = () => {}, style = {} }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleLabelClick = () => {
    setEditing(true);
  };

  const handleTextareaChange = (e) => {
    setEditedText((prevEditedText) => e.target.value);
    console.log(editedText);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <textarea
            value={editedText}
            onChange={handleTextareaChange}
            onBlur={cancelEdit}
            style={{
              width: "100%", // Expand the textarea width
              height: `${editedText.split("\n").length + 3}em`, // Set height based on number of lines
            }}
          />
          <button
            onClick={() => {
              console.log(editedText);
              setEditing(false);
              postUpdateClick(editedText);
            }}
          >
            Update
          </button>
          <button onClick={cancelEdit}>cancel</button>
        </>
      ) : (
        <>
          <label
            onClick={handleLabelClick}
            style={{
              ...style, // Apply custom style passed via prop
              whiteSpace: "pre-wrap", // Allows wrapping within <pre>
              cursor: "pointer", // Change cursor to pointer on hover
              padding: "10px", // Add padding for visual comfort
              border: "1px solid #ccc", // Add a border for clarity
            }}
          >
            {text}
          </label>
        </>
      )}
    </div>
  );
}

export default EditableLabel;
