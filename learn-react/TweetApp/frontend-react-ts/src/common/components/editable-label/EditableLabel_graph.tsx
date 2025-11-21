import React, { useMemo, useState } from "react";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import CustomButton from "../custom-button/CustomButton";

interface EditableLabelGraphProps {
  text?: string;
  postUpdateClick?: (value: string) => void;
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

const EditableLabelGraph: React.FC<EditableLabelGraphProps> = ({
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
}) => {
  const initialEditorState = useMemo(() => {
    try {
      return text
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        : EditorState.createEmpty();
    } catch {
      return EditorState.createEmpty();
    }
  }, [text]);

  const [editing, setEditing] = useState(editMode);
  const [editorState, setEditorState] = useState(initialEditorState);

  const handleLabelClick = () => {
    if (editable) setEditing(true);
  };

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmitClick = () => {
    setEditing(false);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    postUpdateClick(JSON.stringify(rawContentState));
    if (flushSavedText) {
      setEditorState(EditorState.createEmpty());
    }
  };

  const cancelEdit = () => setEditing(false);

  const hasText = editorState.getCurrentContent().hasText();

  return (
    <div className={`space-y-3 ${containerClassName}`}>
      {editing ? (
        <>
          <div
            className={`rounded-xl border border-gray-200 bg-white p-3 shadow-inner ${editorClassName}`}
            style={textAreaStyle}
          >
            <Editor
              editorState={editorState}
              onChange={handleEditorChange}
              placeholder={placeholder}
              readOnly={!editable}
            />
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
          {hasText ? (
            <div>{editorState.getCurrentContent().getPlainText()}</div>
          ) : (
            <div className="text-gray-400">{placeholder}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableLabelGraph;
