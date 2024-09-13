import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NodeItemForm } from "./NodeItemForm";
import { RelationForm } from "./RelationForm";

export const CreateRelatedNodeItem = () => {
  const navigate = useNavigate();
  return (
    <NodeItemForm
      onSave={() => navigate(-1)}
      onCancelEdit={() => navigate(-1)}
    />
  );
};

export const EditRelatedNodeItem = () => {
  const { state: { data: initialFormData } = {} } = useLocation();
  const navigate = useNavigate();
  return (
    <NodeItemForm
      initialFormData={initialFormData}
      onSave={() => navigate(-1)}
      onCancelEdit={() => navigate(-1)}
    />
  );
};

export const CreateRelation = () => {
  const { state: { data: { nodeInfo, initialFormData, allNodes } } = {} } =
    useLocation();
  const navigate = useNavigate();
  return (
    <RelationForm
      nodeInfo={nodeInfo}
      initialFormData={initialFormData}
      allNodes={allNodes}
      onSubmit={() => navigate(-1)}
      onClose={() => navigate(-1)}
    />
  );
};

export const EditRelation = () => {
  const navigate = useNavigate();
  return <RelationForm />;
};
