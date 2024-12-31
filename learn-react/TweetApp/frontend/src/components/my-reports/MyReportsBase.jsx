import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import ToDoListV1 from "./ThinkTank/EditorV1";
import SourceDetailsV1 from "./SourceDetails/v1";
// import ToDoListV2 from "./ThinkTank/ViewerV1";

const MyReportsBase = () => {
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") || "";
  return (
    <div>
      {!version && (
        <div>
          <NavLink
            to={`/my-reports?version=todo-v1`}
            // className="text-blue-600 dark:text-cyan-300 hover:underline font-medium text-sm"
            style={{ textAlign: "center" }}
          >
            <div>Todo - Version 1 -</div>
          </NavLink>
          <div className="text-center">
            we are planning to develop it as admin module, where create/update of todos will be done. Also settings related data and actions will be
            placed here.
          </div>

          <NavLink
            to={`/my-reports?version=todo-v2`}
            // className="text-blue-600 dark:text-cyan-300 hover:underline font-medium text-sm"
            style={{ textAlign: "center" }}
          >
            <div>Todo - Version 2</div>
          </NavLink>
          <div className="text-center">
            We are planning to develop it as view module, where all todos, as per access rules, will be visible. <br />
            Please note access rules are one of our upcoming features and yet to be developed and implemented.
          </div>


          <NavLink
            to={`/my-reports?version=datasources-v1`}
            // className="text-blue-600 dark:text-cyan-300 hover:underline font-medium text-sm"
            style={{ textAlign: "center" }}
          >
            <div>SourceDetails - Version 1</div>
          </NavLink>
          <div className="text-center">
            We are planning to collect and display all SourceDetails here.
          </div>
        </div>
      )}

      {version === "todo-v1" && <ToDoListV1 />}

      {/* {version === "todo-v2" && <ToDoListV2 />} */}
      {version === "todo-v2" && (
        <div className="text-center fs-3">
          Due to some additional design changes <span className="badge text-bg-success fs-6">(placed on 26/Jan/2025)</span> in v1, todo-v2-view is
          temporarily unavailable <br />
          We are working on it and will resume v2 soon!! <br />
          Thanks for your patience!!
        </div>
      )}

      {version==="datasources-v1"&&(<SourceDetailsV1/>)}
    </div>
  );
};

export default MyReportsBase;
