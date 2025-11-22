import React, { useState } from 'react';
import CustomButton from "../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../common/components/Smart/Editor/v3";

const TagForm = ({
  formData: initialValue,
  onSubmit = () => { },
  onCancel: handleCancel = () => { },
}) => {
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

    return errors.length === 0;
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
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {formData.uniqueId ? "Update Tag" : "Create Tag"}
      </h2>

      {formErrors.length > 0 && (
        <ul
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm list-disc list-inside space-y-1"
          role="alert"
        >
          {formErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block font-semibold text-gray-700 mb-1.5 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="tag-description" className="block font-semibold text-gray-700 mb-1.5 text-sm">
            Description
          </label>
          <div className="rounded-lg border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:border-transparent">
            <SmartEditor
              initialValue={formData.smartContent}
              onChange={handleSmartEditorChange}
              onError={handleSmartEditorError}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <CustomButton type="submit">
            {formData.uniqueId ? "Update" : "Save"} changes
          </CustomButton>
          <CustomButton type="button" onClick={handleCancel}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default TagForm;