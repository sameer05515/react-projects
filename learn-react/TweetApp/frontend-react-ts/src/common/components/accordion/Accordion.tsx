import React, { useState, useEffect } from "react";
import EditableLabel from "../editable-label/EditableLabel";

function Accordion({
  title,
  children,
  isExpanded,
  className = "",
  contentClassName = "",
  headerClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <button
        type="button"
        onClick={toggleAccordion}
        className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-gray-50 ${headerClassName}`}
      >
        <EditableLabel text={title} editable={false} displayClassName="text-lg font-semibold text-gray-900" />
        <span
          className={`text-sm text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className={`border-t border-gray-100 px-4 py-3 text-gray-700 ${contentClassName}`}>{children}</div>
      )}
    </div>
  );
}

export default Accordion;
