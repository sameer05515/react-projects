import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import { fetchTasks } from "../../../../redux/slices/taskSlice";
import TaskForm from "./TaskForm";
import { apiRequest } from "../../../../common/service/apiClient/v1";

const EditTaskRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  // const parentId = searchParams.get("parent");
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTaskDetails = useCallback(() => {
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
    fetchTaskDetails();
  }, [fetchTaskDetails]);
  // const { data, loading, error /*refetch*/ } = useDataFetching({ url });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data ? (
        <TaskForm
          task={data}
          onSave={() => {
            dispatch(fetchTasks());
            navigate(-1);
          }}
          onCancelEdit={() => navigate(`/task-mgmt/${id}`)}
        />
      ) : (
        <>No data found for id : {id}</>
      )}
    </>
  );
};

export default EditTaskRouterPage;
