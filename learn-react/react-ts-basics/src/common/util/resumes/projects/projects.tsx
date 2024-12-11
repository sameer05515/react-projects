import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";
import {
  ApplicationTypes,
  ArchitecturalStyles,
  Companies,
  DeploymentEnvironments,
  Projects,
} from "../initial-records";

interface ProjectBasicDetails {
  name: string;
  company: string;
  applicationType: string;
  deploymentEnvironment: string;
}

const ProjectBasicDetails: Record<string, ProjectBasicDetails> = {
  [Projects.OSCART]: {
    name: "Online Shopping Cart",
    company: Companies.GreenApple_WebWare,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.CIPRUS]: {
    name: "CIPA/CIPRUS",
    company: Companies.HCL_Infosystems,
    applicationType: ApplicationTypes.Desktop_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.iAgent_4_0]: {
    name: "iAgent 4.0",
    company: Companies.Novelvox,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Survey]: {
    name: "Survey",
    company: Companies.Novelvox,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.KnowledgeBase]: {
    name: "Knowledge Base",
    company: Companies.Novelvox,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.QAA]: {
    name: "QAA (Quantitative Analysis Application)",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Webdots]: {
    name: "Webdots",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Econvey]: {
    name: "eConvey",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Zetta]: {
    name: "Zetta",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.AWS_Amazon_Web_Services,
  },
  [Projects.ResolveJiffy]: {
    name: "ResolveJiffy",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.UnI]: {
    name: "UnI",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Gain_Manager]: {
    name: "Gain Manager",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.GIP]: {
    name: "GIP",
    company: Companies.Concentrix,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.AWS_Amazon_Web_Services,
  },
  [Projects.ZVR4]: {
    name: "ZVR4",
    company: "",
    applicationType: ApplicationTypes.ETL_Tool,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.ShubhWeb]: {
    name: "ShubhWeb",
    company: Companies.Dhani_Stocks,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Notis_API]: {
    name: "Notis API",
    company: Companies.Dhani_Stocks,
    applicationType: ApplicationTypes.ETL_Tool,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Jasper_Reports]: {
    name: "Jasper Reports",
    company: Companies.Dhani_Stocks,
    applicationType: ApplicationTypes.Reporting_Tool,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.KRA]: {
    name: "KRA",
    company: Companies.Dhani_Stocks,
    applicationType: ApplicationTypes.ETL_Tool,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.SFTP]: {
    name: "SFTP",
    company: Companies.Dhani_Stocks,
    applicationType: ApplicationTypes.ETL_Tool,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.TReDS]: {
    name: "TReDS",
    company: "",
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment:DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.Ephesoft_Transact]: {
    name: "Ephesoft Transact",
    company: Companies.RSystems,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.AWS_Amazon_Web_Services,
  },
  [Projects.IITD_Admin]: {
    name: "IITD Admin",
    company: Companies.EVC_Ventures,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.On_Premise_Platform,
  },
  [Projects.ESG_Lythouse]: {
    name: "ESG Lythouse",
    company: Companies.Zycus_Infotech,
    applicationType: ApplicationTypes.Web_Application,
    deploymentEnvironment: DeploymentEnvironments.AWS_Amazon_Web_Services,
  },
};

const ProjectAbout: Record<string, string> = {
  [Projects.OSCART]: "",
  [Projects.CIPRUS]: "",
  [Projects.iAgent_4_0]: "",
  [Projects.Survey]: "",
  [Projects.KnowledgeBase]: "",
  [Projects.QAA]: "",
  [Projects.Webdots]: "",
  [Projects.Econvey]: "",
  [Projects.Zetta]: "",
  [Projects.ResolveJiffy]: "",
  [Projects.UnI]: "",
  [Projects.Gain_Manager]: "",
  [Projects.GIP]: "",
  [Projects.ZVR4]: "",
  [Projects.ShubhWeb]: "",
  [Projects.Notis_API]: "",
  [Projects.Jasper_Reports]: "",
  [Projects.KRA]: "",
  [Projects.SFTP]: "",
  [Projects.TReDS]: "",
  [Projects.Ephesoft_Transact]: "",
  [Projects.IITD_Admin]: "",
  [Projects.ESG_Lythouse]: "",
};

const ProjectArchitecturalStyles: Record<string, string[]> = {
  [Projects.OSCART]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
    ArchitecturalStyles.Client_Server_Architecture,
  ],
  [Projects.CIPRUS]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.iAgent_4_0]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
    ArchitecturalStyles.Client_Server_Architecture,
  ],
  [Projects.Survey]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
    ArchitecturalStyles.Client_Server_Architecture,
  ],
  [Projects.KnowledgeBase]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
    ArchitecturalStyles.Client_Server_Architecture,
  ],
  [Projects.QAA]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Webdots]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Econvey]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Zetta]: [ArchitecturalStyles.Microservices_Architecture],
  [Projects.ResolveJiffy]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
  ],
  [Projects.UnI]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Gain_Manager]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
  ],
  [Projects.GIP]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.ZVR4]: [ArchitecturalStyles.Monolithic_Architecture],
  [Projects.ShubhWeb]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Notis_API]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Jasper_Reports]: [
    ArchitecturalStyles.Monolithic_Modular_Architecture,
  ],
  [Projects.KRA]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.SFTP]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.TReDS]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.Ephesoft_Transact]: [
    ArchitecturalStyles.Microservices_Architecture,
  ],
  [Projects.IITD_Admin]: [ArchitecturalStyles.Monolithic_Modular_Architecture],
  [Projects.ESG_Lythouse]: [ArchitecturalStyles.Microservices_Architecture],
};

interface TechStackWithPurpose {
  techStackUID: string;
  purpose: string[];
}

const ProjectTechStackWithPurpose: Record<string, TechStackWithPurpose[]> = {
  [Projects.OSCART]: [],
  [Projects.CIPRUS]: [],
  [Projects.iAgent_4_0]: [],
  [Projects.Survey]: [],
  [Projects.KnowledgeBase]: [],
  [Projects.QAA]: [],
  [Projects.Webdots]: [],
  [Projects.Econvey]: [],
  [Projects.Zetta]: [],
  [Projects.ResolveJiffy]: [],
  [Projects.UnI]: [],
  [Projects.Gain_Manager]: [],
  [Projects.GIP]: [],
  [Projects.ZVR4]: [],
  [Projects.ShubhWeb]: [],
  [Projects.Notis_API]: [],
  [Projects.Jasper_Reports]: [],
  [Projects.KRA]: [],
  [Projects.SFTP]: [],
  [Projects.TReDS]: [],
  [Projects.Ephesoft_Transact]: [],
  [Projects.IITD_Admin]: [],
  [Projects.ESG_Lythouse]: [],
};

export interface ProjectData {
  uniqueId: string;
  name: string;
  company: string;
  about: string;
  techStacks: TechStackWithPurpose[];
  architecturalStyles: string[];
  deploymentEnvironment: string;
}

const prepareData = (): ProjectData[] => {
  return Object.values(Projects).map((uniqueId) => {
    const data: ProjectData = {
      uniqueId: uniqueId,
      about: ProjectAbout[uniqueId],
      techStacks: ProjectTechStackWithPurpose[uniqueId],
      architecturalStyles: ProjectArchitecturalStyles[uniqueId],
      ...ProjectBasicDetails[uniqueId],
    };
    return data;
  });
};

export const getAllProjects = () => {
  let computedProjects: ProjectData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(Projects);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedProjects = prepareData();

    return { success: true, data: computedProjects, messages: [] };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { success: false, data: [], messages: e.data };
    }
  }
};
