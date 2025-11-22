// TaskCardViewDashboard.jsx
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import UnderConstruction from "../../../../common/components/UnderConstruction";
import {
  fetchTasks,
  saveTask,
  selectAllFlatTasks,
  selectTasksStateCombined,
  updateTask,
} from "../../../../redux/slices/taskSlice";
import TaskList from "./TaskList";
import TaskModel from "./TaskModel";
import TaskSearch from "./TaskSearch";
import ViewTask from "./ViewTask";

const TaskCardViewDashboard = ({ underConstruction = false }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null); // { type: 'add'|'edit'|'view', task: task|null }

  const { status, error } = useSelector(selectTasksStateCombined);
  const tasks = useSelector(selectAllFlatTasks);

  const openModal = useCallback((type, task = null) => setModal({ type, task }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const handleSaveTask = useCallback(
    async (newTask) => {
      try {
        if (modal?.task) {
          await dispatch(updateTask({ taskId: newTask._id, taskData: { ...newTask } }));
        } else {
          await dispatch(saveTask(newTask));
        }
        dispatch(fetchTasks());
      } catch (err) {
        console.error("Error saving task:", err);
      }
      closeModal();
    },
    [dispatch, modal?.task, closeModal]
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[320px] p-8 text-teal-700 font-medium">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700 font-medium">
        Error: {error}
      </div>
    );
  }

  if (underConstruction) {
    return <UnderConstruction title="Card View of Task Management" />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="rounded-xl border border-teal-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <CustomButton
            className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => openModal("add")}
          >
            Add Task
          </CustomButton>
          <CustomButton
            className="bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => dispatch(fetchTasks())}
          >
            Refresh Tasks
          </CustomButton>
        </div>
        <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50/50 p-4">
          <TaskSearch tasks={tasks} />
        </div>
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onEditTask={(task) => openModal("edit", task)}
            onViewTask={(task) => openModal("view", task)}
          />
        </div>
      </div>

      {modal?.type === "add" && (
        <TaskModel onSave={handleSaveTask} onCancel={closeModal} tasks={tasks} />
      )}
      {modal?.type === "edit" && (
        <TaskModel task={modal.task} onSave={handleSaveTask} onCancel={closeModal} tasks={tasks} />
      )}
      {modal?.type === "view" && (
        <ViewTask task={modal.task} onClose={closeModal} />
      )}
    </div>
  );
};

export default TaskCardViewDashboard;
