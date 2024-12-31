import React from "react";
import { useDispatch } from "react-redux";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching";
import {
    fetchTasks
} from "../../../../redux/slices/taskSlice";
import TaskForm from "./TaskForm";

const EditTaskRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [searchParams] = useSearchParams();
  // const parentId = searchParams.get("parent");
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`;
  const { data, loading, error /*refetch*/ } = useDataFetching({ url });
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

export default EditTaskRouterPage