import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import {
  selectAllFlatTopics,
  updateTopic,
} from "../../../../redux/slices/topicSlice";

const AddSubTopicRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const topics = useSelector(selectAllFlatTopics);

  const topic = topics?.find((t) => t.uniqueId === id);

  const topicOptions = topics
    .filter((t) => t.uniqueId !== topic.uniqueId)
    .map((t) => ({
      value: t.uniqueId, // Assuming topic have unique IDs
      label: t.title, // Display tag title in the dropdown
    }));

  const handleTaskSelect = (selectedTags) => {
    setFormData({
      ...formData,
      children: selectedTags.map((tag) => tag.value),
    });
  };

  const [formData, setFormData] = useState({
    // _id: topic && topic._id ? topic._id : "",
    uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
    // title: topic && topic.title ? topic.title : "",
    // description: topic && topic.description ? topic.description : "",
    // parentId: topic && topic.parentId ? topic.parentId : "",
    // linkedTasks: topic && topic.linkedTasks ? topic.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked topic IDs
    // tags: topic && topic.tags ? topic.tags : [], // Set the initial tags based on the topic
    children:
      topic && topic.children ? topic.children.map((c) => c.uniqueId) : [],
  });

  const handleSaveTask = () => {
    // console.log(
    //     `Going to save: topicId: ${topic._id} , formData : ${JSON.stringify(
    //         formData
    //     )}`
    // );
    if (topic && topic.uniqueId) {
      // If a topic is provided, it's an update
      dispatch(
        updateTopic({
          ...{ children: formData.children },
          uniqueId: topic.uniqueId,
        })
      );
    } else {
      console.log("Not updated!!!");
    }
    navigate(-1);
  };

  const handleCreateNewSubtopic = () => {
    navigate({
      pathname: `/topic-mgmt/create`,
      search: createSearchParams({
        parent: id,
      }).toString(),
    });
  };

  const topicFormStyle = {};

  return (
    <>
      <div>
        <CustomButton onClick={handleCreateNewSubtopic}>
          Create new Sub-Topic
        </CustomButton>
      </div>

      <div style={topicFormStyle}>
        <div>
          <label htmlFor="tags">Add Existing Topics:</label>
          <Select
            isMulti
            name="topics"
            options={topicOptions}
            value={topicOptions.filter(
              (t) =>
                formData.children.includes(t.value) &&
                t.value !== formData.uniqueId
            )}
            onChange={handleTaskSelect}
          />
        </div>
      </div>

      <div>
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </>
  );
};

export default AddSubTopicRouterPage;
