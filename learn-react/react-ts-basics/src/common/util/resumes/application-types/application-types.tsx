import { ApplicationTypes } from "../initial-records";
import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";

interface ApplicationTypeBasicDetails {
  name: string;
  about: string;
}

const ApplicationTypeBasicDetails: Record<string, ApplicationTypeBasicDetails> =
  {
    [ApplicationTypes.Desktop_Application]: {
      name: "Desktop Application",
      about: "",
    },
    [ApplicationTypes.Web_Application]: { name: "Web Application", about: "" },
    [ApplicationTypes.Mobile_Application]: {
      name: "Mobile Application",
      about: "",
    },
    [ApplicationTypes.ETL_Tool]: { name: "ETL Tool", about: "" },
    [ApplicationTypes.Reporting_Tool]: { name: "Reporting Tool", about: "" },
  };

export interface ApplicationTypeData {
  uniqueId: string;
  name: string;
  about: string;
}

export const getApplicationTypeName = (uniqueId: string) =>
  ApplicationTypeBasicDetails[uniqueId]?.name || "";

export const getApplicationTypeData = (
  uniqueId: string
): ApplicationTypeData | null => {
  const details = ApplicationTypeBasicDetails[uniqueId];
  if (!details) return null;
  return {
    uniqueId: uniqueId,
    ...details,
  };
};

export const getAllApplicationTypes = () => {
  let computedCompanies: ApplicationTypeData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(ApplicationTypes);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedCompanies = Object.values(ApplicationTypes).reduce(
      (acc: ApplicationTypeData[], uniqueId) => {
        const data = getApplicationTypeData(uniqueId);
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
