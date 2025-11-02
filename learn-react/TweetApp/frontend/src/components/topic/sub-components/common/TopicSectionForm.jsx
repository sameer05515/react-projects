import React, { useEffect, useState } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../../../common/components/Smart/Editor/v3";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching/v1";
import { useSelector } from "react-redux";
import { getTagsForComboOptions } from "../../../../redux/slices/tagsSlice";
import Select from "react-select";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";

const TopicSectionForm = ({
  formData: initialValue,
  selectedTopic,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const tagOptions = useSelector(getTagsForComboOptions);
  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    uniqueId: initialValue?.uniqueId || "",
    linkedTopicUniqueId: initialValue?.linkedTopicUniqueId || "",
    name: initialValue?.name || "",
    smartContent: initialValue?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    tags: initialValue?.tags || [],
  });

  const sectionFetchUrl = `${BACKEND_APPLICATION_BASE_URL}/topics/${initialValue?.linkedTopicUniqueId}/sections/${initialValue?.uniqueId}`;
  const { data: sectionsData, refetch: sectionsRefetch } = useDataFetching({
    url: sectionFetchUrl,
    source: "TopicSectionForm",
    fetchInitially: false,
  });

  useEffect(() => {
    if (initialValue?.linkedTopicUniqueId && initialValue?.uniqueId) {
      sectionsRefetch();
    }
  }, [initialValue?.linkedTopicUniqueId, initialValue?.uniqueId]);

  useEffect(() => {
    setLoading(false);
    if (sectionsData) {
      console.trace("sectionsData: ", sectionsData);
      setFormData((prev) => ({ ...sectionsData }));
      // setLoading(false);
    }
  }, [sectionsData]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent) => {
    setFormData({ ...formData, smartContent });
  };

  const handleTagSelect = (selectedTags) => {
    setFormData({ ...formData, tags: selectedTags.map((tag) => tag.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // const tagOptions = flatTagList.map((tag) => ({
  //   value: tag.uniqueId,
  //   label: tag.title,
  // }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{formData.uniqueId ? "Update Section" : "Create Section"}</h2>
      <p>
        <strong>Topic:</strong> {selectedTopic?.title || "Invalid Topic"}
      </p>

      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-1.5">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-2 py-2 mb-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="border border-gray-300 p-2.5 my-2.5 rounded">
        <SmartEditor
          initialValue={formData.smartContent}
          onChange={handleSmartEditorChange}
          onError={setSmartEditorError}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block font-bold mb-2">Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
          onChange={handleTagSelect}
        />
      </div>

      {formErrors.length > 0 && (
        <div className="mb-2.5">
          {formErrors.map((error, index) => (
            <span key={index} className="text-red-600 text-sm block">
              {error}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex gap-2.5">
        <CustomButton onClick={handleSubmit}>
          {formData.uniqueId ? "Update" : "Save"} Changes
        </CustomButton>
        <CustomButton onClick={onCancel}>Cancel</CustomButton>
      </div>

      <JSONDataViewer metadata={{ formData }} />
    </div>
  );
};


export default TopicSectionForm;
