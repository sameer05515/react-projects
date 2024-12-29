import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createSearchParams,
    useNavigate,
    useParams
} from "react-router-dom";
import Select from "react-select"; // Import the Select component from react-select
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import {
    selectAllFlatTasks, updateTask
} from "../../../../redux/slices/taskSlice";

const AddSubTaskRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
  
    const tasks = useSelector(selectAllFlatTasks);
  
    const task = tasks?.find((t) => t.uniqueId === id);
  
    const taskOptions = tasks
      .filter((t) => t.uniqueId !== task.uniqueId)
      .map((t) => ({
        value: t.uniqueId, // Assuming task have unique IDs
        label: t.title, // Display tag title in the dropdown
      }));
  
    const handleTaskSelect = (selectedTags) => {
      // Extract the tag values and store them in the 'tags' property of the task data
      setFormData({
        ...formData,
        children: selectedTags.map((tag) => tag.value),
      });
    };
  
    const [formData, setFormData] = useState({
      _id: task && task._id ? task._id : "",
      uniqueId: task && task.uniqueId ? task.uniqueId : "",
      name: task && task.name ? task.name : "",
      description: task && task.description ? task.description : "",
      parentId: task && task.parentId ? task.parentId : "",
      linkedTasks: task && task.linkedTasks ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
      tags: task && task.tags ? task.tags : [], // Set the initial tags based on the task
      children: task && task.children ? task.children.map((c) => c.uniqueId) : [],
    });
  
    const handleSaveTask = () => {
      console.log(
        `Going to save: taskId: ${task._id} , formData : ${JSON.stringify(
          formData
        )}`
      );
      if (task && task._id && task.uniqueId) {
        // If a task is provided, it's an update
        dispatch(
          updateTask({
            taskId: task._id,
            taskData: { children: formData.children },
          })
        );
        // dispatch(updateTask({ taskId: task._id, taskData: {} }));
        // alert('going to edit')
        console.log("updated!!!");
      } else {
        console.log("Not updated!!!");
      }
      navigate(-1);
    };
  
    const handleCreateNewSubtask = () => {
      navigate({
        pathname: `/task-mgmt/create`,
        search: createSearchParams({
          parent: id,
        }).toString(),
      });
    };
  
    const taskFormStyle = {};
  
    return (
      <>
        {/* {`Either create and add as subtask of ${id}`} <br />
              {`my selected task : ${JSON.stringify(task)}`} <br />
              {`my transformed formData : ${JSON.stringify(formData)}`} */}
        <div>
          <CustomButton onClick={handleCreateNewSubtask}>
            Create new Subtask
          </CustomButton>
        </div>
  
        {/* {`Or select existing subtasks from list.`} */}
  
        <div style={taskFormStyle}>
          <div>
            <label htmlFor="tags">Add Existing Tasks:</label>
            <Select
              isMulti
              name="tasks"
              options={taskOptions}
              value={taskOptions.filter(
                (t) =>
                  formData.children.includes(t.value) &&
                  t.value !== formData.uniqueId
              )}
              onChange={handleTaskSelect}
            />
          </div>
        </div>
  
        <div>
          <CustomButton onClick={handleSaveTask}>Save</CustomButton>
          <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
        </div>
      </>
    );
  };

export default AddSubTaskRouterPage