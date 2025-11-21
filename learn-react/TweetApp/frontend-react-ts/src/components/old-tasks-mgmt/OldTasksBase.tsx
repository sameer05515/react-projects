import React, { useReducer, useState } from "react";
import CustomButton from "../../common/components/custom-button/CustomButton";
import * as PageModes from "../../common/constants/taskPageModes";
import ViewTask from "./sub-components/ViewTask";
import SaveDataComponent from "./sub-components/SaveData";
import DataList from "./sub-components/DataList";
import EditDataComponent from "./sub-components/EditDataComponent";

const initialState = PageModes.LIST;

const reducer = (state, action) => {
  switch (action.type) {
    case PageModes.LIST:
    case PageModes.EDIT:
    case PageModes.NEW_ITEM:
    case PageModes.DELETE:
    case PageModes.SHOW_ITEM:
      return action.type;
    default:
      return initialState;
  }
};

function OldTasksBase() {
  const [pageMode, dispatch] = useReducer(reducer, initialState);

  const changePageMode = (newMode) => {
    dispatch({ type: newMode });
  };

  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const showAdd = () => {
    // console.log("Add form will be shown");
    changePageMode(PageModes.NEW_ITEM);
  };
  const showData = (id) => {
    // console.log("Show form will be shown");
    changePageMode(PageModes.SHOW_ITEM);
    setSelectedId(id);
  };
  const editData = (item) => {
    // console.log("edit form will be shown");
    changePageMode(PageModes.EDIT);
    setSelectedItem(item);
  };
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-5/12">
          <div className="bg-blue-200 p-2 rounded mb-4">
            <CustomButton onClick={showAdd}>Add</CustomButton>
          </div>
          <DataList itemSelectionHandler={showData} />
        </div>

        <div className="w-full md:w-7/12">
          {pageMode && pageMode === PageModes.NO_SELECTION && (
            <div className="p-4 text-gray-600">Please select any item</div>
          )}

          {pageMode && pageMode === PageModes.SHOW_ITEM && (
            <div>
              <ViewTask id={selectedId || ""} itemEditHandler={editData} />
            </div>
          )}

          {pageMode && pageMode === PageModes.NEW_ITEM && (
            <div>
              <SaveDataComponent />
            </div>
          )}

          {pageMode && pageMode === PageModes.EDIT && (
            <div>
              <EditDataComponent savedData={selectedItem} />
            </div>
          )}

          {pageMode && pageMode === PageModes.DELETE && (
            <div className="p-4">
              <p className="mb-4">Are you sure you want to delete this item?</p>
              <div className="flex gap-2">
                <CustomButton onClick={showAdd}>Yes</CustomButton>
                <CustomButton onClick={showAdd}>No</CustomButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OldTasksBase;
