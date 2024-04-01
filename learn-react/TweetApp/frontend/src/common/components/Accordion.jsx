import React, { useState, useEffect } from "react";
import "./Accordion.css";
import EditableLabel from "./EditableLabel";

function Accordion({ title, children, isExpanded }) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <EditableLabel
          text={title}
          editable={false}
          labelStyle={{
            fontWeight: "bold", // Apply bold style for tweet
            fontSize: "18px", // Set font size for tweet
          }}
        />
        <span className={`accordion-icon ${isOpen ? "open" : "closed"}`}>
          ▼
        </span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default Accordion;
