import React, { useEffect, useMemo } from "react";
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

interface Question {
  uniqueId: string;
  name?: string;
  heading?: string;
  [key: string]: any;
}

interface TreeNode {
  id?: string;
  name?: string;
  [key: string]: any;
}

const ViewQuestionDetailsRouterPage = () => {
  const { partialUpdateQuestionByUniqueId } = useInterviewManagementAPIs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, qid } = useParams();
  // ✅ Memoize URL to prevent infinite loops
  const url = useMemo(
    () => `http://localhost:3003/intvw-mgmt/v2/questions/${qid}`,
    [qid]
  );
  const { data, refetch } = useDataFetching({ url });
  useEffect(() => {
    if (qid) {
      refetch();
      dispatch(setSelectedTreeNodeUID(qid));
      dispatch(setSelectedQuestionUID(qid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid, dispatch]); // Removed refetch from dependencies to prevent infinite loop

  const interviewMgmtContext = useInterviewMgmt() as {
    prevTreeNode?: TreeNode;
    nextTreeNode?: TreeNode;
    [key: string]: any;
  };
  const { prevTreeNode, nextTreeNode } = interviewMgmtContext;

  const handleBaseSpanClick = () => {
    dispatch(setSelectedQuestionUID(null));
    dispatch(setSelectedTreeNodeUID(null));
    navigate(`/interview-mgmt`);
  };

  const handleAncestorClick = (ancestor: any) => {
    if (!ancestor) {
      return;
    }
    navigate(`/interview-mgmt/questions/${ancestor.uniqueId}`);
  };

  const handleLinkedTagSelection = (linkedTagUID: any) => {
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
          question={data as Question}
          categoryId={id}
          onCreateAnswerClick={() =>
            navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
              state: {
                data: { linkedQuestionsId: qid },
                questionName: (data as Question)?.name || (data as Question)?.heading || "",
              },
            })
          }
          onUpdateAnswerClick={(answer: any) =>
            navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
              state: { data: { ...answer }, questionName: (data as Question)?.name || (data as Question)?.heading || "" },
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
