import React /*useEffect*/ from "react";
import AutoCompleteDropdown from "../../../../common/components/auto-complete/AutoCompleteDropdown";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: any[];
  itemsPerRow?: number;
  onEditTask?: (task: any) => void;
  onViewTask?: (task: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  itemsPerRow = 3,
  onEditTask = () => {},
  onViewTask = () => {},
}) => {
  const rows: JSX.Element[] = [];
  for (let i = 0; i < tasks.length; i += itemsPerRow) {
    const rowTasks = tasks.slice(i, i + itemsPerRow);
    rows.push(
      <div className="flex flex-wrap justify-between gap-2.5 mb-2.5" key={i}>
        {rowTasks.map((task) => (
          <div 
            key={task.uniqueId}
            className="flex-[0_0_calc(33.33%-10px)] m-1.5 p-2.5 border border-gray-300 box-border bg-green-50 rounded-[10px]"
          >
            <TaskCard task={task} />
            <div className="mt-2.5 flex gap-2">
              <CustomButton onClick={() => onEditTask(task)}>
                Edit
              </CustomButton>
              <CustomButton onClick={() => onViewTask(task)}>View</CustomButton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task List</h2>
      {rows}
      <div className="mt-6">
        <AutoCompleteDropdown names={tasks.map((t) => t.title)} />
      </div>
    </div>
  );
};

export default TaskList;
