// TaskContainer.js
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskModel from "./TaskModel";
import ViewTask from "./ViewTask";
import { fetchTasks, saveTask, selectAllFlatTasks, updateTask } from "../../redux/slices/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import TaskSearch from "./TaskSearch";
import CustomButton from "../../common/components/CustomButton";

import { fetchTags, selectAllFlatTags } from "../../redux/slices/tagsSlice";

const TaskContainer = () => {

  const dispatch = useDispatch();
  const availableTags = useSelector(selectAllFlatTags);
  

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);  

  const tasks = useSelector(selectAllFlatTasks);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch the fetchTasks async thunk to fetch tasks
  }, [dispatch]);

  useEffect(() => {
    // Fetch available tags when the component mounts
    // You should dispatch an action to retrieve the tags from your API
    // For example: dispatch(fetchTags());
    dispatch(fetchTags());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }  

  const containerStyle = {
    display: "flex",
  };

  const taskListStyle = {
    flex: "100%",
    padding: "10px",
    border: "1px solid #ccc",
  };  

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
    setIsEditTaskModalOpen(false);
    setIsViewTaskModalOpen(false);
    setSelectedTask(null);
  };

  const openEditTaskModal = (task) => {
    setIsAddTaskModalOpen(false);
    setIsEditTaskModalOpen(true);
    setIsViewTaskModalOpen(false);
    setSelectedTask(task);
  };

  const openViewTaskModal = (task) => {
    setIsAddTaskModalOpen(false);
    setIsEditTaskModalOpen(false);
    setIsViewTaskModalOpen(true);
    setSelectedTask(task);
  };

  const closeTaskModal = () => {
    setIsAddTaskModalOpen(false);
    setIsEditTaskModalOpen(false);
    setIsViewTaskModalOpen(false);
    setSelectedTask(null);
  };
  
  const handleSaveTask = async (newTask) => {
    if (selectedTask) {
      // Update the existing task
      //   const updatedTasks = tasks.map((task) =>
      //     task.id === selectedTask.id ? newTask : task
      //   );
      //   setTasks(updatedTasks);

      try {
        // Dispatch the updateTask async thunk to update the task
        // console.log(`Update task ${JSON.stringify(newTask)}`);
        // console.log(`selectedTask : ${JSON.stringify(selectedTask)}`);
        await dispatch(
          updateTask({ taskId: newTask._id, taskData: { ...newTask } })
        );

        dispatch(fetchTasks());

        // After updating, exit the editing mode
        // setIsEditing(false);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Add a new task
      //   setTasks([...tasks, newTask]);
      try {
        // Dispatch the saveTask async thunk to save the task
        console.log(`Save task ${JSON.stringify(newTask)}`);
        await dispatch(saveTask(newTask));

        // After saving, refresh the task list by fetching tasks
        dispatch(fetchTasks());
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
    closeTaskModal();
  };

  return (
    <div style={containerStyle}>
      <div style={taskListStyle}>
        <CustomButton onClick={openAddTaskModal}>Add Task</CustomButton>
        <TaskSearch tasks={tasks} />
        <TaskList
          tasks={tasks}
          onEditTask={openEditTaskModal}
          onViewTask={openViewTaskModal}
          tags={availableTags}
        />
      </div>
      {/* <div style={blankDivStyle}>        
      </div> */}

      {isAddTaskModalOpen && (
        <TaskModel
          onSave={handleSaveTask}
          onCancel={closeTaskModal}
          tasks={tasks}
        />
      )}
      {isEditTaskModalOpen && (
        <TaskModel
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={closeTaskModal}
          tasks={tasks}
        />
      )}
      {isViewTaskModalOpen && (
        <ViewTask task={selectedTask} onClose={closeTaskModal} tags={availableTags} />
      )}
    </div>
  );
};

export default TaskContainer;
