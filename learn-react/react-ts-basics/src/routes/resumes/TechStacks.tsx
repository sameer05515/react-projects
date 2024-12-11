import React from "react";
import * as TSUtil from "../../common/util/resumes/tech-stacks/tech-stack";
import { renderCard } from "../../common/components/custom-card/Card";
import HoverActions from "../../common/components/hover-actions/HoverActions";

const TechStacks: React.FC = () => {
  const { success, data: techstacks, messages } = TSUtil.getAllTechStacks();
  const templateString = TSUtil.getTemplate();

  if (!success) {
    return (
      <>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} style={{ color: "red" }}>
              {message}
            </div>
          ))
        ) : (
          <div style={{ color: "red" }}>
            Error occurred, but detailed messages are missing. Please contact
            the administrator.
          </div>
        )}
      </>
    );
  }

  if (!techstacks || techstacks.length === 0) {
    return (
      <div style={{ color: "blue" }}>No tech stacks found to display.</div>
    );
  }

  return (
    <div>
      <h1>TechStack Viewer</h1>
      <pre style={{ whiteSpace: "pre-wrap", display: "none" }}>
        {templateString}
      </pre>
      <HoverActions />
      {renderCard({ title: "All Tech Stacks", objectToBeRendered: techstacks })}
    </div>
  );
};

export default TechStacks;
