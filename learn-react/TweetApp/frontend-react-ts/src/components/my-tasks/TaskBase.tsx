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
import useDataFetching from "../../common/hooks/useDataFetching/v2";
import {
  fetchTasks,
  selectTasksStateCombined,
} from "../../redux/slices/taskSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import TaskCardViewDashboard from "./sub-components/common/TaskCardViewDashboard";
import { prepareTaskTitle } from "./sub-components/common/taskUtils";

const TaskBase = () => {
  const [selectedView, setSelectedView] = useState("tree");
  const handleChangeView = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      >
        {/* no-op */}
      </ViewSwitcher>
      {selectedView === "tree" && <TaskTreeViewDashboard />}
      {selectedView === "card" && <TaskCardViewDashboard />}
    </div>
  );
};

const TaskTreeViewDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const selectedElementRef = useRef<HTMLSpanElement | null>(null);
  const sidebarButtonClass =
    "bg-gray-100 border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 rounded hover:bg-gray-200 transition";

  // Fetch tasks data only when component mounts (with smart caching)
  useDataFetching(
    fetchTasks,
    (state) => state.tasks
  );

  // Use combined selector to optimize multiple useSelector calls
  const { tasks, status, error, selectedId: selectedTaskUniqueId } = useSelector((state: RootState) => selectTasksStateCombined(state));

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-72 lg:flex-shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <CustomButton className={sidebarButtonClass} onClick={() => handleButtonClick("create")}>
              Create Task
            </CustomButton>
            <CustomButton className={sidebarButtonClass} onClick={() => dispatch(fetchTasks() as any)}>
              Refresh
            </CustomButton>
          </div>
          <Tree
            data={tasks}
            selectedNodeId={selectedTaskUniqueId || undefined}
            renderNode={(t) => (
              <span
                ref={selectedTaskUniqueId === t.uniqueId ? selectedElementRef : null}
                className={`block cursor-pointer py-1 text-xs ${
                  selectedTaskUniqueId && selectedTaskUniqueId === t.uniqueId ? "font-semibold text-red-600 text-sm" : "text-gray-700"
                }`}
                onClick={() => handleLinkSelection(t)}
              >
                <SmartPreviewer
                  data={{
                    content: prepareTaskTitle(t as any, "TaskBase"),
                    textOutputType: SupportedTextFormats.MARKDOWN,
                    textInputType: "TextArea",
                  }}
                  markdownStyles={{ fontSize: "12px" }}
                />
              </span>
            )}
            onDragStart={undefined as any}
            onDrop={undefined as any}
            errorMessageOnNoData={"" as any}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="min-h-[24rem] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
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


export default TaskBase;
// export {
//   // AddSubTaskRouterPage,
//   // CreateTaskRouterPage,
//   // EditTaskRouterPage,
//   // ViewTaskRouterPage,
// };
