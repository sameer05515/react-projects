import { DeploymentEnvironments } from "../initial-records";
import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";

interface DeploymentEnvironmentBasicDetails {
  name: string;
  about: string;
}

const DeploymentEnvironmentBasicDetails: Record<
  string,
  DeploymentEnvironmentBasicDetails
> = {
  [DeploymentEnvironments.On_Premise_Platform]: {
    name: "On Premise Platform",
    about: "",
  },
  [DeploymentEnvironments.AWS_Amazon_Web_Services]: {
    name: "AWS Amazon Web Services",
    about: "",
  },
  [DeploymentEnvironments.Microsoft_Azure_Cloud_Enviroment]: {
    name: "Microsoft Azure Cloud Enviroment",
    about: "",
  },
  [DeploymentEnvironments.GCP_Google_Cloud_Platform]: {
    name: "GCP Google Cloud Platform",
    about: "",
  },
  [DeploymentEnvironments.IBM_Cloud]: { name: "IBM Cloud", about: "" },
  [DeploymentEnvironments.OCI_Oracle_Cloud_Infrastructure]: {
    name: "OCI Oracle Cloud Infrastructure",
    about: "",
  },
  [DeploymentEnvironments.Alibaba_Cloud]: { name: "Alibaba Cloud", about: "" },
  [DeploymentEnvironments.Heroku_Salesforce_Cloud]: {
    name: "Heroku Salesforce Cloud",
    about: "",
  },
  [DeploymentEnvironments.DigitalOcean]: { name: "DigitalOcean", about: "" },
  [DeploymentEnvironments.Linode_Akamai]: { name: "Linode Akamai", about: "" },
  [DeploymentEnvironments.VMware_Cloud]: { name: "VMware Cloud", about: "" },
  [DeploymentEnvironments.Tencent_Cloud]: { name: "Tencent Cloud", about: "" },
  [DeploymentEnvironments.Rackspace]: { name: "Rackspace", about: "" },
  [DeploymentEnvironments.OpenStack_Private_Cloud_Platform]: {
    name: "OpenStack Private Cloud Platform",
    about: "",
  },
  [DeploymentEnvironments.SAP_Cloud_Platform]: {
    name: "SAP Cloud Platform",
    about: "",
  },
  [DeploymentEnvironments.Huawei_Cloud]: { name: "Huawei Cloud", about: "" },
  [DeploymentEnvironments.Nutanix_Xi_Cloud_Services]: {
    name: "Nutanix Xi Cloud Services",
    about: "",
  },
  [DeploymentEnvironments.Cloudflare_Workers]: {
    name: "Cloudflare Workers",
    about: "",
  },
  [DeploymentEnvironments.Red_Hat_OpenShift]: {
    name: "Red Hat OpenShift",
    about: "",
  },
  [DeploymentEnvironments.Vultr]: { name: "Vultr", about: "" },
  [DeploymentEnvironments.IBM_Bluemix]: { name: "IBM Bluemix", about: "" },
};

export interface DeploymentEnvironmentData {
  uniqueId: string;
  name: string;
  about: string;
}

export const getDeploymentEnvironmentName = (uniqueId: string) =>
  DeploymentEnvironmentBasicDetails[uniqueId]?.name || "";

export const getDeploymentEnvironmentData = (
  uniqueId: string
): DeploymentEnvironmentData | null => {
  const details = DeploymentEnvironmentBasicDetails[uniqueId];
  if (!details) return null;
  return {
    uniqueId: uniqueId,
    ...details,
  };
};

export const getAllDeploymentEnvironments = () => {
  let computedCompanies: DeploymentEnvironmentData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(DeploymentEnvironments);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedCompanies = Object.values(DeploymentEnvironments).reduce(
      (acc: DeploymentEnvironmentData[], uniqueId) => {
        const data = getDeploymentEnvironmentData(uniqueId);
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
