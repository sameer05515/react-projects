import { Companies, Projects as ProjectMap } from "../initial-records";
import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";



interface CompanyBasicDetails {
  name: string;
  previouslyKnownAs: string[];
  address: string;
  websiteUrl:string;
}

const CompanyBasicDetails: Record<string, CompanyBasicDetails> = {
  [Companies.GreenApple_WebWare]: {
    name: "GreenApple WebWare, New Delhi, India",
    previouslyKnownAs: [],
    address: "New Delhi, India",
    websiteUrl:'https://greenapplesolutions.com/'
  },
  [Companies.HCL_Infosystems]: {
    name: "HCL Infosystems Ltd, Noida, India",
    previouslyKnownAs: [],
    address: "Noida, India",
    websiteUrl:'https://www.hclinfosystems.in/'
  },
  [Companies.Novelvox]: {
    name: "Novelvox Software India Pvt Ltd, Faridabad, India",
    previouslyKnownAs: ["Integration Services & Technologies India PVT LTD"],
    address: "Faridabad, India",
    websiteUrl:'https://www.novelvox.com/'
  },
  [Companies.Concentrix]: {
    name: "Concentrix Daksh Services India Private Limited, Gurgaon, India",
    previouslyKnownAs: [],
    address: "Gurgaon, India",
    websiteUrl:'https://www.concentrix.com/'
  },
  [Companies.Dhani_Stocks]: {
    name: "Dhani stocks Limited, Gurgaon, India",
    previouslyKnownAs: ["Indiabulls security Ltd", "Indiabulls ventures ltd"],
    address: "Gurgaon, India",
    websiteUrl:'https://www.dhanistocks.com/'
  },
  [Companies.RSystems]: {
    name: "RSystems International Pvt Ltd, Noida, India",
    previouslyKnownAs: [],
    address: "Noida, India",
    websiteUrl:'https://www.rsystems.com/'
  },
  [Companies.EVC_Ventures]: {
    name: "EVC Ventures, Gurgaon, India",
    previouslyKnownAs: [],
    address: "Gurgaon, India",
    websiteUrl:'https://www.evc.ventures/'
  },
  [Companies.Zycus_Infotech]: {
    name: "Zycus Infotech Pvt. Ltd., Bangalore, India",
    previouslyKnownAs: [],
    address: "Bangalore, India",
    websiteUrl:'https://www.zycus.com/'
  },
};

interface CompanyProjects {
  [key: string]: string[];
}

const CompanyProjects: CompanyProjects = {
  [Companies.GreenApple_WebWare]: [ProjectMap.OSCART],
  [Companies.HCL_Infosystems]: [ProjectMap.CIPRUS],
  [Companies.Novelvox]: [
    ProjectMap.iAgent_4_0,
    ProjectMap.KnowledgeBase,
    ProjectMap.Survey,
  ],
  [Companies.Concentrix]: [
    ProjectMap.QAA,
    ProjectMap.Webdots,
    ProjectMap.Econvey,
    ProjectMap.Zetta,
    ProjectMap.ResolveJiffy,
    ProjectMap.UnI,
    ProjectMap.Gain_Manager,
    ProjectMap.GIP,
  ],
  [Companies.Dhani_Stocks]: [
    ProjectMap.ShubhWeb,
    ProjectMap.Notis_API,
    ProjectMap.Jasper_Reports,
    ProjectMap.KRA,
    ProjectMap.SFTP,
  ],
  [Companies.RSystems]: [ProjectMap.Ephesoft_Transact],
  [Companies.EVC_Ventures]: [ProjectMap.IITD_Admin],
  [Companies.Zycus_Infotech]: [ProjectMap.ESG_Lythouse],
};

export interface CompanyData {
  uniqueId: string;
  name: string;
  previouslyKnownAs: string[];
  address: string;
  projects: string[];
}

const prepareData = (): CompanyData[] => {
  return Object.values(Companies).map((uniqueId) => {
    const data: CompanyData = {
      uniqueId: uniqueId,
      projects: CompanyProjects[uniqueId],
      ...CompanyBasicDetails[uniqueId],
    };
    return data;
  });
};

export const getAllCompanies = () => {
  let computedCompanies: CompanyData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(Companies);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedCompanies = prepareData();

    return { success: true, data: computedCompanies, messages: [] };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { success: false, data: [], messages: e.data };
    }
  }
};
