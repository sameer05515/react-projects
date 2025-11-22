import React, { useMemo } from "react"; // ✅ Added useMemo for Phase 3
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
  // ✅ Phase 3: Memoize rows generation to avoid re-creating on every render
  const rows = useMemo(() => {
    const rowsArray: JSX.Element[] = [];
    for (let i = 0; i < tasks.length; i += itemsPerRow) {
      const rowTasks = tasks.slice(i, i + itemsPerRow);
      rowsArray.push(
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
    return rowsArray;
  }, [tasks, itemsPerRow, onEditTask, onViewTask]);

  // ✅ Phase 3: Memoize task titles for AutoCompleteDropdown
  const taskTitles = useMemo(
    () => tasks.map((t) => t.title),
    [tasks]
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task List</h2>
      {rows}
      <div className="mt-6">
        <AutoCompleteDropdown names={taskTitles} />
      </div>
    </div>
  );
};

// ✅ Phase 3: Memoize component to prevent unnecessary re-renders
export default React.memo(TaskList);
