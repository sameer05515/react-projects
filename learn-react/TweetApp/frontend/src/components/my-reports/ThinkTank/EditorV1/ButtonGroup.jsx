import React, { useCallback } from "react";
import { FilterActionTypes, PurposeToOpenModal, useThinkTankEditorV1Context } from "./Context";

const ButtonGroup = () => {
  const { handleGroupBtnClick: onBGroupItemClick, openModalForPurpose } = useThinkTankEditorV1Context();
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
          onClick={() => openModalForPurpose(PurposeToOpenModal.SAVE_NEW_TODO, null)}
          type="button"
          class="btn btn-primary btn-sm"
          // style={{ "--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-font-size": ".75rem" }}
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

export default ButtonGroup;
