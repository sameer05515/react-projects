import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonGroup from "../../common/components/button-group/ButtonGroup";
import Tree from "../../common/components/tree-viewer/TreeViewer";

import {
  InterviewMgmtProvider,
  useInterviewMgmt,
} from "./common/InterviewMgmtContextUtil";

const NodeRenderer = ({ node, onSelectNode, selectedNodeId }) => {
  if (!node?.id) return null;

  const handleClick = () => onSelectNode(node);

  return (
    <span
      onClick={handleClick}
      style={{
        fontSize: "12px",
        ...(selectedNodeId === node.id ? interviewMgmtStyles.selected : {}),
      }}
    >
      {node.name}
    </span>
  );
};

const InterviewMgmtBase = () => {
  const navigate = useNavigate();
  const { categoryTree, selectedTreeNodeUID, refreshCategoryTree } =
    useInterviewMgmt();

  const selectedElementRef = useRef(null);
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

  const handleNodeSelection = (node) => {
    if (!node?.id) return;

    if (node.type === "category") {
      navigate(`${node.id}`);
    } else if (node.type === "question") {
      navigate(`/interview-mgmt/questions/${node.id}`);
    }
  };

  return (
    <div style={interviewMgmtStyles.container}>
      <div style={interviewMgmtStyles.leftSection}>
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
          data={categoryTree}
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
      <div style={interviewMgmtStyles.rightSection}>
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

const interviewMgmtStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    fontFamily: "Arial, sans-serif",
  },
  leftSection: {
    flex: 1,
    padding: "20px",
    borderRight: "1px solid #ccc",
    overflow: "auto",
    height: "100%",
  },
  rightSection: {
    flex: 4,
    padding: "20px",
    overflow: "auto",
    height: "100%",
  },
  selected: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "green",
  },
};

const WithContext = () => (
  <InterviewMgmtProvider>
    <InterviewMgmtBase />
  </InterviewMgmtProvider>
);

export default WithContext;
