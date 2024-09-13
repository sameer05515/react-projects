import React, { useEffect, useState } from "react";
// import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV6"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_2";
import Tree from "../sub-component/TreeV2";

// Define the TopicData interface for state typing
interface TopicData {
  _id: string;
  parentId: string;
  name: string;
  uniqueId: string;
  children: TopicData[] | null;
}

const TreeViewerDashboardV3 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const [result, setResult] = useState<TopicData[]>([]);

  const reload = () => {
    setResult(() => []);

    // GraphQL query body needs to be properly structured
    const graphQLBody = {
      query: `
        query {
          getAllResumes {
            uniqueId
            introduction
            summary 
            processedDetails{
              rawText
              textType
              metadata
            }
            companies{
              uniqueId
              name
              projects {
                uniqueId
                name
              }
            }
            educations {
              uniqueId
              name
            }          
          }
        }
      `,
    };

    // Call the fetchGeneric function with properly structured GraphQL body
    fetchGeneric<TopicData[]>(
      'http://localhost:4000/graphql',
      {
        method: "POST",
        body: graphQLBody, // Send the GraphQL query
      }
    )
      .then((resp) => {
        console.log("Success Response: ", resp);
        setResult(resp || []); // Ensure the result is type-safe
      })
      .catch((err) => console.log("Error occurred: ", JSON.stringify(err, null, 2)));
  };

  return (
    <div className={`${main}`}>
      <h1>TreeViewerDashboardV3</h1>

      <button onClick={reload}>{"Fetch All Resumes"}</button>

      <JSONDataViewer
        metadata={{ result }}
        title="TreeViewerDashboardV3: Data X-ray"
      />

      {result.length > 0 && (
        <>
          {/* <JSONDataViewer metadata={{ result }} title="Result from topic API" /> */}
          {/* Uncomment if Tree component is ready */}
          {/* <Tree data={result} areNodesDraggable /> */}
        </>
      )}
    </div>
  );
};

export default TreeViewerDashboardV3;
