import React, { useEffect, useRef, useState } from "react";
import {
  isPersonalProject,
  type CompanyProps,
  type ProjectProps,
} from "../../common/utils/types/data-type-definitions";
import styles from "./ProjectListContainer.module.css"; // CSS module
import ProjectCard from "../project-card/ProjectCardV1.0.0";
import { getCompanyDataForUniqueId } from "../../common/utils/companies";
import CompanyCardWithModal from "../company-card/with-modal/CompanyCardWithModal";
import PersonalProjectCard from "@/components/resume-service-sub-components/PersonalProjectCard";

type ProjectListContainerProps = {
  projects: ProjectProps[];
};

const ProjectListContainer: React.FC<ProjectListContainerProps> = ({
  projects,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(
    null
  );

  const selectedElementRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  }, [selectedProject]);

  const handleProjectClick = (project: ProjectProps) => {
    setSelectedProject(project);
  };

  const openCompanyPopup = (linkedCompanyId: string) => {
    const comp = getCompanyDataForUniqueId(linkedCompanyId);
    setSelectedCompany(comp);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  const isPersonalProj = selectedProject && isPersonalProject(selectedProject);

  const traverse = (increment = 0) => {
    if (selectedProject) {
      const currentIndex = projects.findIndex(
        (p) => p.uniqueId === selectedProject.uniqueId
      );
      if (currentIndex >= 0) {
        const nextIndex =
          (currentIndex + increment + projects.length) % projects.length;
        setSelectedProject(() => projects[nextIndex]);
      }
    }
  };

  const getBifurcatedString = (): string => {
    const { offProjCount, persnlActiveCount } = projects.reduce(
      (acc, p) => {
        if (!p.isPersonalProject) acc.offProjCount++;
        if (p.isPersonalProject && p.isActiveDevelopmentGoingOn)
          acc.persnlActiveCount++;
        return acc;
      },
      { offProjCount: 0, persnlActiveCount: 0 }
    );

    const personalProjCount = projects.length - offProjCount;

    return `Official: ${offProjCount}, Personal: ${personalProjCount} {${persnlActiveCount} projects in active development}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.projectList}>
        <span title={getBifurcatedString()}>
          <b>Total projects: {projects.length}</b>
        </span>
        <ul>
          {projects.map((project) => (
            <li
              key={project.uniqueId}
              className={`${styles.projectItem} ${
                selectedProject?.uniqueId === project.uniqueId
                  ? styles.projectItemSelected
                  : ""
              }`}
              onClick={() => handleProjectClick(project)}
            >
              <span
                ref={
                  selectedProject?.uniqueId === project.uniqueId
                    ? selectedElementRef
                    : null
                }
              >
                {project.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.projectDetails}>
        {selectedProject && (
          <>
            <span className={styles.prevButton} onClick={() => traverse(-1)}>
              {"<<"}
            </span>
            <span className={styles.nextButton} onClick={() => traverse(1)}>
              {">>"}
            </span>
          </>
        )}

        {selectedProject ? (
          isPersonalProj ? (
            <div>
              <h3>{selectedProject.companyName}</h3>
              <p>
                This is a personal project: {selectedProject.name} <br />
                <span>{`Personal Project location: ${selectedProject.projectLocation}`}</span>
              </p>

              <PersonalProjectCard project={selectedProject} />
            </div>
          ) : (
            <ProjectCard
              project={selectedProject}
              onComapnyNameClick={openCompanyPopup}
            />
          )
        ) : (
          <p className={styles.message}>Please select a project</p>
        )}

        {selectedCompany && (
          <CompanyCardWithModal
            company={selectedCompany}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectListContainer;
