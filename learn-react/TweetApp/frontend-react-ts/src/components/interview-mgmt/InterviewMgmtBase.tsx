import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonGroup from "../../common/components/button-group/ButtonGroup";
import Tree from "../../common/components/tree-viewer/TreeViewer";

import {
  InterviewMgmtProvider,
  useInterviewMgmt,
} from "./common/InterviewMgmtContextUtil";

interface NodeRendererProps {
  node: any;
  onSelectNode: (node: any) => void;
  selectedNodeId?: string;
}

const NodeRenderer: React.FC<NodeRendererProps> = ({ node, onSelectNode, selectedNodeId }) => {
  if (!node?.id) return null;

  const handleClick = () => onSelectNode(node);

  return (
    <span
      onClick={handleClick}
      className={`text-[12px] ${
        selectedNodeId === node.id ? "font-bold text-green-700" : "font-normal"
      }`}
    >
      {node.name}
    </span>
  );
};

const InterviewMgmtBase = () => {
  const navigate = useNavigate();
  const interviewMgmtContext = useInterviewMgmt() as {
    categoryTree?: any[];
    selectedTreeNodeUID?: string;
    refreshCategoryTree?: () => void;
    [key: string]: any;
  };
  const { categoryTree, selectedTreeNodeUID, refreshCategoryTree } = interviewMgmtContext;

  const selectedElementRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [selectedTreeNodeUID]);

  // const handleButtonClick = (path) => navigate(path);

  const handleNodeSelection = (node: any) => {
    if (!node?.id) return;

    if (node.type === "category") {
      navigate(`${node.id}`);
    } else if (node.type === "question") {
      navigate(`/interview-mgmt/questions/${node.id}`);
    }
  };

  return (
    <div className="flex h-[100vh] w-full flex-row font-sans">
      <div className="h-full flex-1 overflow-auto border-r border-gray-300 p-5">
        <ButtonGroup
          options={[
            {
              id: 1,
              onClick: () => navigate(`/interview-mgmt/questions/create`),
              children: "Create Question",
            },
            { id: 2, onClick: refreshCategoryTree, children: "Refresh" },
            // {
            //   id: 3,
            //   onClick: () =>
            //     handleNodeSelection({
            //       id: prevTreeNode?.id,
            //       type: prevTreeNode?.type,
            //     }),
            //   children: "Previous",
            // },
            // {
            //   id: 4,
            //   onClick: () =>
            //     handleNodeSelection({
            //       id: nextTreeNode?.id,
            //       type: nextTreeNode?.type,
            //     }),
            //   children: "Next",
            // },
            {
              id: 5,
              onClick: () => navigate(`/interview-mgmt/search`),
              children: "Search",
            },
          ]}
        />
        <Tree
          data={categoryTree || []}
          uniqueIdFieldName="id"
          selectedNodeId={selectedTreeNodeUID}
          renderNode={(node) => (
            <>
              <NodeRenderer
                node={node}
                onSelectNode={handleNodeSelection}
                selectedNodeId={selectedTreeNodeUID}
              />
              <span
                ref={
                  selectedTreeNodeUID === node.id ? selectedElementRef : null
                }
              ></span>
            </>
          )}
        />
      </div>
      <div className="h-full flex-[4] overflow-auto p-5">
        <Outlet />
        <br />
        {/* <JSONDataViewer
          metadata={{
            selectedElementRef: selectedElementRef?'have value':'null',
            categoryTree
          }}
          title="Raw Tree Data"
        /> */}
      </div>
    </div>
  );
};


const WithContext = () => (
  <InterviewMgmtProvider>
    <InterviewMgmtBase />
  </InterviewMgmtProvider>
);

export default WithContext;
