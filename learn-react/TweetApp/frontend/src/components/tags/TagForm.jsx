import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from "../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../common/components/Smart/Editor/v3";

const TagForm = ({
  formData: initialValue,
  onSubmit = () => { },
  onCancel: handleCancel = () => { },
}) => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const [formData, setFormData] = useState({
    uniqueId:
      initialValue && initialValue.uniqueId ? initialValue.uniqueId : "",
    description: initialValue ? initialValue.description : '',
    name: initialValue && initialValue.name ? initialValue.name : "",
    parentId:
      initialValue && initialValue.parentId ? initialValue.parentId : "",
    smartContent: initialValue?.smartContent || {
      content: initialValue?.description || "",
      textOutputType: "",
      textInputType: "",
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent) => {
    setFormData({ ...formData, smartContent: smartContent });
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  return (
    <div>
      <div>
        <span>
          <h2>{formData.uniqueId ? "Update Tag" : "Save Tag"}</h2>
        </span>
        <br />
       
      </div>
      <div>
        <label htmlFor="name" style={styles.labelStyle}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={styles.pairedComponentStyle} // Apply paired component style
          required
        />
      </div>

      <div style={{ border: "1px solid #ddd", padding: "5px", margin: "5px" }}>
        <SmartEditor
          initialValue={formData.smartContent}
          onChange={handleSmartEditorChange}
          onError={handleSmartEditorError}
        />
      </div>

      {/* <div>
        <b>formData: </b>
        <pre>{`JSON.stringify(formData, null, 2) : ${JSON.stringify(formData, null, 2)}`}</pre>
      </div> */}
      {formErrors.length > 0 && (
        <div>
          {formErrors.map((error, index) => (
            <span key={index} style={styles.error}>
              {error}
            </span>
          ))}
        </div>
      )}
      <CustomButton onClick={(e) => handleSubmit(e)}>
        {formData.uniqueId ? "Update " : "Save "}Changes
      </CustomButton>
      <CustomButton onClick={handleCancel}>Cancel</CustomButton>
    </div>
  )
};

const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
  labelStyle: {
    width: "15%", // Set label width to 25%
    fontWeight: "bold", // Make label text bold
  },
  pairedComponentStyle: {
    width: "85%", // Set paired component width to 75%
  },
};

export default TagForm;