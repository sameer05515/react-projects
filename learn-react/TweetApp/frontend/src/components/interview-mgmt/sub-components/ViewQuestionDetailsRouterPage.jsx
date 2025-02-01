import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "../../../common/components/button-group/ButtonGroup";
import useDataFetching from "../../../common/hooks/useDataFetching/v1";
import useInterviewManagementAPIs from "../../../common/hooks/useInterviewMgmtApis/v1";
import {
  setSelectedQuestionUID,
  setSelectedTreeNodeUID,
} from "../../../redux/slices/interviewMgmtSlice";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";
import QuestionCard from "./QuestionCard";

const ViewQuestionDetailsRouterPage = () => {
  const { partialUpdateQuestionByUniqueId } = useInterviewManagementAPIs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, qid } = useParams();
  const url = `http://localhost:3003/intvw-mgmt/v2/questions/${qid}`;
  const { data, refetch } = useDataFetching({ url });
  useEffect(() => {
    if (qid) {
      refetch();
      dispatch(setSelectedTreeNodeUID(qid));
      dispatch(setSelectedQuestionUID(qid));
    }
  }, [qid]);

  const { prevTreeNode, nextTreeNode } = useInterviewMgmt();

  const handleBaseSpanClick = () => {
    dispatch(setSelectedQuestionUID(null));
    dispatch(setSelectedTreeNodeUID(null));
    navigate(`/interview-mgmt`);
  };

  const handleAncestorClick = (ancestor) => {
    if (!ancestor) {
      return;
    }
    navigate(`/interview-mgmt/questions/${ancestor.uniqueId}`);
  };

  const handleLinkedTagSelection = (linkedTagUID) => {
    navigate(`/tags/${linkedTagUID}`);
  };

  const handlePatch = async () => {
    await partialUpdateQuestionByUniqueId(qid);
  };

  return (
    <>
      <ButtonGroup
        options={[
          {
            id: 1,
            children: "Edit Question",
            onClick: () => navigate(`/interview-mgmt/questions/${qid}/edit`),
          },
          {
            id: 2,
            children: "Add Child Question",
            onClick: () =>
              navigate({
                pathname: `/interview-mgmt/questions/create`,
                search: qid
                  ? createSearchParams({
                      parent: qid,
                    }).toString()
                  : "",
              }),
          },
          // {
          //     id: 3,
          //     children: "Move to Another Category",
          //     onClick: () =>
          //         navigate(
          //             `/interview-mgmt/${id}/questions/${qid}/move-to-another-category`
          //         ),
          // },
          {
            id: 4,
            children: "Move to Another Parent Question",
            onClick: () =>
              navigate(`/interview-mgmt/questions/${qid}/move-parent`),
          },
          {
            id: 5,
            children: "Previous",
            onClick: () => handleAncestorClick({ uniqueId: prevTreeNode?.id }),
          },
          {
            id: 6,
            children: "Next",
            onClick: () => handleAncestorClick({ uniqueId: nextTreeNode?.id }),
          },
          {
            id: 7,
            children: "Mark As Revised Today",
            onClick: handlePatch,
          },
        ]}
      />

      {data && (
        <QuestionCard
          question={data}
          categoryId={id}
          onCreateAnswerClick={() =>
            navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
              state: {
                data: { linkedQuestionsId: qid },
                questionName: data?.name || "",
              },
            })
          }
          onUpdateAnswerClick={(answer) =>
            navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
              state: { data: { ...answer }, questionName: data?.name || "" },
            })
          }
          onBaseSpanClick={handleBaseSpanClick}
          onAncestorClick={handleAncestorClick}
          onChildTopicClick={handleAncestorClick}
          onLinkedTagSelection={handleLinkedTagSelection}
        />
      )}
    </>
  );
};

export default ViewQuestionDetailsRouterPage;
