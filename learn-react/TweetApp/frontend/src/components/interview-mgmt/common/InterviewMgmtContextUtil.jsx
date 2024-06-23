import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "../../../redux/slices/interviewMgmtSlice";
import useFlatTreeData from "../../../common/hooks/useFlatTreeData";
import { fetchTags, selectAllFlatTags } from "../../../redux/slices/tagsSlice";

const InterviewMgmtContext = createContext();

export const InterviewMgmtProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [showOnlyLeafQuestions, setShowOnlyLeafQuestions] = useState(false);  
  const selectedTreeNodeUID = useSelector(
    (state) => state.interviewMgmt.selectedTreeNodeUID
  );
  
  const availableTags = useSelector(selectAllFlatTags);
  const data = useSelector((state) => state.interviewMgmt.data);
  const {flatData:flatCategoryItemData} =useFlatTreeData(data);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchTags());
  }, [dispatch]);

  const buildCategoryTree = (treeArr = []) => {
    if (!treeArr?.length) return [];

    return treeArr.reduce((acc, question) => {
      const questionNode = {
        id: question.uniqueId,
        name: question.heading,
        type: "question",
        children: [],
      };
      acc.push(questionNode);

      // Recursive handling of child categories
      if (question.children && question.children.length > 0) {
        questionNode.children = questionNode.children.concat(
          buildCategoryTree(question.children)
        );
      }

      // Handling questions
      // if (category.questions && category.questions.length > 0) {
      //   categoryNode.children = categoryNode.children.concat(
      //     category.questions.map((question) => ({
      //       id: question.uniqueId,
      //       name: question.heading,
      //       type: "question",
      //     }))
      //   );
      // }

      return acc;
    }, []);
  };

  const buildQuestionIdMap = (treeArr = []) => {
    if (!treeArr?.length) return [];

    return treeArr.flatMap((category) => {
      const questionsMap =
        category.questions?.map((question) => ({
          categoryUniqueId: category.uniqueId,
          questionUniqueId: question.uniqueId,
        })) || [];

      const childrenMap = category.children
        ? buildQuestionIdMap(category.children)
        : [];

      return [...questionsMap, ...childrenMap];
    });
  };

  const refreshCategoryTree = () => {
    dispatch(fetchAllQuestions());
    dispatch(fetchTags());
  };

  const categoryTree = useMemo(() => buildCategoryTree(data), [data]);

  const {flatData, prevItem: prevTreeNode, nextItem: nextTreeNode } = useFlatTreeData(
    categoryTree,
    selectedTreeNodeUID,
    "id"
  );

  // const questionIdMap = useMemo(() => buildQuestionIdMap(data), [data]);

  return (
    <InterviewMgmtContext.Provider
      value={{
        categoryTree,
        // questionIdMap,
        availableTags,
        data,
        flatCategoryItemData,
        flatData,
        selectedTreeNodeUID,
        prevTreeNode,
        nextTreeNode,
        refreshCategoryTree,
        showOnlyLeafQuestions, setShowOnlyLeafQuestions
      }}
    >
      {children}
    </InterviewMgmtContext.Provider>
  );
};

export const useInterviewMgmt = () => {
  return useContext(InterviewMgmtContext);
};
