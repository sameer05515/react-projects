import React, { useState } from 'react';
import CustomButton from "../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../common/components/Smart/Editor/v3";

type TagFormProps = {
  formData: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
};

const TagForm: React.FC<TagFormProps> = ({
  formData: initialValue,
  onSubmit = () => { },
  onCancel: handleCancel = () => { },
}) => {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

  const validateForm = () => {
    const errors: string[] = [];

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent: any) => {
    setFormData({ ...formData, smartContent: smartContent });
  };

  const handleSmartEditorError = (error: string) => {
    setSmartEditorError(error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit && onSubmit(formData);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {formData.uniqueId ? "Update Tag" : "Save Tag"}
        </h2>
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="name" className="w-[15%] font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-[85%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="border border-gray-300 p-1.5 m-1.5 rounded">
        <SmartEditor
          initialValue={formData.smartContent}
          onChange={handleSmartEditorChange}
          onError={handleSmartEditorError}
        />
      </div>

      {formErrors.length > 0 && (
        <div className="mt-4">
          {formErrors.map((error, index) => (
            <span key={index} className="block text-red-600 text-sm mt-1.5">
              {error}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <CustomButton onClick={(e) => handleSubmit(e as any)}>
          {formData.uniqueId ? "Update " : "Save "}Changes
        </CustomButton>
        <CustomButton onClick={handleCancel}>Cancel</CustomButton>
      </div>
    </div>
  )
};

export default TagForm;