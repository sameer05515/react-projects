import React from "react";
import { useDispatch } from "react-redux";
import {
    useNavigate, useSearchParams
} from "react-router-dom";
import {
    fetchTasks
} from "../../../../redux/slices/taskSlice";
import TaskForm from "./TaskForm";

const CreateTaskRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");
  
    return (
      <>
        {/* <span>Create Task: parentId : {parentId}</span> <br /> */}
        <TaskForm
          onSave={() => {
            dispatch(fetchTasks());
            navigate(-1);
          }}
          onCancelEdit={() => navigate(-1)}
          task={{ parentId: parentId }}
        />
      </>
    );
  };

export default CreateTaskRouterPage