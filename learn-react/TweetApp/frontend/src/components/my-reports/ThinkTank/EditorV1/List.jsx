import React from "react";
import { ClassSuffixForStatus, getHeaderForThinkTankItemType, Status } from "../Item.dto";
// import { myTodos } from "./data";
import { SmartPreviewer } from "../../../../common/components/Smart/Editor/v3";
import { useThinkTankEditorV1Context } from "./Context";

const ListItem = ({ todo }) => {
  const { smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType } = todo || {};

  const createdDateStr = createdDate ? (
    <span className="badge text-bg-secondary"> Created On: {createdDate} </span>
  ) : (
    <span className="badge text-bg-danger"> Created On: Missing </span>
  );

  const closedOnStr = closedOn ? <span className="badge text-bg-secondary">Closed On: {closedOn} </span> : null;
  const statusClassName = ClassSuffixForStatus[status];
  const statusStr = <span className={`badge text-bg-${statusClassName}`}> {status} </span>;

  const urgentStr = (
    <span className={`badge text-bg-${isUrgent ? "danger" : "warning"}`}> {!isUrgent ? "Not" : ""} Urgent </span>
  );

  const importantStr = (
    <span className={`badge text-bg-${isImportant ? "dark" : "warning"}`}> {!isImportant ? "Not" : ""} Important </span>
  );

  const hasGroomedStr = (
    <div>
      <span className={`badge text-end text-break mb-3 text-bg-${hasGroomed ? "success" : "danger"}`}>
        {hasGroomed === true ? "Groomed" : "This Todo is Not Fully Groomed Yet"}
      </span>
    </div>
  );

  if (!todo) {
    return null;
  }

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

const List = () => {
  const { filteredTodos } = useThinkTankEditorV1Context();

  if (!filteredTodos || !Array.isArray(filteredTodos)) {
    return <div>todos are not valid array!</div>;
  }
  return (
    <ul className="list-group">
      {filteredTodos.map((todo, idx) => (
        <ListItem key={`idx_${idx + 1}`} todo={todo} />
      ))}
    </ul>
  );
};

export default List;
