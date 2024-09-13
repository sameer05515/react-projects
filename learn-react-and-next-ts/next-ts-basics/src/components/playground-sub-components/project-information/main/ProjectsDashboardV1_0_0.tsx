import React from "react";
import { CompanyProps } from "../common/utils/types/data-type-definitions";
import { getAllCompanyData } from "../common/utils/companies";
import CompanyCardV1_0_0 from "../sub-components/company-card/CompanyCardV1_0_0";

const ProjectsDashboardV1_0_0 = () => {
  const companyData: CompanyProps[] = getAllCompanyData();
  return (
    <div>
      <h1>ProjectsDashboard</h1>

      {companyData.map((c) => (
        <CompanyCardV1_0_0 key={c.uniqueId} company={c} />
      ))}
    </div>
  );
};

export default ProjectsDashboardV1_0_0;
