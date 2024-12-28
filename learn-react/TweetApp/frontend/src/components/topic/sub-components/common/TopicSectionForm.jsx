import React, { useEffect, useState } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { SmartEditor } from "../../../../common/components/smart-editor/SmartEditorV3";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTags,
  selectAllFlatTags,
} from "../../../../redux/slices/tagsSlice";
import Select from "react-select";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";

const TopicSectionForm = ({
  formData: initialValue,
  selectedTopic,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const dispatch = useDispatch();
  const flatTagList = useSelector(selectAllFlatTags) || [];
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
      setFormData((prev) => ({ ...sectionsData }));
      // setLoading(false);
    }
  }, [sectionsData]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

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

  const tagOptions = flatTagList.map((tag) => ({
    value: tag.uniqueId,
    label: tag.title,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{formData.uniqueId ? "Update Section" : "Create Section"}</h2>
      <p>
        <strong>Topic:</strong> {selectedTopic?.title || "Invalid Topic"}
      </p>

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
          style={styles.inputStyle}
          required
        />
      </div>

      <div style={styles.editorContainer}>
        <SmartEditor
          initialValue={formData.smartContent}
          onChange={handleSmartEditorChange}
          onError={setSmartEditorError}
        />
      </div>

      <div>
        <label htmlFor="tags">Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
          onChange={handleTagSelect}
        />
      </div>

      {formErrors.length > 0 && (
        <div>
          {formErrors.map((error, index) => (
            <span key={index} style={styles.error}>
              {error}
            </span>
          ))}
        </div>
      )}

      <div style={styles.buttonContainer}>
        <CustomButton onClick={handleSubmit}>
          {formData.uniqueId ? "Update" : "Save"} Changes
        </CustomButton>
        <CustomButton onClick={onCancel}>Cancel</CustomButton>
      </div>

      <JSONDataViewer metadata={{ formData }} />
    </div>
  );
};

const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  labelStyle: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  inputStyle: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  editorContainer: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },
};

export default TopicSectionForm;
