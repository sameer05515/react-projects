import React, { useMemo, useState } from "react";

// interface HoverActionsProps {
//   actions?: ReactNode[]; // Optional array of strings for actions
//   title?: string; // Optional title
// }

const defaultActions = ["Action 1", "Action 2", "Action 3"];

interface HoverActionsProps {
  actions?: React.ReactNode[];
  title?: string;
}

const HoverActions: React.FC<HoverActionsProps> = ({ actions = [], title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const calculatedActions = useMemo(() => {
    return actions.length > 0 ? actions : defaultActions;
  }, [actions]);

  const calculatedTitle = useMemo(() => {
    return title || "Select Action";
  }, [title]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block w-56 cursor-pointer rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-center text-gray-800 dark:text-gray-200 shadow-sm transition-all hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-lg"
    >
      <span
        className="block font-medium"
        title={`Actions: Total Actions ${calculatedActions.length}`}
      >
        {calculatedTitle}
      </span>
      {isHovered && (
        <div className="absolute left-1/2 top-full z-10 mt-2 max-h-44 w-full -translate-x-1/2 overflow-y-auto rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1 shadow-xl">
          {calculatedActions.map((action, index) => (
            <span
              key={index}
              className="block cursor-pointer rounded-md px-3 py-2 text-sm text-gray-800 dark:text-gray-200 transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400"
            >
              {action}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverActions;
