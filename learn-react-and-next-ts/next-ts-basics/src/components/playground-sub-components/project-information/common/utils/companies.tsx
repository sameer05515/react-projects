import { sortArrayByField } from "@/common/utils/common-utility-methods/array-functions";
import { companiesRawData } from "./companies-raw-data";
import { personalProjectsWithIdList } from "./personal-projects";
import {
  type ProjectProps,
  type CompanyProps,
  type PersonalProject,
} from "./types/data-type-definitions";

type CompanyProjectSemiProcessedDataProps = {
  name: string;
  uniqueId: string;
  linkedCompanyId: string;
  companyName: string;
  metadata: any;
};

type CompanySemiProcessedDataProps = {
  name: string;
  uniqueId: string;
  aboutCompany: string[];
  domainOfCompany: string[];
  companyWebsiteURL: string;
  overAllTenureWithDate: string;
  lastEmployeeCode: string;
  order: number;
  projects: CompanyProjectSemiProcessedDataProps[];
};

// Semi-process raw company data
const companiesSemiProcessedData: CompanySemiProcessedDataProps[] =
  companiesRawData.map((company) => {
    const { metadata } = company.processedDetails;

    const projects = company.projects.map((project) => {
      const { metadata: projMetadata } = project.processedDetails;
      return {
        name: project.name,
        uniqueId: project.uniqueId,
        linkedCompanyId: company.uniqueId,
        companyName: company.name,
        metadata: projMetadata,
      };
    });

    return {
      name: company.name,
      uniqueId: company.uniqueId,
      aboutCompany: metadata.aboutCompany,
      domainOfCompany: metadata.domainOfCompany,
      companyWebsiteURL: metadata.companyWebsiteURL,
      overAllTenureWithDate: metadata.overAllTenureWithDate,
      lastEmployeeCode: String(metadata.lastEmployeeCode), // Ensure string conversion
      order: metadata.order || 0,
      projects,
    };
  });

// Get all processed company data
export const getAllCompanyData = (): CompanyProps[] =>
  companiesSemiProcessedData.map(
    ({
      name,
      uniqueId,
      order,
      aboutCompany,
      companyWebsiteURL,
      overAllTenureWithDate,
      lastEmployeeCode,
    }) => ({
      name,
      uniqueId,
      order,
      aboutCompany,
      companyWebsiteURL,
      overAllTenureWithDate,
      lastEmployeeCode,
    })
  );

// Get all projects across companies
export const getAllProjects = (): ProjectProps[] => {
  const companyProjects: ProjectProps[] = companiesSemiProcessedData.flatMap(
    ({ projects }) =>
      projects.map(
        ({ name, uniqueId, linkedCompanyId, companyName, metadata }) => ({
          name,
          uniqueId,
          isPersonalProject: false,
          linkedCompanyId,
          companyName,
          metadata,
        })
      )
  );

  const sorted=sortArrayByField(personalProjectsWithIdList as PersonalProject[], 'projectLocation', true)

  const allProjects = [
    ...companyProjects.sort().reverse(),
    ...sorted,
  ];

  return allProjects;
};

// Get raw data for a specific company by its unique ID
export const getCompanyRawDataForUniqueId = (id: string) =>
  companiesRawData.find((company) => company.uniqueId === id) || null;

export const getCompanyDataForUniqueId = (id: string) =>
  companiesSemiProcessedData.find((company) => company.uniqueId === id) || null;
