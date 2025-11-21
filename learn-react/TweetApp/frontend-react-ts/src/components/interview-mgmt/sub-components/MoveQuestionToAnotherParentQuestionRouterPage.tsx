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

  const interviewMgmtContext = useInterviewMgmt() as {
    flatCategoryItemData?: any[];
    refreshCategoryTree?: () => void;
    [key: string]: any;
  };
  const { flatCategoryItemData: flatData, refreshCategoryTree } = interviewMgmtContext;

  const topic = flatData?.find((t) => t.uniqueId === qid) || null;

  const topicOptions: Array<{ value: string; label: string }> = (flatData
    ?.filter((t) => t.uniqueId !== topic?.uniqueId) // Exclude the current topic
    .filter((t) => !t.ancestors?.map((a: any) => a.uniqueId).includes(topic?.uniqueId)) // Exclude ancestors of the topic
    .filter((t) => !topic?.children?.map((c: any) => c.uniqueId).includes(t.uniqueId)) // Exclude child categories of the topic
    .map((t) => ({
      value: t.uniqueId || "", // Assuming topic have unique IDs
      label: t.title || "", // Display tag title in the dropdown
    })) || []) as Array<{ value: string; label: string }>;

  const handleTaskSelect = (selectedTags: any) => {
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
      }).then(() => refreshCategoryTree?.());
    }
    navigate(`/interview-mgmt/questions/${qid}`);
  };

  const [selectedOption] = useState<{ value: string; label: string } | null>(null);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm text-gray-700">{topic?.title}</p>
        <div className="space-y-1.5">
          <label htmlFor="tags" className="text-sm font-semibold text-gray-700">Select Parent Question:</label>
          <Select
            name="topics"
            options={topicOptions}
            defaultValue={selectedOption || undefined}
            onChange={handleTaskSelect}
          />
        </div>
      </div>

      {/* <JSONDataViewer metadata={{formData,flatData}} title="Raw Data"/> */}

      <div className="mt-2 flex gap-2">
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </>
  );
};

export default MoveQuestionToAnotherParentQuestionRouterPage;
