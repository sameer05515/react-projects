import React, { useEffect, useState } from "react";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../../common/components/smart-editor/SmartEditorV3";
import { BACKEND_APPLICATION_BASE_URL } from "../../../common/constants/globalConstants";
import useDataFetching from "../../../common/hooks/useDataFetching";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, selectAllFlatTags } from "../../../redux/slices/tagsSlice";
import Select from "react-select";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";

const TopicSectionForm = ({
  formData: initialValue,
  selectedTopic,
  onSubmit = () => {},
  onCancel: handleCancel = () => {},
}) => {
  const dispatch = useDispatch();
  const flatTagList = useSelector(selectAllFlatTags);
  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

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
    linkedTopicUniqueId:
      initialValue && initialValue.linkedTopicUniqueId
        ? initialValue.linkedTopicUniqueId
        : "",
    name: initialValue && initialValue.name ? initialValue.name : "",
    smartContent: initialValue?.smartContent || {
      content: "",
      textOutputType: "",
      textInputType: "",
    },
    tags:
      initialValue?.tags && initialValue.tags.length > 0
        ? initialValue.tags
        : [],
  });

  const sectionFetchUrl = `${BACKEND_APPLICATION_BASE_URL}/topics/${initialValue.linkedTopicUniqueId}/sections/${initialValue.uniqueId}`;
  const {
    data: sectionsData,
    // loading: sectionLoading,
    // error: sectionsFetchError,
    refetch: sectionsRefetch,
  } = useDataFetching(sectionFetchUrl);

  useEffect(() => {
    if (initialValue.linkedTopicUniqueId && initialValue.uniqueId) {
      sectionsRefetch();
    }
  }, [initialValue.linkedTopicUniqueId, initialValue.uniqueId]);

  useEffect(() => {
    if (sectionsData) {
      // alert(JSON.stringify(sectionsData))
      setFormData((pre) => ({ ...sectionsData }));
      setLoading(false); // Loading completed
    }
  }, [sectionsData]);

  useEffect(() => {
    // Fetch available tags when the component mounts
    // You should dispatch an action to retrieve the tags from your API
    // For example: dispatch(fetchTags());
    dispatch(fetchTags());
  }, [dispatch]);

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

  const handleTagSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the topic data
    setFormData({ ...formData, tags: selectedTags.map((tag) => tag.value) });
  };

  const tagOptions = flatTagList.map((tag) => ({
    value: tag.uniqueId, // Assuming tags have unique IDs
    label: tag.title, // Display tag names in the dropdown
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (loading) {
    // Render loading state until sectionsRefetch operation is complete successfully
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <span>
          <h2>{formData.uniqueId ? "Update Section" : "Save Section"}</h2>
        </span>
        <br />
        <span>
          <b>Topic: </b>
          {selectedTopic?.title || "Invalid Topic"}
        </span>
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

      <div>
        <label htmlFor="tags">Add Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
          onChange={handleTagSelect}
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

      <br />
      <JSONDataViewer metadata={{ formData }} />
    </div>
  );
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

export default TopicSectionForm;
