import React from "react";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";
import ModalV3 from "../../../../common/hoc/modal/ModalV3";
import ButtonGroup from "./ButtonGroup";
import { PurposeToOpenModal, ThinkTankEditorV1ContextProvider, useThinkTankEditorV1Context } from "./Context";
import List from "./List";

const debug = true;

const ThinkTankEditorV1 = () => {
  const { myTodos, filteredTodos, showModal, setShowModal, ModalChildrenComponent, openModalForPurpose, modalTitle } =
    useThinkTankEditorV1Context();

  return (
    <div className="container-fluid min-vh-100 bg-success p-2 bg-opacity-75">
      <h1>Welcome</h1>

      <h1>My Think-Tank - (older name My-ToDo List):v1</h1>
      <h2>
        This modules is TO REDUCE STRESS AND IF THEY ARE "VALID ASK"s, then take action on them accordingly in near
        future.
      </h2>
      <details>
        Here we will put all our To-dos, in below format
        <pre>[Date]:[Status- (Open/Closed)]- Title of to-do Description (As short as possible)</pre>
        We are developing this component as editor for current logged-in user. <br />
        For now we will support both database data as well as raw data created in tool.
      </details>

      <h3>My List</h3>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => openModalForPurpose(PurposeToOpenModal.BAS_AISE_HI_TESTING_KE_LIYE, null)}
      >
        JUST TO TEST MODAL V3 and SmartEditorV4
      </button>
      <ButtonGroup />
      {/* <div id="to-do-list-div"></div> */}
      <List todos={filteredTodos} />

      {showModal && (
        <ModalV3 title={modalTitle} isOpen={showModal} onClose={() => setShowModal(false)} showCloseButton={true}>
          {ModalChildrenComponent}
        </ModalV3>
      )}

      {debug && <JSONDataViewer metadata={{ myTodos }} title="my-To-Dos-from-server" />}
    </div>
  );
};

// export default ThinkTankEditorV1;

const withContext = () => {
  return (
    <ThinkTankEditorV1ContextProvider>
      <ThinkTankEditorV1 />
    </ThinkTankEditorV1ContextProvider>
  );
};

export default withContext;
