import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTag, updateTag } from '../../redux/slices/tagsSlice';
import CustomButton from '../../common/components/CustomButton';

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
    <div>
      <h2>{isEditing ? 'Edit Tag' : 'Create Tag'}</h2>
      <form onSubmit={handleSaveTag}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={tagData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={tagData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <CustomButton type="submit">{isEditing ? 'Save Changes' : 'Create Tag'}</CustomButton>
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
