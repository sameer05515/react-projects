import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import useInterviewManagementAPIs from "../../../common/hooks/useInterviewMgmtApis/v1";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";

const MoveQuestionToAnotherParentQuestionRouterPage = () => {
  const { updateQuestion } = useInterviewManagementAPIs();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { qid } = useParams();

  const { flatCategoryItemData: flatData, refreshCategoryTree } =
    useInterviewMgmt();

  const topic = flatData?.find((t) => t.uniqueId === qid) || null;

  const topicOptions = flatData
    ?.filter((t) => t.uniqueId !== topic.uniqueId) // Exclude the current topic
    .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId)) // Exclude ancestors of the topic
    .filter((t) => !topic.children?.map((c) => c.uniqueId).includes(t.uniqueId)) // Exclude child categories of the topic
    .map((t) => ({
      value: t.uniqueId, // Assuming topic have unique IDs
      label: t.title, // Display tag title in the dropdown
    }));

  const handleTaskSelect = (selectedTags) => {
    setFormData({ ...formData, parentId: selectedTags.value });
  };

  const [formData, setFormData] = useState({
    uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
    parentId: topic && topic.parentId ? topic.parentId : "",
  });

  const handleSaveTask = () => {
    if (topic && topic.uniqueId && qid) {
      updateQuestion({
        ...{ parentId: formData.parentId },
        uniqueId: qid,
      }).then(() => refreshCategoryTree());
    }
    navigate(`/interview-mgmt/questions/${qid}`);
  };

  const topicFormStyle = {};

  const [selectedOption] = useState("");

  return (
    <>
      <div style={topicFormStyle}>
        <p>{topic?.title}</p>
        <div>
          <label htmlFor="tags">Select Parent Question:</label>
          <Select
            name="topics"
            options={topicOptions}
            defaultValue={selectedOption}
            onChange={handleTaskSelect}
          />
        </div>
      </div>

      {/* <JSONDataViewer metadata={{formData,flatData}} title="Raw Data"/> */}

      <div>
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </>
  );
};

export default MoveQuestionToAnotherParentQuestionRouterPage;
