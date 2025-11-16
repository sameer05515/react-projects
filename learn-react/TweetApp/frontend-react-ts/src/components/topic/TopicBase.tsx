import React, { useState } from "react";
import TopicCardViewDashboard from "./sub-components/card-view/TopicCardViewDashboard";
import HoverActions from "../../common/components/hover-actions/HoverActions";
import ReactDOM from "react-dom";
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
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-tr from-blue-50 to-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg">
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
                    ? "bg-blue-700 text-white shadow-lg scale-105"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                }
                outline-none focus:ring-2 focus:ring-blue-400`}
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
                    ? "bg-blue-500 text-white font-bold shadow"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              onClick={() => setSelectedView(option.value)}
            >
              {option.label}
            </span>
          )) as React.ReactNode[]}
        />
      </div>

      <div className="bg-white/90 shadow-lg rounded-xl p-6 min-h-[500px] border border-blue-100 transition-shadow duration-300">
        {selectedView === "tree" && (
          <TopicTreeViewDashboard
            containerClassName="w-full"
            itemClassName="bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-300 px-4 py-2 rounded mb-2 transition"
            headerClassName="text-lg font-semibold text-blue-800 mb-4"
          />
        )}
        {selectedView === "card" && (
          <TopicCardViewDashboard
            cardClassName="bg-blue-100 border border-blue-200 p-4 rounded-lg shadow hover:shadow-md transition flex flex-col items-start"
            containerClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            titleClassName="font-bold text-blue-800 text-lg mb-2"
            descClassName="text-blue-700 text-sm mb-3"
          />
        )}
      </div>
    </div>
  );
};

export default TopicBase;
