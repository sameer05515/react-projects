import React, { useCallback, useState } from "react";
import {
  ClassSuffixForStatus,
  getFilteredTodos,
  sortTodosByCreatedDate,
  sortTodosByStatus,
  sortTodosByUrgencyAndImportance,
  Status,
} from "./Todo.dto";
import { myTodos } from "./data";
import pipe from "../../../common/service/pipe-util";
import { availableOutputTypes, SmartPreviewer } from "../../../common/components/Smart/Editor/v3";
import Badge from "../../../common/components/badge/Badge";

const FilterActionTypes = {
  SHOW_ALL: "show-all",
  SHOW_OPEN_ONLY: "show-open-only",
  SHOW_CLOSED_ONLY: "show-closed-only",
};

const FilterActions = {
  [FilterActionTypes.SHOW_ALL]: () => true,
  [FilterActionTypes.SHOW_OPEN_ONLY]: (todo) => todo.status === Status.OPEN,
  [FilterActionTypes.SHOW_CLOSED_ONLY]: (todo) => todo.status === Status.CLOSED,
};

// Component for Filter Buttons
const FilterButtons = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(FilterActionTypes.SHOW_ALL);
  
  const filters = [
    { label: "Show Open", id: "show-open-todos-btn", action: FilterActionTypes.SHOW_OPEN_ONLY },
    { label: "Show Closed", id: "show-closed-todos-btn", action: FilterActionTypes.SHOW_CLOSED_ONLY },
    { label: "Show All", id: "show-all-todos-btn", action: FilterActionTypes.SHOW_ALL },
  ];

  const handleFilterClick = (action) => {
    setSelectedFilter(action);
    onFilterChange(action);
  };

  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-blue-600 bg-blue-50" role="group" aria-label="Filter Buttons">
      {filters.map(({ label, id, action }) => (
        <button
          key={id}
          type="button"
          id={id}
          onClick={() => handleFilterClick(action)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            selectedFilter === action
              ? "bg-blue-600 text-white"
              : "bg-transparent text-blue-600 hover:bg-blue-100"
          } ${action !== FilterActionTypes.SHOW_ALL ? "border-l border-blue-600" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// Component for a Single Todo Item
const ListItem = ({ name, createdDate, status, closedOn, isUrgent, isImportant }) => {
  const createdDateStr = createdDate ? (
    <Badge color="secondary">Created On: {createdDate}</Badge>
  ) : (
    <Badge color="danger">Created On: Missing</Badge>
  );

  const closedOnStr = closedOn && <Badge color="secondary">Closed On: {closedOn}</Badge>;

  const statusClassName = ClassSuffixForStatus[status];
  const statusStr = <Badge color={statusClassName}>{status}</Badge>;

  const urgentStr = <Badge color={isUrgent ? "danger" : "warning"}>{isUrgent ? "Urgent" : "Not Urgent"}</Badge>;

  const importantStr = <Badge color={isImportant ? "dark" : "warning"}>{isImportant ? "Important" : "Not Important"}</Badge>;

  // Get background color for status
  const statusBgColor = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div className={`shadow rounded p-3 mb-5 mt-2 border ${statusBgColor[statusClassName] || "bg-gray-50 border-gray-200"}`}>
      <span className="whitespace-pre-wrap block mb-2">
        {/* {name} */}
        <SmartPreviewer data={{ content: name, textOutputType: availableOutputTypes.HTML }} />
      </span>
      <div className="flex flex-wrap gap-2 font-bold">
        {statusStr} {urgentStr} {importantStr} {createdDateStr} {closedOnStr}
      </div>
    </div>
  );
};

// Component for the Todo List
const List = ({ todos = [] }) => (
  <ul className="space-y-4 w-full max-w-4xl">
    {todos.map((todo, idx) => (
      <ListItem key={`todo_${idx}`} {...todo} />
    ))}
  </ul>
);

// Main ToDoBase Component
const ThinkTankViewerV1 = () => {
  const [filteredTodos, setFilteredTodos] = useState(() => pipe(sortTodosByUrgencyAndImportance, sortTodosByCreatedDate, sortTodosByStatus)(myTodos));

  const handleFilterChange = useCallback((actionType) => {
    setFilteredTodos(
      pipe(
        (todos) => getFilteredTodos(todos, FilterActions[actionType]),
        sortTodosByUrgencyAndImportance,
        sortTodosByCreatedDate,
        sortTodosByStatus
      )(myTodos)
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-green-600 p-2 bg-opacity-75">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <h1 className="text-2xl font-bold mb-4">My-ToDo List- v2</h1>
      <details className="mb-4">
        <summary className="cursor-pointer font-semibold">Instructions</summary>
        <div className="mt-2">
          Here we will put all our To-dos, in the below format:
          <pre className="bg-gray-100 p-2 rounded mt-2">[Date]: [Status (Open/Closed)] - Title of to-do Description (As short as possible)</pre>
        </div>
      </details>
      <h3 className="text-xl font-semibold mb-4">My List</h3>
      <div className="mb-4">
        <FilterButtons onFilterChange={handleFilterChange} />
      </div>
      <List todos={filteredTodos} />
    </div>
  );
};

export default ThinkTankViewerV1;
