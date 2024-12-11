import React from "react";
import { renderCard } from "../../common/components/custom-card/Card";
import { getAllProjects } from "../../common/util/resumes/projects/projects";

// Type for the response from getAllCompanies
// interface CompaniesResponse {
//   success: boolean;
//   data: CompanyData[];
//   messages: string[];
// }

const Projects: React.FC = () => {
  // Fetch projects data, ensure proper typing with `as CompaniesResponse`
  const response = getAllProjects();
  
  // Handle the case where the response might be undefined
  if (!response) {
    return <div style={{ color: "red" }}>Error: No data returned from the API.</div>;
  }

  // Destructure and ensure safe access to properties
  const { success, data: projects, messages } = response;

  if (!success) {
    return (
      <>
        {messages && messages.length > 0 ? (
          messages.map((message: string, index: number) => (
            <div key={index} style={{ color: "red" }}>
              {message}
            </div>
          ))
        ) : (
          <div style={{ color: "red" }}>
            Error occurred, but detailed messages are missing. Please contact the administrator.
          </div>
        )}
      </>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div style={{ color: "blue" }}>
        No projects found to display.
      </div>
    );
  }

  return (
    <div>
      <h1>Projects Viewer</h1>
      {renderCard({ title: "All Projects", objectToBeRendered: projects })}
    </div>
  );
};

export default Projects;
