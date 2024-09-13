// SaveUpdateComparableData.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveData, updateData } from "../../redux/slices/comparableDataSlice"; // Adjust the path
import CustomButton from "../../common/components/custom-button/CustomButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SaveUpdateComparableData = ({ dataToEdit, onSaveComplete }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: dataToEdit?.title || "",
    initialSummary: dataToEdit?.initialSummary || "",
    finalSummary: dataToEdit?.finalSummary || "",
    parameters: dataToEdit?.parameters || [],
    // Add other fields as needed
  });

  const handleParameterChange = (index, key, value) => {
    const updatedParameters = [...formData.parameters];
    updatedParameters[index][key] = value;
    setFormData({
      ...formData,
      parameters: updatedParameters,
    });
  };

  const handleAddParameter = () => {
    setFormData({
      ...formData,
      parameters: [...formData.parameters, { header: "", value: "" }],
    });
  };

  const handleRemoveParameter = (index) => {
    const updatedParameters = [...formData.parameters];
    updatedParameters.splice(index, 1);
    setFormData({
      ...formData,
      parameters: updatedParameters,
    });
  };

  const handleSaveOrUpdate = () => {
    if (dataToEdit) {
      // If _id is present, it's an existing item, so update it
      dispatch(updateData({ ...formData, uniqueId: dataToEdit.uniqueId }));
    } else {
      // If _id is not present, it's a new item, so save it
      dispatch(saveData(formData));
    }
    // Reset the form data after saving or updating
    setFormData({
      title: "",
      initialSummary: "",
      finalSummary: "",
      parameters: [],
      // Reset other fields as needed
    });
    // Notify the parent component that the save/update is complete
    onSaveComplete();
  };

  useEffect(() => {
    // Update the form data when dataToEdit prop changes (for editing)
    setFormData({
      title: dataToEdit?.title || "",
      initialSummary: dataToEdit?.initialSummary || "",
      finalSummary: dataToEdit?.finalSummary || "",
      parameters: dataToEdit?.parameters || [],
      // Update other fields as needed
    });
  }, [dataToEdit]);

  const handleEditorChange = (event, editor, field) => {
    const data = editor.getData();
    setFormData({ ...formData, [field]: data });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>{dataToEdit ? "Edit" : "Add"} Comparable Data</h2>

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      /> <br/>

      <label>Initial Summary:</label>
      <CKEditor
        editor={ClassicEditor}
        data={formData.initialSummary}
        onChange={(event, editor) =>
          handleEditorChange(event, editor, "initialSummary")
        }
      /> <br/>

      <label>Final Summary:</label>
      <CKEditor
        editor={ClassicEditor}
        data={formData.finalSummary}
        onChange={(event, editor) =>
          handleEditorChange(event, editor, "finalSummary")
        }
      /> <br/>

      <div>
        <h3>Parameters:</h3>
        {formData.parameters.map((parameter, index) => (
          <div key={index}>
            <label>Header:</label>
            <input
              type="text"
              value={parameter.header}
              onChange={(e) =>
                handleParameterChange(index, "header", e.target.value)
              }
            /> <br/>
            <label>Value:</label>
            <CKEditor
              editor={ClassicEditor}
              data={parameter.value}
              onChange={(event, editor) =>
                handleEditorChange(event, editor, "value")
              }
            /> <br/>
            <CustomButton onClick={() => handleRemoveParameter(index)}>
              Remove Parameter
            </CustomButton>
          </div>
        ))}
        <CustomButton onClick={handleAddParameter}>Add Parameter</CustomButton>
      </div>
      <CustomButton onClick={handleSaveOrUpdate}>
        {dataToEdit ? "Update" : "Save"}
      </CustomButton>
    </div>
  );
};

export default SaveUpdateComparableData;
