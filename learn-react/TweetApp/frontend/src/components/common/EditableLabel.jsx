import React, { useState } from "react";

function EditableLabel({ text, postUpdateClick=()=>{} }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleLabelClick = () => {
    setEditing(true);
  };

  const handleTextareaChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleTextareaBlur = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <textarea
            value={editedText}
            onChange={handleTextareaChange}
          />
          <button
            onClick={() => {
                console.log(editedText);
                setEditing(false);
                postUpdateClick(editedText)
            }}
          >
            Update
          </button>
          <button
            onClick={() => setEditing(false)}
          >
            cancel
          </button>
        </>
      ) : (
        <label onClick={handleLabelClick}>{text}</label>
      )}
    </div>
  );
}

export default EditableLabel;
