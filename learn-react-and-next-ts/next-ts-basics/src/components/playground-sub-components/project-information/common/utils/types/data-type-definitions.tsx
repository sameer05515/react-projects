// import { PersonalProjectsSemiProcessedDataProps } from "../personal-projects";

export type TechStackProps = {
  name: string;
  type: "FRONTEND" | "BACKEND" | "FE_BE_BOTH" | "DEVOPS" | "DATABASE";
  dependsOn: TechStackProps[];
};

export enum ArchitecturalStyles {
  Monolithic = "Monolithic",
  MonolithicModular = "Monolithic Modular",
  Microservice = "Microservice",
  Serverless = "Serverless",
  EventDriven = "Event-Driven",
  ServiceOriented = "Service-Oriented Architecture (SOA)",
  Layered = "Layered Architecture",
  ComponentBased = "Component-Based Architecture",
  CQRS = "Command Query Responsibility Segregation (CQRS)",
}

export enum SoftwareDevelopmentMethodologies {
  Agile = "Agile",
  Scrum = "Scrum",
  Waterfall = "Waterfall",
  Kanban = "Kanban",
  Lean = "Lean",
  DevOps = "DevOps",
  ExtremeProgramming = "Extreme Programming",
  FeatureDrivenDevelopment = "Feature-Driven Development",
  Spiral = "Spiral",
}

//=====================================================

export type CompanyProps = {
  uniqueId: string;
  name: string;
  order: number;
  aboutCompany: string[];
  companyWebsiteURL: string;
  overAllTenureWithDate: string;
  lastEmployeeCode: string;
};

export type PersonalProject = {
  isPersonalProject: true;
  name: string;
  uniqueId: string;
  companyName: "Personal Project";
  projectType:
    | "FRONTEND"
    | "BACKEND"
    | "COMMAND-LINE-UTILITY"
    | "MONOLITHIC-WEB-APPLICATION";
  isActiveDevelopmentGoingOn: boolean;
  projectLocation: string;
  purpose: string;
  requiredFeatures: string;
  techStacksUsed: (TechStackProps | string)[];
  developmentHistory: string;
};

export type ProfessionalProject = {
  isPersonalProject: false;
  name: string;
  uniqueId: string;
  linkedCompanyId: string; // Corrected typo
  companyName: string;
  metadata: any;
};

export type ProjectProps = PersonalProject | ProfessionalProject; // Union type for projects

export const isPersonalProject = (proj: ProjectProps): proj is PersonalProject =>{
    return proj.isPersonalProject;
}
