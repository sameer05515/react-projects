import { useEffect, useState } from "react";
import { apiRequest } from "../../common/utils/apiClient";
import {
  ComponentTypes,
  ConsolidatedAPIResponseTester,
} from "./APIResponseTesters";
import { getHttpStatusValuesUrl } from "../../common/constants/Global";

const Dashboard = () => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const fetchAllHttpStatusValues = async () => {
      const { data } = await apiRequest<null, string[]>({
        method: "get", // Ensure method is lowercase for Axios
        url: getHttpStatusValuesUrl,
      });
      if (data) {
        setData(data);
      }
    };

    fetchAllHttpStatusValues();
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>

      {/* {Object.keys(ComponentTypes).map((key, idx) => (
        <ConsolidatedAPIResponseTester
          key={`${idx + 1}`}
          httpStatusOptions={data}
          componentType={key as ComponentTypeKey}
        />
      ))} */}

      {[
        ComponentTypes.ApiClientTester,
        ComponentTypes.AxiosTester,
        ComponentTypes.FetchTester,
      ].map((key, idx) => (
        <ConsolidatedAPIResponseTester
          key={`${idx + 1}`}
          httpStatusOptions={data}
          componentType={key}
        />
      ))}
      {/* <ConsolidatedAPIResponseTester
        httpStatusOptions={data}
        componentType="FetchTester"
      />
      <ConsolidatedAPIResponseTester
        httpStatusOptions={data}
        componentType="AxiosTester"
      />
      <ConsolidatedAPIResponseTester
        httpStatusOptions={data}
        componentType="ApiClientTester"
      /> */}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
