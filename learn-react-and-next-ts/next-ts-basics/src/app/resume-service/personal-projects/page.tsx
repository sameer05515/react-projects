import React from "react";
import { personalProjectsWithIdList as personalProjects } from "@/components/playground-sub-components/project-information/common/utils/personal-projects";

const PersonalProjectsPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Personal Projects</h1>
      <ul style={styles.projectList}>
        {personalProjects?.map((project, index) => (
          <li key={index} style={styles.projectItem}>
            {project.name}
          </li>
        ))}
      </ul>
      {/* {personalProjects?JSON.stringify(personalProjects, null, 2):'null'} */}
    </div>
  );
};

// Inline styles for simplicity, you can move these to a CSS module if needed
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  projectList: {
    listStyleType: "none",
    padding: 0,
  },
  projectItem: {
    fontSize: "1.2rem",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
    color: "#444",
  },
};

export default PersonalProjectsPage;
