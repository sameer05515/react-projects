import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTopicSection,
  selectAllFlatTopics,
} from "../../../../redux/slices/topicSlice";
import TopicSectionForm from "./TopicSectionForm";

const CreateSectionRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topics = useSelector(selectAllFlatTopics) || []; // Fallback to an empty array
  const { id } = useParams();

  const [formData] = useState({
    name: "",
    linkedTopicUniqueId: id || "",
    description: "",
  });

  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (id) {
      const topic = topics.find((t) => t.uniqueId === id);
      setSelectedTopic(topic || null);
    }
  }, [topics, id]);

  const handleSaveSection = (data) => {
    dispatch(createTopicSection(data));
    navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  return (
    <TopicSectionForm
      formData={formData}
      selectedTopic={selectedTopic}
      onSubmit={handleSaveSection}
      onCancel={handleCancel}
    />
  );
};

export default CreateSectionRouterPage;
