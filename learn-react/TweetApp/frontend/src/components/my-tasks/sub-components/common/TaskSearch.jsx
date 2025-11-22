import React, { useState } from "react";

const TaskSearch = ({ tasks, postSearch = () => {} }) => {
  const [inputValue, setInputValue] = useState("");
  const [matchingTasks, setMatchingTasks] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = tasks.filter((task) => (task.uniqueId || "").includes(value));
    setMatchingTasks(filtered);
    postSearch(filtered);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-teal-800 mb-2">Task Search</h3>
      <input
        type="text"
        placeholder="Enter Task Unique ID"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full max-w-xs rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm text-teal-900 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
      />
      {matchingTasks.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-teal-700">
          {matchingTasks.map((task) => (
            <li key={task._id}>{task.name || task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskSearch;
