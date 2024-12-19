import { useMemo, useState } from "react";
import APICreatorForm, { type APISubmitResponseProps } from "./APIRequestCreationForms";
import {
  getDetailsWithApiClient,
  getDetailsWithAxios,
  getDetailsWithFetch,
} from "./utilV1";

const APIResponseTester = ({
  httpStatusOptions,
  title,
  getDetails,
}: {
  httpStatusOptions: string[];
  title: string;
  getDetails: (props: APISubmitResponseProps) => Promise<{
    data: unknown;
    error: unknown;
  }>;
}) => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<unknown>();

  const handleSubmit = async ({ method, url }: APISubmitResponseProps) => {
    const { data, error } = await getDetails({ method, url });
    setData(data);
    setError(error);
  };

  return (
    <div>
      <h2>{title}</h2>
      <APICreatorForm
        httpStatusOptions={httpStatusOptions}
        onSubmit={handleSubmit}
      />
      <h2>Response</h2>
      <h3>Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h3>Error:</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};

export const ComponentTypes = {
  AxiosTester: "AxiosTester",
  ApiClientTester: "ApiClientTester",
  FetchTester: "FetchTester",
} as const;

export type ComponentTypeKey = keyof typeof ComponentTypes;

const ComponentDetails = {
  [ComponentTypes.AxiosTester]: {
    title: "API Axios Response Tester",
    getDetails: getDetailsWithAxios,
  },
  [ComponentTypes.ApiClientTester]: {
    title: "API Response Tester with apiClient.ts",
    getDetails: getDetailsWithApiClient,
  },
  [ComponentTypes.FetchTester]: {
    title: "API Fetch Response Tester",
    getDetails: getDetailsWithFetch,
  },
};

export const ConsolidatedAPIResponseTester = ({
  httpStatusOptions,
  componentType,
}: {
  httpStatusOptions: string[];
  componentType: ComponentTypeKey;
}) => {
  const componentDetails = useMemo(() => {
    // switch (componentType) {
    //   case ComponentTypes.AxiosTester:
    //     return {
    //       title: "API Axios Response Tester",
    //       getDetails: getDetailsWithAxios,
    //     };
    //   case ComponentTypes.ApiClientTester:
    //     return {
    //       title: "API Response Tester with apiClient.ts",
    //       getDetails: getDetailsWithApiClient,
    //     };
    //   case ComponentTypes.FetchTester:
    //     return {
    //       title: "API Fetch Response Tester",
    //       getDetails: getDetailsWithFetch,
    //     };
    //   default:
    //     return null;
    // }
    return ComponentDetails[componentType] || null;
  }, [componentType]);

  if (!componentDetails) {
    return (
      <div>
        Invalid value for componentType: {componentType}. Please check Component
        documentation.
      </div>
    );
  }

  return (
    <APIResponseTester
      httpStatusOptions={httpStatusOptions}
      title={componentDetails.title}
      getDetails={componentDetails.getDetails}
    />
  );
};
