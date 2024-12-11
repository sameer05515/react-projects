import React from "react";
import { CompanyProps } from "../common/utils/types/data-type-definitions";
import { getAllCompanyData } from "../common/utils/companies";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import CompanyList from "../sub-components/company-list/CompanyList";

const ProjectsDashboardV1_0_2 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const companyData: CompanyProps[] = getAllCompanyData();
  return (
    <div className={main}>
      <h1>ProjectsDashboard</h1>
      <CompanyList companies={companyData}/>
    </div>
  );
};

export default ProjectsDashboardV1_0_2;
