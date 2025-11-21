import React, { useState } from 'react';

type TaskSearchProps = {
  tasks: any[];
  postSearch?: (tasks: any[]) => void;
};

const TaskSearch: React.FC<TaskSearchProps> = ({ tasks, postSearch = () => {} }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [matchingTasks, setMatchingTasks] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter tasks based on uniqueId containing the input value
    const filteredTasks = tasks.filter((task) =>
      task.uniqueId.includes(value)
    );

    setMatchingTasks(filteredTasks);
    postSearch(filteredTasks);
  };

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

export default TaskSearch;
