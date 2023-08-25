import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'; // Import the Select component from react-select
import { fetchTags } from "../../redux/tagsSlice";
import { createTopic, updateTopic } from '../../redux/topicSlice';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomButton from '../common/CustomButton';


function CreateTopic({ topic, onSave, onCancelEdit }) {
  const dispatch = useDispatch();
  const availableTags = useSelector((state) => state.tags.data); // Assuming you have a tags slice in your Redux store

  const [topicData, setTopicData] = useState({
    name: topic ? topic.name : '',
    description: topic ? topic.description : '',
    // Initialize the occurenceDate with the current date
    occurenceDate: topic ? new Date(topic.occurenceDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Set the occurenceDate in the format 'YYYY-MM-DD'
    tags: topic ? topic.tags : [], // Set the initial tags based on the topic
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setTopicData({ ...topicData, description: data });
  };

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
    value: tag.tagId, // Assuming tags have unique IDs
    label: tag.name, // Display tag names in the dropdown
  }));

  const handleSaveTopic = () => {
    if (topic) {
      // If a topic is provided, it's an update
      dispatch(updateTopic({ ...topicData, topicId: topic.topicId }));
    } else {
      // Otherwise, it's a new topic creation
      dispatch(createTopic(topicData));
    }

    // Notify the parent component to handle closing the CreateTopic form
    if (onSave) {
      onSave();
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={topicData.name}
            onChange={handleInputChange}
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
          <CKEditor
            id="description"
            name="description"
            editor={ClassicEditor}
            data={topicData.description}
            onChange={handleEditorChange}
          />
        </div>
        <div>
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
          <CustomButton onClick={handleSaveTopic}>
            {topic ? 'Save Changes' : 'Create Topic'}
          </CustomButton>
          <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
        </div>
      </form>
    </div>
  );
}

export default CreateTopic;
