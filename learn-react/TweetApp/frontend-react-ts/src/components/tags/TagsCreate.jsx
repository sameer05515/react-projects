import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTag, updateTag } from '../../redux/slices/tagsSlice';
import CustomButton from '../../common/components/custom-button/CustomButton';

function TagsCreate({ tag, onCancelEdit }) {
  const dispatch = useDispatch();

  const [tagData, setTagData] = useState({
    name: '',
    description: '',
  });

  const isEditing = !!tag; // Determine if we're editing an existing tag

  // If we are editing an existing tag, populate the form with its data
  useEffect(() => {
    if (isEditing) {
      setTagData(tag);
    } else {
      setTagData({
        name: '',
        description: '',
      });
    }
  }, [tag, isEditing]);

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTagData({ ...tagData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!tagData.name.trim()) {
      errors.name = 'Name is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveTag = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        // If editing an existing tag, dispatch the updateTag action
        // console.log(JSON.stringify(` in component : tagData : ${JSON.stringify(tagData)}`))
        dispatch(updateTag(tagData));
      } else {
        // If creating a new tag, dispatch the createTag action
        dispatch(createTag(tagData));
      }

      // Clear the form and close the edit mode
      setTagData({
        name: '',
        description: '',
      });

      if (onCancelEdit) {
        onCancelEdit();
      }
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{isEditing ? "Edit Tag" : "Create Tag"}</h2>
      <form className="mt-6 space-y-5" onSubmit={handleSaveTag}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="name"
            name="name"
            value={tagData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <span className="mt-1 block text-xs text-red-600">{formErrors.name}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            id="description"
            name="description"
            value={tagData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <CustomButton type="submit">{isEditing ? "Save Changes" : "Create Tag"}</CustomButton>
          {isEditing && (
            <CustomButton type="button" onClick={onCancelEdit}>
              Cancel
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default TagsCreate;
