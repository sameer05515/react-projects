import React from "react";
import {
  isPersonalProject,
  ProjectProps,
} from "../../common/utils/types/data-type-definitions";
import JSONDataViewer from "@/components/common/JSONDataViewer";

type ProjectCardProps = {
  project: ProjectProps;
  onComapnyNameClick?: (linkedCompanyId: string) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onComapnyNameClick = () => {},
}) => {
  const isPersonalProj = isPersonalProject(project);
  return (
    <div style={styles.card}>
      <h3 style={styles.projectName}>{project.name}</h3>
      <p style={styles.companyName}>
        {isPersonalProj ? (
          <span>{`Personal Project location: ${project.projectLocation}`}</span>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => onComapnyNameClick(project.linkedCompanyId)}
          >{`Company: ${project.companyName}`}</span>
        )}
      </p>

      {/* {isPersonalProj && <PersonalProjectCard project={project} />} */}

      <JSONDataViewer metadata={{ project }} title="X-Ray for project data " />
    </div>
  );
};

// Example inline styles, you can move these to a CSS or module.css file
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    // backgroundColor: '#f9f9f9',
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  projectName: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  companyName: {
    margin: 0,
    fontSize: "14px",
    // color: '#555',
  },
};

export default ProjectCard;
