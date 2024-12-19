import React from "react";
import {
    useNavigate, useSearchParams
} from "react-router-dom";
import CreateTopic from "./CreateTopic";

const CreateTopicRouterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  return (
    <>
      <span>Create Topic: parentId : {parentId}</span> <br />
      <CreateTopic
        parentId={parentId}
        onSave={() => {
          // console.log(`New topic created`);
          navigate(-1);
        }}
        onCancelEdit={() => navigate(-1)}
      />
    </>
  );
};

export default CreateTopicRouterPage;
