import React from "react";
import { ClassSuffixForStatus, getHeaderForThinkTankItemType, Status } from "../Item.dto";
// import { myTodos } from "./data";
import { FaEdit } from "react-icons/fa";
// import { SmartPreviewer } from "../../../../common/components/Smart/Editor/v3";
import { useThinkTankEditorV1Context } from "./Context";
import { PurposeToOpenModal } from "./Context/utils";
import styles from "./list-item.styles.module.css";
import SmartPreviewer from "../../../../common/components/Smart/Previewer/v4";

const WithEditIcon = ({ className = "", children, showEditIcon = false, onEditIconClick = () => {} }) => (
  <div className={`${className} ${styles.listItem}`}>
    {children}
    {showEditIcon && (
      <span className={styles.editIcon} onClick={onEditIconClick} role="button">
        <FaEdit size={18} />
      </span>
    )}
  </div>
);

const ListItem = ({ todo }) => {
  const { uniqueId, smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType } =
    todo || {};
  const { openModalForPurpose } = useThinkTankEditorV1Context();

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
        {/* <div className={`col-12 col-md-9 ${styles.listItem}`}>
          
          <SmartPreviewer data={smartContent} /> 
          {status !== Status.CLOSED && (
            <span
              className={styles.editIcon}
              onClick={() =>
                openModalForPurpose(PurposeToOpenModal.UPDATE_SMART_CONTENT_OF_EXISTING_TTITEM, {
                  uniqueId,
                  smartContent,
                })
              }
              role="button"
            >
              <FaEdit size={18} />
            </span>
          )}
        </div> */}
        <WithEditIcon
          className="col-12 col-md-9"
          showEditIcon={status !== Status.CLOSED}
          onEditIconClick={() =>
            openModalForPurpose(PurposeToOpenModal.UPDATE_SMART_CONTENT_OF_EXISTING_TTITEM, {
              uniqueId,
              smartContent,
            })
          }
        >
          <SmartPreviewer data={smartContent} />
        </WithEditIcon>
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
