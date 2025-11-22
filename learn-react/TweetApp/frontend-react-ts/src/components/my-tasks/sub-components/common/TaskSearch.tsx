import React, { useMemo, useState } from 'react'; // ✅ Added useMemo for Phase 3

type TaskSearchProps = {
  tasks: any[];
  postSearch?: (tasks: any[]) => void;
};

const TaskSearch: React.FC<TaskSearchProps> = ({ tasks, postSearch = () => {} }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [matchingTasks, setMatchingTasks] = useState<any[]>([]);

  // ✅ Phase 3: Memoize filtered tasks to avoid re-filtering on every render
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.uniqueId.includes(inputValue)),
    [tasks, inputValue]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Update matching tasks when filteredTasks changes
  React.useEffect(() => {
    setMatchingTasks(filteredTasks);
    postSearch(filteredTasks);
  }, [filteredTasks, postSearch]);

  return (
    <div>
      <h2>Task Search</h2>
      <input
        type="text"
        placeholder="Enter Task Unique ID"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {matchingTasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Phase 3: Memoize component to prevent unnecessary re-renders
export default React.memo(TaskSearch);
