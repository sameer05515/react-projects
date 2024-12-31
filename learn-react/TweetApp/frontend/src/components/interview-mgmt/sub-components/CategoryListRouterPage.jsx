import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";

const CategoryListRouterPage = () => {
    const navigate = useNavigate();
    const selectedCategoryUID = useSelector(
      (state) => state.interviewMgmt.selectedCategoryUID
    );
  
    const {
      data,
      showOnlyLeafQuestions,
      setShowOnlyLeafQuestions,
      selectedTreeNodeUID,
    } = useInterviewMgmt();
  
    const handleLinkSelection = (uniqueId) =>
      navigate(`/interview-mgmt/questions/${uniqueId}`);
  
    // Function to determine if a node is a leaf node
    const isLeafNode = (node) => !node.children || node.children.length === 0;
  
    // Filter function to apply based on `showOnlyLeafQuestions`
    // const filteredData = showOnlyLeafQuestions
    //   ? data?.filter((d) => isLeafNode(d)) || []
    //   : data || [];
  
    const filteredData = useMemo(() => {
      if (!data || !Array.isArray(data)) {
        return [];
      }
      if (!showOnlyLeafQuestions) {
        return data;
      }
      // return showOnlyLeafQuestions
      // ? data?.filter((d) => isLeafNode(d)) || []
      // : data || []
      return (
        data
          .filter((d) => isLeafNode(d))
          .map((question) => {
            return {
              uniqueId: question.uniqueId,
              heading:
                question.heading ||
                `Title not set for category: ${question.uniqueId}`,
              answerCount: question?.answers?.length || 0,
            };
          }) || []
      );
    }, [data, showOnlyLeafQuestions]);
  
    return (
      <>
        <CustomButton onClick={() => setShowOnlyLeafQuestions((prev) => !prev)}>
          {showOnlyLeafQuestions ? "Show All" : "Show Leafs"}
        </CustomButton>
        <Tree
          data={filteredData}
          selectedNodeId={selectedTreeNodeUID}
          renderNode={(category) => (
            <>
              <HoverableSpan
                isSelected={selectedCategoryUID === category.uniqueId}
                onClick={() => handleLinkSelection(category.uniqueId)}
              >
                <b>{category.heading}</b>
                {" - Total Answers: "}
                {category.answerCount || 0}
              </HoverableSpan>
            </>
          )}
        />
      </>
    );
  };

export default CategoryListRouterPage