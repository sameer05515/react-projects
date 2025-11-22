import React from "react";
import AutoCompleteDropdown from "../../../../common/components/auto-complete/AutoCompleteDropdown";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEditTask, onViewTask }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-teal-900">Task List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.uniqueId}
            className="rounded-lg border border-teal-200 bg-teal-50/40 p-4 hover:border-teal-300 transition-colors"
          >
            <TaskCard task={task} />
            <div className="mt-3 flex gap-2">
              <CustomButton
                className="bg-teal-100 hover:bg-teal-200 text-teal-800 text-xs px-2 py-1 rounded border border-teal-200"
                onClick={() => onEditTask(task)}
              >
                Edit
              </CustomButton>
              <CustomButton
                className="bg-teal-100 hover:bg-teal-200 text-teal-800 text-xs px-2 py-1 rounded border border-teal-200"
                onClick={() => onViewTask(task)}
              >
                View
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <AutoCompleteDropdown names={tasks.map((t) => t.name || t.title || "")} />
      </div>
    </div>
  );
};

export default TaskList;
