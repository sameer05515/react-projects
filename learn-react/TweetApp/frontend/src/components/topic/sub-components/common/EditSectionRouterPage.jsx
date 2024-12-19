import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    selectAllFlatTopics, updateTopicSectionsById
} from "../../../../redux/slices/topicSlice";
import TopicSectionForm from "./TopicSectionForm";

const EditSectionRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const topics = useSelector(selectAllFlatTopics);
    const { id, sectionId } = useParams();
    const [formData] = useState({
      uniqueId: sectionId,
      name: "",
      linkedTopicUniqueId: id,
      description: "",
    });
  
    const [selectedTopic, setSelectedTopic] = useState(null);
  
    useEffect(() => {
      if (topics && topics.length > 0) {
        // const topics = prepareTasksQueue(treeStructuredTasks);
        // console.log(`CreateSectionRouterPage: JSON.stringify(topics, null, 2): ${JSON.stringify(topics, null, 2)}`)
        const topic = topics?.find((t) => t.uniqueId === id);
        setSelectedTopic((pre) => ({ ...topic }));
      }
    }, [topics]);
  
    const handleUpdate = (data) => {
      // alert(JSON.stringify(data, null, 2));
      dispatch(updateTopicSectionsById({ ...data }));
      navigate(-1);
    };
  
    const handleCancel = () => {
      navigate(-1);
    };
  
    return (
      <>
        {/* <pre>{JSON.stringify(sectionsData, null, 2)}</pre> */}
        <TopicSectionForm
          formData={formData}
          selectedTopic={selectedTopic}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
        />
      </>
    );
  };

export default EditSectionRouterPage