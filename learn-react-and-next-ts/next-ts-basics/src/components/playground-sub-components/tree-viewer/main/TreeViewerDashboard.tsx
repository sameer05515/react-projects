import React, { useEffect, useState } from "react";
// import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV6"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_1";
import Tree from "../sub-component/Tree";

const urls = ["http://127.0.0.1:3003/topics"];

function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

interface TopicData {
  _id: string;
  parentId: string;
  name: string;
  uniqueId: string;
  children: TopicData[] | null;
}

const TreeViewerDashboard = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  
  const [result, setResult] = useState<TopicData[]>([]);

  const reload = () => {
    setResult(() => []);
    fetchGeneric<TopicData[]>(urls[getRandomNumberBetween0andGivenNumber(urls.length)])
      .then((resp) => {
        console.log("Success Response: ", resp);
        setResult(resp || []); // Type-safe assignment
      })
      .catch((err) => console.log("Error occurred: ", JSON.stringify(err, null, 2)));
  };

  return (
    <div className={`${main}`}>
      <h1>TreeViewerDashboard</h1>

      <button onClick={reload}>{"Fetch All Tweets"}</button>

      <JSONDataViewer metadata={{ result }} title="TreeViewerDashboard: Data X-ray" />

      {result.length > 0 && (
        <>
          <JSONDataViewer metadata={{ result }} title="Result from topic API" />
          <Tree data={result} areNodesDraggable /> 
        </>
      )}
    </div>
  );
};

export default TreeViewerDashboard;
