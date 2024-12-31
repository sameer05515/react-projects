import React from "react";
// import useConsolidated from "../../../common/hooks/useConsolidated/v4";
import useCGPTApis from "../../../common/hooks/useConsolidated/useCGPTApis/v2";

const UseConsolidatedTesterV4 = () => {
  // const consolidatedObject = useConsolidated();
  const {
    fetchAllCGPTFiles,
    fetchCGPTFileForGivenUniqueId,
    fetchCGPTFileForUIDAndConvUID,
    fetchCGPTFileForUIDAndConvUIDAndMsgUID
  } = useCGPTApis();

  const sampleFileId = "CONVERSATIONS_23_OCT_2024";
  const sampleConvId = "4b59e0cd-7922-411d-a6e5-0ac51b29087d";
  const sampleMsgId="aaa23e00-2582-45e0-9066-80287b6b7f9f";

  // Generic handler for API calls
  const handleFetch = async (fetchMethod) => {
    if (typeof fetchMethod !== "function") {
      console.error("Provided fetchMethod is not a function");
      return;
    }

    try {
      const { data, isError, message } = await fetchMethod();
      console.log("Response received:", { data, isError, message });
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  };

  return (
    <div>
      <h1>UseConsolidatedTesterV4</h1>
      {/* <button
        onClick={() =>
          handleFetch(consolidatedObject.fetchTaskDetailsForGivenId)
        }
      >
        Test: fetchTaskDetailsForGivenId
      </button>
      <button
        onClick={() =>
          handleFetch(consolidatedObject.fetchAPIRequestWithUndefinedConfig)
        }
      >
        Test: fetchAPIRequestWithUndefinedConfig
      </button> */}
      <br />
      <button onClick={() => handleFetch(fetchAllCGPTFiles)}>
        Test: fetchCGPTFiles
      </button>
      <br />
      <button
        onClick={() =>
          handleFetch(() => fetchCGPTFileForGivenUniqueId(sampleFileId))
        }
      >
        Test: fetchCGPTFileForGivenUniqueId: {sampleFileId}
      </button>
      <br />
      <button
        onClick={() =>
          handleFetch(() =>
            fetchCGPTFileForUIDAndConvUID(sampleFileId, sampleConvId)
          )
        }
      >
        Test : fetchCGPTFileForUIDAndConvUID : {sampleFileId} and {sampleConvId}
      </button>
      <br />
      <button
        onClick={() =>
          handleFetch(() =>
            fetchCGPTFileForUIDAndConvUIDAndMsgUID(sampleFileId, sampleConvId, sampleMsgId)
          )
        }
      >
        Test : fetchCGPTFileForUIDAndConvUIDAndMsgUID : {sampleFileId} , {sampleConvId} and {sampleMsgId}
      </button>
    </div>
  );
};

export default UseConsolidatedTesterV4;
