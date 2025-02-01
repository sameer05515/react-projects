import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../../common/components/custom-button/CustomButton";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../common/components/Smart/Editor/v3";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import ViewSwitcher from "../../common/components/view-switcher/ViewSwitcher";
import { fetchTags } from "../../redux/slices/tagsSlice";
import {
  fetchTasks,
  selectAllTreeTasks,
  selectSelectedTaskUniqueId,
} from "../../redux/slices/taskSlice";
import TaskCardViewDashboard from "./sub-components/common/TaskCardViewDashboard";
import { prepareTaskTitle } from "./sub-components/common/taskUtils";

const TaskBase = () => {
  const [selectedView, setSelectedView] = useState("tree");
  const handleChangeView = (event) => {
    setSelectedView(event.target.value);
  };

  return (
    <div>
      <ViewSwitcher
        viewList={[
          { viewName: "tree", viewLabel: "Tree View" },
          { viewName: "card", viewLabel: "Card View" },
        ]}
        onChange={handleChangeView}
        selectedView={selectedView}
      />
      {selectedView === "tree" && <TaskTreeViewDashboard />}
      {selectedView === "card" && <TaskCardViewDashboard />}
    </div>
  );
};

const TaskTreeViewDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectAllTreeTasks);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const selectedTaskUniqueId = useSelector(selectSelectedTaskUniqueId);
  const selectedElementRef = useRef(null);

  useEffect(() => {
    if (selectedElementRef.current) {
      // console.log(`selectedElementRef.current: ${selectedElementRef.current}`);
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [selectedTaskUniqueId]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleLinkSelection = (selectedItem) => {
    navigate(`${selectedItem.uniqueId}`);
  };

  const getTasksJSX = (tasksList) => {
    return (
      <>
        {tasksList && tasksList.length > 0 && (
          <ul>
            {tasksList.map((t) => (
              <li key={t.uniqueId}>
                <span
                  ref={
                    selectedTaskUniqueId === t.uniqueId
                      ? selectedElementRef
                      : null
                  }
                  style={{
                    fontSize: "12px",
                    ...(selectedTaskUniqueId &&
                    selectedTaskUniqueId === t.uniqueId
                      ? styles.selected
                      : {}),
                  }}
                  onClick={() => handleLinkSelection(t)}
                >
                  {t.name}
                </span>
                {getTasksJSX(t.children)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="linksContainer">
        <div className="left-section">
          {/* <pre>{links && JSON.stringify(links)}</pre> */}
          <CustomButton onClick={() => handleButtonClick("create")}>
            Create Task
          </CustomButton>
          <CustomButton onClick={() => dispatch(fetchTasks())}>
            Refresh
          </CustomButton>

          {/* {getTasksJSX(tasks)} */}

          <Tree
            data={tasks}
            selectedNodeId={selectedTaskUniqueId}
            renderNode={(t) => (
              <>
                <span
                  ref={
                    selectedTaskUniqueId === t.uniqueId
                      ? selectedElementRef
                      : null
                  }
                  style={{
                    fontSize: "12px",
                    ...(selectedTaskUniqueId &&
                    selectedTaskUniqueId === t.uniqueId
                      ? styles.selected
                      : {}),
                  }}
                  onClick={() => handleLinkSelection(t)}
                >
                  {/* {t.name} */}
                  <SmartPreviewer
                    data={{
                      content: prepareTaskTitle(t, "TaskBase"),
                      textOutputType: SupportedTextFormats.MARKDOWN,
                    }}
                    markdownStyles={{ fontSize: "12px" }}
                  />
                </span>
              </>
            )}
          />
        </div>
        {/* -- left-section */}

        <div className="right-section">
          <div>
            <Outlet />
          </div>
        </div>
        {/* -- right-section */}
      </div>
    </>
  );
};

// const prepareTasksQueue = (list, prevQueue = []) => {
//     let queue = [...prevQueue];
//     if (list && list.length > 0) {
//         list.forEach(t => {
//             queue = [...queue, { uniqueId: t.uniqueId, title: t.title, children: t.children, _id: t._id }];
//             const childQ = prepareTasksQueue(t.children, []);
//             queue = [...queue, ...childQ];
//         })
//     }
//     return queue;
// };

const styles = {
  selected: {
    fontWeight: "bold" /* Make selected link text bold */,
    fontSize: "15px" /* Increase font size for selected link */,
    color: "#e91140",
  },
};

export default TaskBase;
// export {
//   // AddSubTaskRouterPage,
//   // CreateTaskRouterPage,
//   // EditTaskRouterPage,
//   // ViewTaskRouterPage,
// };
