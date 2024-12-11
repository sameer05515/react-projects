import React from "react";
import { CompanyProps, ProjectProps } from "../common/utils/types/data-type-definitions";
import { getAllCompanyData, getAllProjects } from "../common/utils/companies";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import ProjectCard from "../sub-components/project-card/ProjectCardV1.0.0";
import JSONDataViewer from "@/components/common/JSONDataViewer";

const ProjectsDashboardV1_1_0 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const projectData: ProjectProps[] = getAllProjects();
  return (
    <div className={main}>
      <h1>ProjectsDashboardV1_1_0</h1>

      <JSONDataViewer metadata={{projectData}} title="projectData"/>

      {projectData.map((c) => (
        <ProjectCard key={c.uniqueId} project={c} />
      ))}
    </div>
  );
};

export default ProjectsDashboardV1_1_0;
