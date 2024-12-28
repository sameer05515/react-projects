import React from "react";
import {
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching";
import CreateTopic from "./CreateTopic";

const EditTopicRouterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`;
  const { data, loading, error } = useDataFetching({url});
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <span>
        Edit Topic: id: {id}: parentId : {parentId}
      </span>
      <br />
      {data && (
        <CreateTopic
          topic={data}
          onSave={() => {
            // console.log(`Edited topic created`);
            navigate(-1);
          }}
          onCancelEdit={() => navigate(`/topic-mgmt/${id}`)}
        />
      )}
    </>
  );
};

export default EditTopicRouterPage