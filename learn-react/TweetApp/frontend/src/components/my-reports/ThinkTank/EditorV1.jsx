import React, { useCallback, useState } from "react";
import {
  ClassSuffixForStatus,
  getFilteredTodos,
  getHeaderForThinkTankItemType,
  // sortTodosByCreatedDate,
  // sortTodosByCreatedDate,
  // sortTodosByGroomed,
  // sortTodosByStatus,
  // sortTodosByUrgencyAndImportance,
  Status,
} from "./Item.dto";
import { myTodos } from "./data";
import pipe from "../../../common/service/pipe-util";
import { SmartPreviewerV4 as SmartPreviewer } from "../../../common/components/Smart/Editor/v4";

const FilterActionTypes = {
  SHOW_ALL: "show-all",
  SHOW_OPEN_ONLY: "show-open-only",
  SHOW_CLOSED_ONLY: "show-closed-only",
};

const FilterActions = {
  [FilterActionTypes.SHOW_ALL]: (todo) => true,
  [FilterActionTypes.SHOW_OPEN_ONLY]: (todo) => todo.status === Status.OPEN,
  [FilterActionTypes.SHOW_CLOSED_ONLY]: (todo) => todo.status === Status.CLOSED,
};

const ButtonGroup = ({ onBGroupItemClick }) => {
  const handleLinkClick = useCallback(
    (actionType = FilterActionTypes.SHOW_ALL) => {
      onBGroupItemClick?.(actionType);
    },
    [onBGroupItemClick]
  );
  return (
    <div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}
        >
          Create New Think-Tank item
        </button>
      </div>
      <div className="btn-group bg-info" role="group" aria-label="Basic radio toggle button group">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="show-open-todos-btn"
          autoComplete="off"
          onClick={() => handleLinkClick(FilterActionTypes.SHOW_OPEN_ONLY)}
        />
        <label className="btn btn-outline-primary btn-sm" htmlFor="show-open-todos-btn">
          Show Open
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="show-closed-todos-btn"
          autoComplete="off"
          onClick={() => handleLinkClick(FilterActionTypes.SHOW_CLOSED_ONLY)}
        />
        <label className="btn btn-outline-primary btn-sm" htmlFor="show-closed-todos-btn">
          Show Closed
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="show-all-todos-btn"
          autoComplete="off"
          defaultChecked
          onClick={() => handleLinkClick(FilterActionTypes.SHOW_ALL)}
        />
        <label className="btn btn-outline-primary btn-sm" htmlFor="show-all-todos-btn">
          Show All
        </label>
      </div>
    </div>
  );
};

const List = ({ todos = [] }) => {
  // Function to generate a single list item
  const ListItem = ({ smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType }) => {
    const createdDateStr = createdDate ? (
      <span className="badge text-bg-secondary"> Created On: {createdDate} </span>
    ) : (
      <span className="badge text-bg-danger"> Created On: Missing </span>
    );

    const closedOnStr = closedOn ? <span className="badge text-bg-secondary">Closed On: {closedOn} </span> : null;
    const statusClassName = ClassSuffixForStatus[status];
    const statusStr = <span className={`badge text-bg-${statusClassName}`}> {status} </span>;

    const urgentStr = <span className={`badge text-bg-${isUrgent ? "danger" : "warning"}`}> {!isUrgent ? "Not" : ""} Urgent </span>;

    const importantStr = <span className={`badge text-bg-${isImportant ? "dark" : "warning"}`}> {!isImportant ? "Not" : ""} Important </span>;

    const hasGroomedStr = (
      <div>
        <span className={`badge text-end text-break mb-3 text-bg-${hasGroomed ? "success" : "danger"}`}>
          {hasGroomed === true ? "Groomed" : "This Todo is Not Fully Groomed Yet"}
        </span>
      </div>
    );

    return (
      <div className={`shadow rounded p-3 mb-5 mt-2 list-group-item list-group-item-${statusClassName}`}>
        <div className="row">
          <div className="col-12 col-md-3">
            {status !== Status.CLOSED && hasGroomedStr}

            <div className="fw-bold">Item Type: {getHeaderForThinkTankItemType(itemType)}</div>

            <div className="fw-bold">{statusStr}</div>
            <div className="fw-bold">
              {urgentStr} {importantStr}
            </div>
            <div className="fw-bold">{createdDateStr}</div>
            <div className="fw-bold">{closedOnStr}</div>
          </div>
          <div className="col-12 col-md-9">
            {/* <span style={{ whiteSpace: "pre-wrap" }}> */}
            <SmartPreviewer data={smartContent} /> {/* </span> */}
          </div>
        </div>
      </div>
    );
  };

  //   const getLinks = (todos = []) => {
  //     return todos.map((todo, idx) => <ListItem key={`idx_${idx + 1}`} {...todo} />);
  //   };

  return (
    <ul className="list-group">
      {todos.map((todo, idx) => (
        <ListItem key={`idx_${idx + 1}`} {...todo} />
      ))}
    </ul>
  );
};

const ThinkTankEditorV1 = () => {
  //   const [filteredTodos, setFilteredTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(() =>
    pipe(
      // sortTodosByGroomed,
      // sortTodosByUrgencyAndImportance,
      // sortTodosByStatus,
      // sortTodosByCreatedDate
      (todos) => todos.reverse()
    )(myTodos)
  );
  const handleGroupBtnClick = useCallback((actionType = FilterActionTypes.SHOW_ALL) => {
    setFilteredTodos(
      pipe(
        (todos) => getFilteredTodos(todos, FilterActions[actionType]),
        // sortTodosByGroomed,
        // sortTodosByUrgencyAndImportance,
        // sortTodosByStatus,
        // (todos) => sortTodosByCreatedDate(todos, false),
        (todos) => todos.reverse()
      )(myTodos)
    );
  }, []);
  return (
    <div className="container-fluid min-vh-100 bg-success p-2 bg-opacity-75">
      <h1>Welcome</h1>

      <h1>My Think-Tank - (older name My-ToDo List):v1</h1>
      <h2>This modules is TO REDUCE STRESS AND IF THEY ARE "VALID ASK"s, then take action on them accordingly in near future.</h2>
      <details>
        Here we will put all our To-dos, in below format
        <pre>[Date]:[Status- (Open/Closed)]- Title of to-do Description (As short as possible)</pre>

        We are developing this component as editor for current logged-in user. <br/>
        For now we will support both database data as well as raw data created in tool.

      </details>

      <h3>My List</h3>
      <ButtonGroup onBGroupItemClick={handleGroupBtnClick} />
      {/* <div id="to-do-list-div"></div> */}
      <List todos={filteredTodos} />
    </div>
  );
};

export default ThinkTankEditorV1;
