import React from "react";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";
import ModalV3 from "../../../../common/hoc/modal/ModalV3";
import ButtonGroup from "./ButtonGroup";
import { ThinkTankEditorV1ContextProvider, useThinkTankEditorV1Context } from "./Context";
import { PurposeToOpenModal } from "./Context/utils";
import List from "./List";

const debug = true;

const ThinkTankEditorV1 = () => {
  const { myTodos, filteredTodos, showModal, setShowModal, ModalChildrenComponent, openModalForPurpose, modalTitle } =
    useThinkTankEditorV1Context();

  return (
    <div className="w-full min-h-screen bg-green-600 p-2 bg-opacity-75">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>

      <h1 className="text-2xl font-bold mb-4">My Think-Tank - (older name My-ToDo List):v1</h1>
      <h2 className="text-xl mb-4">
        This modules is TO REDUCE STRESS AND IF THEY ARE "VALID ASK"s, then take action on them accordingly in near
        future.
      </h2>
      <details>
        <div className="whitespace-pre-wrap">
          {`Here we will put all our To-dos, in below format
        <pre>[Date]:[Status- (Open/Closed)]- Title of to-do Description (As short as possible)</pre>
        We are developing this component as editor for current logged-in user. <br />
        For now we will support both database data as well as raw data created in tool.

        Glossary
        U = Urgent, NU = Not-Urgent
        I = Important, NI = Not-Important
        G = Groomed, NG = Not Groomed   

        MY Think Tank Items:
        Why?
          - TO store Any random idea coming in mind, on which I want to take action later. Below are some possible types.
            - default type: Yet to be decided
            - Questions to SELF 
            - To-do, Task, Goal, Plan
            - Reminders, 
            - My routine
            - My-Daily-Updates		
            - Some templates , like
              - template having a format we can use to define a todo, so that it can be elaborated in single line and can be implemented easily.
            - New Requirement
            - Bug-Fix
            - Remembrables etc
            
          - Aim is TO REDUCE STRESS AND IF THEY ARE "VALID ASK"s, then take appropriate actions them in near future`}
        </div>
      </details>

      <div className="flex items-center mb-4">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold">My List</h3>
        </div>
        <div className="w-full md:w-1/2 flex justify-end gap-2">
          <button
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => openModalForPurpose(PurposeToOpenModal.BAS_AISE_HI_TESTING_KE_LIYE, null)}
          >
            JUST TO TEST MODAL V3 and SmartEditorV4
          </button>
          <button
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => openModalForPurpose(PurposeToOpenModal.Open_Show_Statistics, null)}
          >
            Show Statistics
          </button>
        </div>
      </div>

      <ButtonGroup />
      {/* <div id="to-do-list-div"></div> */}
      <List />

      {showModal && (
        <ModalV3 title={modalTitle} isOpen={showModal} onClose={() => setShowModal(false)}>
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
