import { useState } from "react";
import TopicCardViewDashboard from "./sub-components/card-view/TopicCardViewDashboard";
import HoverActions from "../../common/components/hover-actions/HoverActions";
import TopicTreeViewDashboard from "./sub-components/tree-view/TopicTreeViewDashboard";

const VIEW_OPTIONS = [
  { label: "List View", value: "tree" },
  { label: "Card View", value: "card" },
];

const TopicBase = () => {
  const [selectedView, setSelectedView] = useState("tree");

  // Ensure subcomponents receive Tailwind styling props if needed
  // We'll pass additional Tailwind classNames to subcomponents

  return (
    <div className="max-w mx-auto p-6 bg-gradient-to-tr from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-200">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200 tracking-tight drop-shadow-lg">
          Topic Dashboard
        </h2>
        <div className="flex gap-2">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedView(option.value)}
              className={`px-5 py-2 rounded-full transition-all duration-200 font-semibold
                ${
                  selectedView === option.value
                    ? "bg-blue-700 dark:bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-gray-600 border border-blue-200 dark:border-gray-600"
                }
                outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500`}
              aria-pressed={selectedView === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
          <HoverActions
          title={
            selectedView
              ? `Selected Topic View: ${selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}`
              : "Select Topic View"
          }
          actions={VIEW_OPTIONS.map(option => (
            <span
              key={option.value}
              className={`cursor-pointer px-3 py-1 mx-1 rounded-full transition-all duration-150 text-sm
                ${
                  selectedView === option.value
                    ? "bg-blue-500 dark:bg-blue-600 text-white font-bold shadow"
                    : "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`}
              onClick={() => setSelectedView(option.value)}
            >
              {option.label}
            </span>
          )) as any}
        />
      </div>

      <div className="bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-xl p-6 min-h-[500px] border border-blue-100 dark:border-gray-700 transition-all duration-300">
        {selectedView === "tree" && (
          <TopicTreeViewDashboard
            containerClassName="w-full"
            itemClassName="bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 border-l-4 border-blue-300 dark:border-blue-500 px-4 py-2 rounded mb-2 transition"
            headerClassName="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4"
          />
        )}
        {selectedView === "card" && (
          <TopicCardViewDashboard />
        )}
      </div>
    </div>
  );
};

export default TopicBase;
