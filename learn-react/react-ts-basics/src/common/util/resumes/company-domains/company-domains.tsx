import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";
import { CompanyDomains } from "../initial-records";

interface CompanyDomainBasicDetails {
  name: string;
  about: string;
}

const CompanyDomainBasicDetails: Record<string, CompanyDomainBasicDetails> = {
  [CompanyDomains.Service_Based]: {
    name: "Service Based",
    about: `
  Service-based companies provide specialized services to their clients.  
  These services can include consulting, IT support, software development, and business process outsourcing.  
  They focus on meeting specific client requirements and often handle multiple projects simultaneously.`,
  },
  [CompanyDomains.Startup]: {
    name: "Startup",
    about: `
  Startups are newly established companies that aim to develop innovative products or services.  
  They typically operate in a fast-paced, dynamic environment with limited resources.  
  Startups focus on scalability, innovation, and disrupting traditional business models.`,
  },
  [CompanyDomains.Product_Based]: {
    name: "Product Based",
    about: `
  Product-based companies create and market their own software or hardware products.  
  They invest in research and development to build solutions that solve specific industry problems.  
  Examples include software tools, consumer electronics, and enterprise solutions.`,
  },
  [CompanyDomains.Telecom_Software_Domain]: {
    name: "Telecom Software Domain",
    about: `
  Companies in the telecom software domain focus on solutions for telecommunications.  
  This includes network management, communication platforms, and customer engagement systems.  
  These companies play a critical role in supporting global connectivity and data communication.`,
  },
  [CompanyDomains.Finance_Domain]: {
    name: "Finance Domain",
    about: `
  The finance domain encompasses companies providing financial services and solutions.  
  This includes banking software, investment platforms, insurance management systems, and fintech solutions.  
  They aim to improve financial transactions, risk management, and customer experiences.`,
  },
  [CompanyDomains.MSME_Domain]: {
    name: "MSME Domain",
    about: `
  MSME (Micro, Small, and Medium Enterprises) companies cater to smaller-scale businesses.  
  These firms often require cost-effective and scalable software solutions.  
  They focus on improving operational efficiency and enabling growth for small businesses.`,
  },
  [CompanyDomains.Educational_Software_Domain]: {
    name: "Educational Software Domain",
    about: `
  The educational software domain provides digital tools for learning and education management.  
  This includes learning management systems (LMS), e-learning platforms, and virtual classrooms.  
  Their aim is to enhance accessibility and effectiveness of education through technology.`,
  },
  [CompanyDomains.Procurement_Domain]: {
    name: "Procurement Domain",
    about: `
  The procurement domain specializes in software for supply chain and purchasing processes.  
  It helps organizations manage vendors, contracts, and inventory efficiently.  
  These companies enable cost-saving and better decision-making in procurement activities.`,
  },
};

export interface CompanyDomainData {
  uniqueId: string;
  name: string;
  about: string;
}

export const getComapnyDomainName = (uniqueId: string) =>
  CompanyDomainBasicDetails[uniqueId]?.name || "";

export const getCompanyDomainData = (
  uniqueId: string
): CompanyDomainData | null => {
  const details = CompanyDomainBasicDetails[uniqueId];
  if (!details) return null;
  return {
    uniqueId: uniqueId,
    ...details,
  };
};

export const getAllCompanyDomains = () => {
  let computedCompanies: CompanyDomainData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(CompanyDomains);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedCompanies = Object.values(CompanyDomains).reduce(
      (acc: CompanyDomainData[], uniqueId) => {
        const data = getCompanyDomainData(uniqueId);
        if (data) {
          acc.push(data);
        }
        return acc;
      },
      []
    );

    return { success: true, data: computedCompanies, messages: [] };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { success: false, data: [], messages: e.data };
    }
  }
};
