import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../../common/components/custom-button/CustomButton";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../common/components/Smart/Editor/v3";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import { useReduxDataFetching } from "../../common/hooks/useDataFetching";
import {
  fetchTasks,
  selectTasksStateCombined,
} from "../../redux/slices/taskSlice";
import TaskCardViewDashboard from "./sub-components/common/TaskCardViewDashboard";
import { prepareTaskTitle } from "./sub-components/common/taskUtils";

const VIEW_OPTIONS = [
  { label: "Tree View", value: "tree" },
  { label: "Card View", value: "card" },
];

const TaskBase = () => {
  const [selectedView, setSelectedView] = useState("tree");

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50/60 min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-extrabold text-teal-900 tracking-tight drop-shadow-sm">
          Task Dashboard
        </h2>
        <div className="flex gap-2">
          {VIEW_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedView(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedView === opt.value
                  ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-400/50"
                  : "bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white/95 shadow-lg rounded-xl border border-teal-200/90 min-h-[500px] transition-shadow duration-300 overflow-hidden">
        {selectedView === "tree" && <TaskTreeViewDashboard />}
        {selectedView === "card" && <TaskCardViewDashboard />}
      </div>
    </div>
  );
};

const TaskTreeViewDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedElementRef = useRef(null);

  useReduxDataFetching(fetchTasks, (state) => state.tasks);
  const { tasks, status, error, selectedId: selectedTaskUniqueId } = useSelector(selectTasksStateCombined);

  useEffect(() => {
    selectedElementRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  }, [selectedTaskUniqueId]);

  const goTo = (path) => navigate(path);
  const selectTask = (item) => navigate(String(item.uniqueId));

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[320px] p-8 text-teal-700 font-medium">
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-red-700 font-medium">
        Error: {error}
      </div>
    );
  }

  const btnClass =
    "bg-teal-50 border border-teal-300 px-3 py-1.5 text-xs font-medium text-teal-800 rounded-lg hover:bg-teal-100 focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 transition-colors";

  return (
    <div className="flex flex-col gap-6 lg:flex-row p-4">
      <aside className="lg:w-72 lg:flex-shrink-0">
        <div className="rounded-xl border border-teal-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <CustomButton className={btnClass} onClick={() => goTo("create")}>
              Create Task
            </CustomButton>
            <CustomButton className={btnClass} onClick={() => dispatch(fetchTasks())}>
              Refresh
            </CustomButton>
          </div>
          <Tree
            data={tasks}
            selectedNodeId={selectedTaskUniqueId}
            renderNode={(t) => (
              <span
                ref={selectedTaskUniqueId === t.uniqueId ? selectedElementRef : null}
                role="button"
                tabIndex={0}
                className={`block cursor-pointer rounded py-1.5 px-1 text-xs transition-colors hover:bg-teal-50 ${
                  selectedTaskUniqueId === t.uniqueId ? "font-semibold text-teal-700 text-sm bg-teal-100" : "text-teal-800"
                }`}
                onClick={() => selectTask(t)}
                onKeyDown={(e) => e.key === "Enter" && selectTask(t)}
              >
                <SmartPreviewer
                  data={{
                    content: prepareTaskTitle(t, "TaskBase"),
                    textOutputType: SupportedTextFormats.MARKDOWN,
                  }}
                  markdownStyles={{ fontSize: "12px" }}
                />
              </span>
            )}
          />
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="min-h-[24rem] rounded-xl border border-teal-200 bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TaskBase;
