import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartEditor } from "../../../common/components/Smart/Editor/v3";
import {
  createCategory,
  updateCategory,
} from "../../../redux/slices/interviewMgmtSlice";
import { getTagsForComboOptions } from "../../../redux/slices/tagsSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

interface CategoryFormProps {
  parentId?: string;
  category?: any;
  onSave?: () => void;
  onCancelEdit?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ parentId, category, onSave, onCancelEdit }) => {
  const dispatch: AppDispatch = useDispatch();

  const tagOptions = useSelector(getTagsForComboOptions);

  const { createCategoryResponse, updateCategoryResponse } = useSelector(
    (state: RootState) => state.interviewMgmt
  );

  const [formData, setFormData] = useState({
    name: category?.name || "",
    heading: category?.heading || "",
    linkedCategoryId: category?.linkedCategoryId || "",
    smartContent: category?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    parentId: parentId || "",
    rating: category?.rating || 0,
    tags: category?.tags || [],
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

  useEffect(() => {
    if (createCategoryResponse?.error || updateCategoryResponse?.error) {
      setFormErrors([
        createCategoryResponse?.error ||
          updateCategoryResponse?.error ||
          "Missing error message: Please contact administrator",
      ]);
    }
  }, [createCategoryResponse, updateCategoryResponse]);

  const validateForm = useCallback(() => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (!formData.heading.trim()) {
      errors.push("Heading is required");
    }

    if (formData.rating <= 0) {
      errors.push("Rating is required, it should have non-zero value");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);
    return errors.length === 0;
  }, [formData.heading, formData.name, formData.rating, smartEditorError]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTagSelect = useCallback((selectedTags: any) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedTags.map((tag: any) => tag.value),
    }));
  }, []);

  const handleSaveCategory = useCallback(() => {
    if (!validateForm()) {
      return;
    }
    if (category?.uniqueId) {
      dispatch(updateCategory({ ...formData, uniqueId: category.uniqueId }) as any);
    } else {
      dispatch((createCategory as any)(formData) as any);
    }

    if (onSave) {
      onSave();
    }
  }, [formData, validateForm, category, dispatch, onSave]);

  const handleSmartEditorChange = useCallback((smartContent: any) => {
    setFormData((prev) => ({ ...prev, smartContent }));
  }, []);

  const handleSmartEditorError = useCallback((error: string | null) => {
    setSmartEditorError(error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {category?.uniqueId ? "Edit Category" : "Add Category"}
      </h3>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="name" className="w-[9%] font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="heading" className="w-[9%] font-bold text-gray-700">
          Heading:
        </label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={formData.heading}
          onChange={handleInputChange}
          className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="rating" className="w-[9%] font-bold text-gray-700">
          Rating:
        </label>
        <RatingComponent
          rating={formData.rating}
          editable={true}
          onEdit={(editedValue) => {
            setFormData((prev) => ({ ...prev, rating: editedValue }));
          }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Description:</label>
        <div className="border border-gray-300 p-1.5 m-1.5 rounded">
          <SmartEditor
            initialValue={formData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block font-semibold mb-2 text-gray-700">Add Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
          onChange={handleTagSelect}
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
      <div className="mt-6 flex gap-2">
        <CustomButton onClick={handleSaveCategory}>
          {category?.uniqueId ? "Update Changes" : "Save Changes"}
        </CustomButton>
        <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
      </div>
      <div className="mt-4">
        <JSONDataViewer
          metadata={{
            formData,
            createCategoryResponse,
            updateCategoryResponse,
          }}
          title="All collated Responses"
        />
      </div>
    </div>
  );
};

export default CategoryForm;
