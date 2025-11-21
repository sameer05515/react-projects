import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTopicSection,
  selectAllFlatTopics,
  type FlatTopic,
} from "../../../../redux/slices/topicSlice";
import type { AppDispatch } from "../../../../redux/store";
import TopicSectionForm from "./TopicSectionForm";

const CreateSectionRouterPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const topics = useSelector(selectAllFlatTopics);
  const { id } = useParams();

  const [formData] = useState({
    name: "",
    linkedTopicUniqueId: id || "",
    description: "",
  });

  const [selectedTopic, setSelectedTopic] = useState<FlatTopic | null>(null);

  useEffect(() => {
    if (id && topics) {
      const topic = topics.find((t) => t.uniqueId === id);
      setSelectedTopic(topic || null);
    }
  }, [topics, id]);

  const handleSaveSection = (data: any) => {
    dispatch(createTopicSection(data) as any);
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
