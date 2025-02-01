import React, { useCallback } from "react";
import useCGPTApis from "../../common/hooks/useCGPTApis/v2";
import useTopicManagementApis from "../../common/hooks/useTopicManagementApis/v1";
import useMemoryManagementApis from "../../common/hooks/useMemoryManagementApis/v1";

const UseConsolidatedTesterV4 = () => {
  // const consolidatedObject = useConsolidated();
  const {
    fetchAllCGPTFiles,
    fetchCGPTFileForGivenUniqueId,
    fetchCGPTFileForUIDAndConvUID,
    fetchCGPTFileForUIDAndConvUIDAndMsgUID,
  } = useCGPTApis();

  const { getSectionData } = useTopicManagementApis();
  const { getMemoryMap } = useMemoryManagementApis();

  const sampleFileId = "CONVERSATIONS_23_OCT_2024";
  const sampleConvId = "4b59e0cd-7922-411d-a6e5-0ac51b29087d";
  const sampleMsgId = "aaa23e00-2582-45e0-9066-80287b6b7f9f";

  const topicId = "1203d550-0351-4af0-a88f-a8d0b1d6ae21";
  const sectionId = "1670f51c-d661-4fe1-8d81-7798521e82d2";

  const memoryMapId = "cd6bb190-0e56-4e3a-8f01-748c8d05d9d4";

  // Generic handler for API calls
  const handleFetch = useCallback(async (fetchMethod) => {
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
  }, []);

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
            fetchCGPTFileForUIDAndConvUIDAndMsgUID(
              sampleFileId,
              sampleConvId,
              sampleMsgId
            )
          )
        }
      >
        Test : fetchCGPTFileForUIDAndConvUIDAndMsgUID : {sampleFileId} ,{" "}
        {sampleConvId} and {sampleMsgId}
      </button>

      <br />
      <button
        onClick={() => handleFetch(() => getSectionData(topicId, sectionId))}
      >
        Test : getSectionData : {topicId} , {sectionId}
      </button>

      <br />
      <button onClick={() => handleFetch(() => getMemoryMap(memoryMapId))}>
        Test : getMemoryMap : {memoryMapId}
      </button>
    </div>
  );
};

export default UseConsolidatedTesterV4;
