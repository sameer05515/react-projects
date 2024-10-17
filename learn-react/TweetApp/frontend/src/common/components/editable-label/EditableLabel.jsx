import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import CustomButton from "../custom-button/CustomButton";

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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditedText(data);
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
    <div>
      {editing ? (
        <>
          <CKEditor
            editor={ClassicEditor}
            data={editedText}
            onChange={handleEditorChange}
          />
          <CustomButton onClick={handleSubmitClick}>
            {submitButtonText}
          </CustomButton>
          <CustomButton onClick={cancelEdit}>{cancelButtonText}</CustomButton>
        </>
      ) : (
        <div
          onDoubleClick={handleLabelClick}
          style={{
            ...labelStyle,
            cursor: "pointer",
            border: editable ? "1px solid #ccc" : "",
          }}
        >
          {ReactHtmlParser(text || placeholder)}
        </div>
      )}
    </div>
  );
}

export default EditableLabel;
