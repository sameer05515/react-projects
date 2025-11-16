import React from "react";
import { ClassSuffixForStatus, getHeaderForThinkTankItemType, Status } from "../Item.dto";
// import { myTodos } from "./data";
// import { SmartPreviewer } from "../../../../common/components/Smart/Editor/v3";
import { useThinkTankEditorV1Context } from "./Context";
import { PurposeToOpenModal } from "./Context/utils";
import SmartPreviewer from "../../../../common/components/Smart/Previewer/v4";
import WithEditIcon from "../../../../common/components/WithEditIcon/v2";
import Badge from "../../../../common/components/badge/Badge";

const ListItem = ({ todo }) => {
  const { uniqueId, smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType } =
    todo || {};
  const { openModalForPurpose } = useThinkTankEditorV1Context();

  const createdDateStr = (
    <Badge color={createdDate ? "secondary" : "danger"}>
      Created On: {createdDate || "Missing"}
    </Badge>
  );

  const closedOnStr = closedOn ? (
    <Badge color="secondary">Closed On: {closedOn} </Badge>
  ) : null;
  const statusClassName = ClassSuffixForStatus[status];

  const urgentStr = (
    <Badge color={isUrgent ? "danger" : "warning"}>
      {!isUrgent ? "Not" : ""} Urgent
    </Badge>
  );

  const importantStr = (
    <Badge color={isImportant ? "dark" : "warning"}>
      {!isImportant ? "Not" : ""} Important
    </Badge>
  );

  const hasGroomedStr = (
    <div>
      <Badge color={hasGroomed ? "success" : "danger"} className="text-right mb-3 block">
        {hasGroomed === true ? "Groomed" : "This Todo is Not Fully Groomed Yet"}
      </Badge>
    </div>
  );

  if (!todo) {
    return null;
  }

  // Get background color for status
  const statusBgColor = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div className={`shadow rounded p-3 mb-5 mt-2 border ${statusBgColor[statusClassName] || "bg-gray-50 border-gray-200"}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          {status !== Status.CLOSED && hasGroomedStr}

          <div className="font-bold mb-2">Item Type: {getHeaderForThinkTankItemType(itemType)}</div>

          <WithEditIcon
            className="font-bold mb-2"
            showEditIcon={status !== Status.CLOSED}
            editIconTitle="Edit Smart Content"
            onEditIconClick={() =>
              openModalForPurpose(PurposeToOpenModal.UPDATE_GROOMING_NOTGrooming_OF_EXISTING_TTITEM_WITH_REASON, {
                uniqueId,
                status,
              })
            }
          >
            <Badge color={statusClassName}>{status}</Badge>
          </WithEditIcon>

          <div className="font-bold mb-2 flex flex-wrap gap-2">
            {urgentStr} {importantStr}
          </div>
          <div className="font-bold mb-2">{createdDateStr}</div>
          <div className="font-bold">{closedOnStr}</div>
        </div>
        <WithEditIcon
          className="w-full md:w-3/4"
          showEditIcon={status !== Status.CLOSED}
          editIconTitle="Edit Smart Content"
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
    <ul className="space-y-4">
      {filteredTodos.map((todo, idx) => (
        <ListItem key={`idx_${idx + 1}`} todo={todo} />
      ))}
    </ul>
  );
};

export default List;
