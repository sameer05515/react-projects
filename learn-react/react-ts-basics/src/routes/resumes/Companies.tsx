import React from "react";
import { renderCard } from "../../common/components/custom-card/Card";
import { getAllCompanies, /**CompanyData*/ } from "../../common/util/resumes/companies/companies";

// Type for the response from getAllCompanies
// interface CompaniesResponse {
//   success: boolean;
//   data: CompanyData[];
//   messages: string[];
// }

const Companies: React.FC = () => {
  // Fetch companies data, ensure proper typing with `as CompaniesResponse`
  const response = getAllCompanies();
  
  // Handle the case where the response might be undefined
  if (!response) {
    return <div style={{ color: "red" }}>Error: No data returned from the API.</div>;
  }

  // Destructure and ensure safe access to properties
  const { success, data: companies, messages } = response;

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

  if (!companies || companies.length === 0) {
    return (
      <div style={{ color: "blue" }}>
        No companies found to display.
      </div>
    );
  }

  return (
    <div>
      <h1>Companies Viewer</h1>
      {renderCard({ title: "All Companies", objectToBeRendered: companies })}
    </div>
  );
};

export default Companies;
