import React, { useState } from 'react';

const TaskSearch = ({ tasks, postSearch=()=>{} }) => {
  const [inputValue, setInputValue] = useState('');
  const [matchingTasks, setMatchingTasks] = useState([]);

  const handleInputChange = (e) => {
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
