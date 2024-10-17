import React, { useState } from "react";
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css"; // Import Draft.js CSS for styling

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

  // Initialize the editor state with the provided text or an empty string
  const initialEditorState = text
    ? EditorState.createWithContent(text)
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(initialEditorState);

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleQuillChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmitClick = () => {
    setEditing(false);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const jsonText = JSON.stringify(rawContentState);
    postUpdateClick(jsonText);
    if (flushSavedText) {
      setEditorState(EditorState.createEmpty());
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <Editor
            editorState={editorState}
            onChange={handleQuillChange}
            placeholder={placeholder}
            readOnly={!editable}
            style={{
              ...textAreaStyle,
              width: "100%",
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
              ...labelStyle,
              cursor: "pointer",
              border: editable ? "1px solid #ccc" : "",
            }}
          >
            {editorState.getCurrentContent().hasText() ? (
              <div>{editorState.getCurrentContent().getPlainText()}</div>
            ) : (
              <div style={{ color: "#ccc" }}>{placeholder}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EditableLabel;
