import { ProjectProps } from "../common/utils/types/data-type-definitions";
import { getAllProjects } from "../common/utils/companies";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import ProjectListContainer from "../sub-components/project-list-container/ProjectListContainerV1_0_0";

const ProjectsDashboardV1_1_1 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const projectData: ProjectProps[] = getAllProjects();
  return (
    <div className={main}>
      <h1>ProjectsDashboardV1_1_0</h1>

      <JSONDataViewer metadata={{projectData}} title="projectData"/>
      
      <ProjectListContainer projects={projectData}/>
    </div>
  );
};

export default ProjectsDashboardV1_1_1;
