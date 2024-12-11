import React from "react";
import { CompanyProps } from "../common/utils/types/data-type-definitions";
import { getAllCompanyData } from "../common/utils/companies";
import CompanyCard from "../sub-components/company-card/CompanyCardV1_0_1";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const ProjectsDashboardV1_0_1 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const companyData: CompanyProps[] = getAllCompanyData();
  return (
    <div className={main}>
      <h1>ProjectsDashboard</h1>

      {companyData.map((c) => (
        <CompanyCard key={c.uniqueId} company={c} />
      ))}
    </div>
  );
};

export default ProjectsDashboardV1_0_1;
