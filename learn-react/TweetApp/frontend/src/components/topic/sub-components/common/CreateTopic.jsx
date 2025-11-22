import React, { useState } from "react";
// import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Import the Select component from react-select
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { SmartEditor, SmartPreviewer } from "../../../../common/components/Smart/Editor/v3";
import { getTagsForComboOptions } from "../../../../redux/slices/tagsSlice";
import {
  createTopic,
  fetchTopics,
  updateTopic,
} from "../../../../redux/slices/topicSlice";

function CreateTopic({ parentId, topic, onSave, onCancelEdit }) {
  const dispatch = useDispatch();

  const tagOptions = useSelector(getTagsForComboOptions);

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

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
        {topic?.uniqueId ? "Edit Topic" : "Add Topic"}
      </h3>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <label htmlFor="name" className="font-medium text-slate-700 sm:min-w-[7rem]">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={topicData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="description" className="font-medium text-slate-700">Description:</label>
          <CustomButton
            className="text-sm"
            onClick={() => setShowDescr((prev) => !prev)}
          >
            {showDescr ? "Hide" : "Show"} Description
          </CustomButton>
        </div>
        {showDescr && (
          <div className="border border-slate-200 rounded-md p-3 mb-3 bg-slate-50 max-h-[40vh] overflow-y-auto">
            <SmartPreviewer data={{ content: topicData.description || "", textOutputType: "html" }} />
          </div>
        )}
        <div className="border border-slate-200 rounded-md p-3 bg-white max-h-[50vh] overflow-y-auto">
          <SmartEditor
            preview={false}
            initialValue={topicData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <label htmlFor="occurenceDate" className="font-medium text-slate-700 sm:min-w-[7rem]">
          Date:
        </label>
        <input
          type="date"
          id="occurenceDate"
          name="occurenceDate"
          value={topicData.occurenceDate}
          onChange={handleInputChange}
          className="w-full max-w-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <label htmlFor="tags" className="font-medium text-slate-700 sm:min-w-[7rem] pt-2">
          Tags:
        </label>
        <div className="w-full min-w-0">
          <Select
            isMulti
            name="tags"
            id="tags"
            options={tagOptions}
            value={tagOptions.filter((tag) => topicData.tags.includes(tag.value))}
            onChange={handleTagSelect}
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {formErrors.length > 0 && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          {formErrors.map((error, index) => (
            <p key={index} className="text-red-700 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}

      <div className="sticky bottom-0 left-0 right-0 z-10 flex flex-wrap gap-2 pt-4 pb-2 mt-6 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.05)]">
        <CustomButton
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={(event) => handleSaveTopic(event)}
        >
          {topic ? "Save Changes" : "Create Topic"}
        </CustomButton>
        <CustomButton
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => onCancelEdit?.()}
        >
          Cancel
        </CustomButton>
      </div>
    </div>
  );
}


export default CreateTopic;
