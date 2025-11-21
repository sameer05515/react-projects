import React, { createContext, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import useFlatTreeData from "../../../common/hooks/useFlatTreeData";
import useDataFetching from "../../../common/hooks/useDataFetching/v2";
import { fetchAllQuestions } from "../../../redux/slices/interviewMgmtSlice";
import { fetchTags } from "../../../redux/slices/tagsSlice";

interface TreeNode {
  id: string;
  name: string;
  type: string;
  children: TreeNode[];
}

interface QuestionNode {
  uniqueId: string;
  heading: string;
  children?: QuestionNode[];
  [key: string]: any;
}

const buildCategoryTree = (treeArr: QuestionNode[] = []): TreeNode[] => {
  if (!treeArr?.length) return [];

  return treeArr.reduce((acc: TreeNode[], question: QuestionNode) => {
    const questionNode: TreeNode = {
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

interface InterviewMgmtContextValue {
  categoryTree?: TreeNode[];
  data?: any[];
  flatCategoryItemData?: any[];
  flatData?: any[];
  selectedTreeNodeUID?: string;
  prevTreeNode?: any;
  nextTreeNode?: any;
  refreshCategoryTree?: () => void;
  showOnlyLeafQuestions?: boolean;
  setShowOnlyLeafQuestions?: (updater: (prev: boolean) => boolean) => void;
  [key: string]: any;
}

const InterviewMgmtContext = createContext<InterviewMgmtContextValue | undefined>(undefined);

interface InterviewMgmtProviderProps {
  children: React.ReactNode;
}

export const InterviewMgmtProvider: React.FC<InterviewMgmtProviderProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showOnlyLeafQuestions, setShowOnlyLeafQuestions] = useState(false);
  const selectedTreeNodeUID = useSelector(
    (state: RootState) => (state.interviewMgmt as any).selectedTreeNodeUID
  );

  const data = useSelector((state: RootState) => (state.interviewMgmt as any).data);
  const { flatData: flatCategoryItemData } = useFlatTreeData(data || [], undefined, "uniqueId");

  // const buildQuestionIdMap = (treeArr = []) => {
  //   if (!treeArr?.length) return [];

  //   return treeArr.flatMap((category) => {
  //     const questionsMap =
  //       category.questions?.map((question) => ({
  //         categoryUniqueId: category.uniqueId,
  //         questionUniqueId: question.uniqueId,
  //       })) || [];

  //     const childrenMap = category.children
  //       ? buildQuestionIdMap(category.children)
  //       : [];

  //     return [...questionsMap, ...childrenMap];
  //   });
  // };

  // Fetch data on initial mount (with smart caching)
  useDataFetching(
    fetchAllQuestions,
    (state) => state.interviewMgmt || { data: [], loading: 'idle', error: null }
  );
  useDataFetching(
    fetchTags,
    (state) => state.tags
  );

  const refreshCategoryTree = () => {
    dispatch(fetchAllQuestions() as any);
    dispatch(fetchTags() as any);
  };

  const categoryTree = useMemo(() => buildCategoryTree(data || []), [data]);

  const {
    flatData,
    prevItem: prevTreeNode,
    nextItem: nextTreeNode,
  } = useFlatTreeData(categoryTree, selectedTreeNodeUID, "id");

  // const questionIdMap = useMemo(() => buildQuestionIdMap(data), [data]);

  return (
    <InterviewMgmtContext.Provider
      value={{
        categoryTree,
        // questionIdMap,
        // availableTags,
        data,
        flatCategoryItemData,
        flatData,
        selectedTreeNodeUID,
        prevTreeNode,
        nextTreeNode,
        refreshCategoryTree,
        showOnlyLeafQuestions,
        setShowOnlyLeafQuestions,
      }}
    >
      {children}
    </InterviewMgmtContext.Provider>
  );
};

export const useInterviewMgmt = () => {
  return useContext(InterviewMgmtContext);
};
