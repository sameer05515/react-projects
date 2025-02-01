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
  const filters = [
    { label: "Show Open", id: "show-open-todos-btn", action: FilterActionTypes.SHOW_OPEN_ONLY },
    { label: "Show Closed", id: "show-closed-todos-btn", action: FilterActionTypes.SHOW_CLOSED_ONLY },
    { label: "Show All", id: "show-all-todos-btn", action: FilterActionTypes.SHOW_ALL },
  ];

  return (
    <div className="btn-group bg-info" role="group" aria-label="Filter Buttons">
      {filters.map(({ label, id, action }) => (
        <React.Fragment key={id}>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id={id}
            autoComplete="off"
            defaultChecked={action === FilterActionTypes.SHOW_ALL}
            onClick={() => onFilterChange(action)}
          />
          <label className="btn btn-outline-primary" htmlFor={id}>
            {label}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

// Component for a Single Todo Item
const ListItem = ({ name, createdDate, status, closedOn, isUrgent, isImportant }) => {
  const createdDateStr = createdDate ? (
    <span className="badge text-bg-secondary">Created On: {createdDate}</span>
  ) : (
    <span className="badge text-bg-danger">Created On: Missing</span>
  );

  const closedOnStr = closedOn && <span className="badge text-bg-secondary">Closed On: {closedOn}</span>;

  const statusClassName = ClassSuffixForStatus[status];
  const statusStr = <span className={`badge text-bg-${statusClassName}`}>{status}</span>;

  const urgentStr = <span className={`badge text-bg-${isUrgent ? "danger" : "warning"}`}>{isUrgent ? "Urgent" : "Not Urgent"}</span>;

  const importantStr = <span className={`badge text-bg-${isImportant ? "dark" : "warning"}`}>{isImportant ? "Important" : "Not Important"}</span>;

  return (
    <div className={`shadow rounded p-3 mb-5 mt-2 list-group-item list-group-item-${statusClassName}`}>
      <span style={{ whiteSpace: "pre-wrap" }}>
        {/* {name} */}
        <SmartPreviewer data={{ content: name, textOutputType: availableOutputTypes.HTML }} />
      </span>
      <br />
      <span className="fw-bold">
        {statusStr} {urgentStr} {importantStr} {createdDateStr} {closedOnStr}
      </span>
    </div>
  );
};

// Component for the Todo List
const List = ({ todos = [] }) => (
  <ul className="list-group col-8">
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
    <div className="container-fluid min-vh-100 bg-success p-2 bg-opacity-75">
      <h1>Welcome</h1>
      <h1>My-ToDo List- v2</h1>
      <details>
        <summary>Instructions</summary>
        Here we will put all our To-dos, in the below format:
        <pre>[Date]: [Status (Open/Closed)] - Title of to-do Description (As short as possible)</pre>
      </details>
      <h3>My List</h3>
      <FilterButtons onFilterChange={handleFilterChange} />
      <List todos={filteredTodos} />
    </div>
  );
};

export default ThinkTankViewerV1;
