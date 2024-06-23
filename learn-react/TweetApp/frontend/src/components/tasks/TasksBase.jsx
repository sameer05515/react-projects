import React, { useReducer, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import * as PageModes from "../../common/taskPageModes";
import ViewTask from "./ViewTask";
import SaveDataComponent from "./SaveData";
import DataList from "./DataList";
import EditDataComponent from "./EditDataComponent";

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

function TasksBase() {
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
    <Container>
      {/* <Row>
                <Col sm={3}>
                    <Row>
                        <Col>
                            <Button onClick={showAdd}>Add</Button>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Col>
                <Col sm={9}>2 of 2</Col>
            </Row> */}
      <Row>
        <Col sm={5}>
          <div style={{ backgroundColor: "lightblue" }}>
            <Button onClick={showAdd}>Add</Button>
            {/* <Button onClick={showAdd}>Previous</Button>
            <Button onClick={showAdd}>Next</Button> */}
          </div>

          {/* <div>
            List of items
            <ul>
              <li>
                <div onClick={showData}>item description</div>
              </li>
            </ul>
          </div> */}
          <DataList itemSelectionHandler={showData} />
        </Col>

        <Col sm={7}>
          {/* {pageMode} */}
          {pageMode && pageMode === PageModes.NO_SELECTION && (
            <div>Please select any item</div>
          )}

          {pageMode && pageMode === PageModes.SHOW_ITEM && (
            <div>
              <ViewTask id={selectedId} itemEditHandler={editData} />
              {/* <Button onClick={showAdd}>Edit</Button>
              <Button onClick={showAdd}>Delete</Button> */}
            </div>
          )}

          {pageMode && pageMode === PageModes.NEW_ITEM && (
            <div>
              {/* Add form */}
              {/* <CreateNewTask /> */}
              <SaveDataComponent />
              {/* <Button onClick={showAdd}>Save</Button>
              <Button onClick={showAdd}>Cancel</Button> */}
            </div>
          )}

          {pageMode && pageMode === PageModes.EDIT && (
            <div>
              {/* Edit form
              <Button onClick={showAdd}>Update</Button>
              <Button onClick={showAdd}>Cancel</Button> */}
              <EditDataComponent savedData={selectedItem} />
            </div>
          )}

          {pageMode && pageMode === PageModes.DELETE && (
            <div>
              delete form
              <Button onClick={showAdd}>Yes</Button>
              <Button onClick={showAdd}>No</Button>
            </div>
          )}
          {/* <SearchDataComponent/> */}
        </Col>
      </Row>
    </Container>
  );
}

export default TasksBase;
