import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import { apiRequest } from "../../../../common/service/apiClient/v1";
import CreateTopic from "./CreateTopic";

const EditTopicRouterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`;
  // const { data, loading, error } = useDataFetching({url});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetailsForId = useCallback(() => {
    setLoading(true);
    apiRequest({ method: "get", url })
      .then((response) => {
        if (response.isError) {
          setError(response.message);
        } else {
          setData(response.data);
          console.log("Task Details: ", response.data);
        }
      })
      .catch((err) => console.error("Some unexpected error occurred", err))
      .finally(setLoading(false));
  }, [url]);

  useEffect(() => {
    fetchDetailsForId();
  }, [fetchDetailsForId]);

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

export default EditTopicRouterPage;
