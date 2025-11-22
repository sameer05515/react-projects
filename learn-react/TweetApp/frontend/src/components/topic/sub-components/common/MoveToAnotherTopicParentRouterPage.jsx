import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import {
    selectAllFlatTopics,
    updateTopic
} from "../../../../redux/slices/topicSlice";

const MoveToAnotherTopicParentRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const { id } = useParams();
  
    // const topics = prepareTasksQueue(treeStructuredTasks);
    const topics = useSelector(selectAllFlatTopics);
  
    const topic = topics?.find((t) => t.uniqueId === id);
  
    const topicOptions = topics
      .filter((t) => t.uniqueId !== topic.uniqueId)
      .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId))
      .map((t) => ({
        value: t.uniqueId, // Assuming topic have unique IDs
        label: t.title, // Display tag title in the dropdown
      }));
    // .push({
    //     value: '', // Assuming topic have unique IDs
    //     label: 'ROOT', // Display tag title in the dropdown
    // });
  
    const handleTaskSelect = (selectedTags) => {
      // Extract the tag values and store them in the 'tags' property of the topic data
      // console.log(
      //     `JSON.stringify(selectedTags): ${JSON.stringify(selectedTags)}`
      // );
      setFormData({ ...formData, parentId: selectedTags.value });
    };
  
    const [formData, setFormData] = useState({
      // _id: topic && topic._id ? topic._id : "",
      uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
      // title: topic && topic.title ? topic.title : "",
      // description: topic && topic.description ? topic.description : "",
      parentId: topic && topic.parentId ? topic.parentId : "",
      // linkedTasks: topic && topic.linkedTasks ? topic.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked topic IDs
      // tags: topic && topic.tags ? topic.tags : [], // Set the initial tags based on the topic
      // children: topic && topic.children ? topic.children.map(c => c.uniqueId) : []
    });
  
    const handleSaveTask = () => {
      // console.log(
      //     `Going to save: topicId: ${topic._id} , formData : ${JSON.stringify(
      //         formData
      //     )}`
      // );
      if (topic && topic.uniqueId) {
        // If a topic is provided, it's an update
        // dispatch(updateTopic({ topicId: topic._id, topicData: { children: formData.children } }));
        dispatch(
          updateTopic({
            ...{ parentId: formData.parentId },
            uniqueId: topic.uniqueId,
          })
        );
        // console.log("updated!!!");
      } else {
        // console.log("Not updated!!!");
      }
      navigate(-1);
    };
  
    const [selectedOption] = useState("");

    return (
      <>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-4">{topic?.title}</p>
          <div>
            <label htmlFor="tags" className="block font-bold mb-2">Select New Parent Topic:</label>
            <Select
              name="topics"
              options={topicOptions}
              defaultValue={selectedOption}
              onChange={handleTaskSelect}
            />
          </div>
        </div>

        <div className="flex gap-2.5">
          <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
          <CustomButton className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400" onClick={() => navigate(-1)}>Back</CustomButton>
        </div>
      </>
    );
  };

export default MoveToAnotherTopicParentRouterPage