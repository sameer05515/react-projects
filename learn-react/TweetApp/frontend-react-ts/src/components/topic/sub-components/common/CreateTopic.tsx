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
import type { AppDispatch, RootState } from "../../../../redux/store";

function CreateTopic({ parentId, topic, onSave, onCancelEdit }: { parentId?: string | null; topic?: any; onSave?: () => void; onCancelEdit?: () => void }) {
  const dispatch: AppDispatch = useDispatch();

  const tagOptions = useSelector((state: RootState) => getTagsForComboOptions(state));

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

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

  const validateForm = () => {
    const errors: string[] = [];

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

  const handleSaveTopic = () => {
    if (!validateForm()) {
      return;
    }
    if (topic) {
      // If a topic is provided, it's an update
      dispatch(updateTopic({ ...topicData, uniqueId: topic.uniqueId }) as any);
    } else {
      // Otherwise, it's a new topic creation
      dispatch(createTopic(topicData) as any);
    }
    dispatch(fetchTopics() as any);

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
    <div>
      <h3 className="text-xl font-bold mb-4">{topic && topic.uniqueId ? "Edit Topic" : "Add Topic"}</h3>
      <div className="flex items-center p-2.5 mb-4">
        <label htmlFor="name" className="w-[9%] font-bold">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={topicData.name}
          onChange={handleInputChange}
          className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="border border-gray-300 p-1.5 m-1.5 rounded">
            {/* {ReactHtmlParser(topicData.description || "")} */}
            <SmartPreviewer data={{ content: topicData.description || "", textOutputType: "html", textInputType: "TextArea" }}/>
          </div>
        )}

        <div className="border border-gray-300 p-1.5 m-1.5 rounded">
          <SmartEditor
            preview={false}
            initialValue={topicData.smartContent}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
      </div>

      <div className="flex items-center p-2.5 mb-4">
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
      <div className="mb-4">
        {formErrors.length > 0 && (
          <div>
            {formErrors.map((error, index) => (
              <span key={index} className="text-red-600 text-sm block mt-1.5">
                {error}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2.5">
        <CustomButton onClick={handleSaveTopic}>
          {topic ? "Save Changes" : "Create Topic"}
        </CustomButton>
        <CustomButton onClick={() => onCancelEdit?.()}>Cancel</CustomButton>
      </div>
      {/* </form> */}
    </div>
  );
}


export default CreateTopic;
