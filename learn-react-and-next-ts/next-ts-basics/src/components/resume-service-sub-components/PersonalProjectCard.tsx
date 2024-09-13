import React from "react";
import styles from "./PersonalProjectCard.module.css";
import {
  PersonalProject,
  TechStackProps,
} from "@/components/playground-sub-components/project-information/common/utils/types/data-type-definitions";

type PersonalProjectCardProps = {
  project: PersonalProject;
};

const PersonalProjectCard: React.FC<PersonalProjectCardProps> = ({
  project: {
    name,
    projectType,
    isActiveDevelopmentGoingOn,
    projectLocation,
    purpose,
    requiredFeatures,
    techStacksUsed,
  },
}) => {
  const renderTechStacks = () => {
    return techStacksUsed.map((tech, index) => {
      if (typeof tech === "string") {
        return <li key={index}>{tech}</li>;
      } else if (isTechStackProps(tech)) {
        return <li key={index}>{tech.name}</li>;
      }
    });
  };

  // Utility function to check if item is of TechStackProps type
  const isTechStackProps = (item: any): item is TechStackProps => {
    return (
      (item as TechStackProps).name !== undefined &&
      (item as TechStackProps).type !== undefined
    );
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <h3 className={styles.projectStatus}>
        [{projectType}] - Development{" "}
        {isActiveDevelopmentGoingOn ? "In Progress" : "On Hold"}
      </h3>
      <p className={styles.location}>
        <strong>Location: </strong>
        {projectLocation}
      </p>
      <p className={styles.multilineText}>
        <strong>Purpose: </strong>
        {purpose}
      </p>
      <p className={styles.multilineText}>
        <strong>Required Features: </strong>
        {requiredFeatures}
      </p>

      <div className={styles.techStack}>
        <strong>Tech Stacks Used: </strong>
        <ul>{renderTechStacks()}</ul>
      </div>
    </div>
  );
};

export default PersonalProjectCard;
