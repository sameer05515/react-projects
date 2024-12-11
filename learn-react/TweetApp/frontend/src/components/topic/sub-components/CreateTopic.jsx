import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Import the Select component from react-select
import { SmartEditor } from "../../../common/components/smart-editor/SmartEditorV3";
import { fetchTags, selectAllFlatTags } from "../../../redux/slices/tagsSlice";
import {
  createTopic,
  fetchTopics,
  updateTopic,
} from "../../../redux/slices/topicSlice";
import CustomButton from "../../../common/components/custom-button/CustomButton";

function CreateTopic({ parentId, topic, onSave, onCancelEdit }) {
  const dispatch = useDispatch();
  const availableTags = useSelector(selectAllFlatTags); // Assuming you have a tags slice in your Redux store

  const [showDescr, setShowDescr] = useState(false);

  const [topicData, setTopicData] = useState({
    name: topic ? topic.name : "",
    description: topic ? topic.description : "",
    smartContent: topic?.smartContent || {
      content: topic ? topic.description : "",
      textOutputType: "",
      textInputType: "",
    },
    parentId: parentId ? parentId : "",
    // Initialize the occurenceDate with the current date
    occurenceDate: topic
      ? new Date(topic.occurenceDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0], // Set the occurenceDate in the format 'YYYY-MM-DD'
    tags: topic ? topic.tags : [], // Set the initial tags based on the topic
  });

  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const validateForm = () => {
    const errors = [];

    if (!topicData.name.trim()) {
      errors.push("Name is required");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  };

  // const handleEditorChange = (event, editor) => {
  //   const data = editor.getData();
  //   setTopicData({ ...topicData, description: data });
  // };

  const handleTagSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the topic data
    setTopicData({ ...topicData, tags: selectedTags.map((tag) => tag.value) });
  };

  useEffect(() => {
    // Fetch available tags when the component mounts
    // You should dispatch an action to retrieve the tags from your API
    // For example: dispatch(fetchTags());
    dispatch(fetchTags());
  }, [dispatch]);

  const tagOptions = availableTags.map((tag) => ({
    value: tag.uniqueId, // Assuming tags have unique IDs
    label: tag.title, // Display tag names in the dropdown
  }));

  const handleSaveTopic = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (topic) {
      // If a topic is provided, it's an update
      dispatch(updateTopic({ ...topicData, uniqueId: topic.uniqueId }));
    } else {
      // Otherwise, it's a new topic creation
      dispatch(createTopic(topicData));
    }

    dispatch(fetchTopics());

    // Notify the parent component to handle closing the CreateTopic form
    if (onSave) {
      onSave();
    }
  };

  const handleSmartEditorChange = (smartContent) => {
    setTopicData({ ...topicData, smartContent: smartContent });
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const formStyle = {};

  return (
    <div style={formStyle}>
      <h3>{topic && topic.uniqueId ? "Edit Topic" : "Add Topic"}</h3>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <label htmlFor="name" style={{ width: "9%", fontWeight: "bold" }}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={topicData.name}
          onChange={handleInputChange}
          style={{ width: "90%" }}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        {/* <textarea
            id="description"
            name="description"
            value={topicData.description}
            onChange={handleInputChange}
          /> */}
        {/* <CKEditor
          id="description"
          name="description"
          editor={ClassicEditor}
          data={topicData.description}
          onChange={handleEditorChange}
        /> */}
        <div>
          <CustomButton onClick={() => setShowDescr((prev) => !prev)}>
            {showDescr ? "Hide " : "Show "}Description
          </CustomButton>
        </div>
        {showDescr && (
          <div
            style={{ border: "1px solid #ddd", padding: "5px", margin: "5px" }}
          >
            {ReactHtmlParser(topicData.description || "")}
          </div>
        )}

        <div
          style={{ border: "1px solid #ddd", padding: "5px", margin: "5px" }}
        >
          <SmartEditor
            preview={false}
            initialValue={topicData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>

      {/* <div style={{ border: "1px solid #ddd", padding: "5px", margin: "5px" }}>
        <SmartEditor initialValue={topicData.smartContent} onChange={handleSmartEditorChange} onError={handleSmartEditorError} />
      </div> */}

      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <label htmlFor="occurenceDate">Date:</label>
        <input
          type="date"
          id="occurenceDate"
          name="occurenceDate"
          value={topicData.occurenceDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tags">Add Tags:</label>
        <Select
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter((tag) => topicData.tags.includes(tag.value))}
          onChange={handleTagSelect}
        />
      </div>
      <div>
        {formErrors.length > 0 && (
          <div>
            {formErrors.map((error, index) => (
              <span key={index} style={styles.error}>
                {error}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <CustomButton onClick={(event) => handleSaveTopic(event)}>
          {topic ? "Save Changes" : "Create Topic"}
        </CustomButton>
        <CustomButton onClick={() => onCancelEdit()}>Cancel</CustomButton>
      </div>
      {/* </form> */}
    </div>
  );
}

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

export default CreateTopic;
