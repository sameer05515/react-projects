import React from "react";
import useConsolidated from "../../common/hooks/useConsolidated/archieved/v3";

const UseConsolidatedTesterV3 = () => {
  const { fetchTaskDetailsForGivenId, getRandomNumber, doubleTheNumber } =
    useConsolidated();

  const handleFetchTaskDetailsForGivenId = async () => {
    const { data, isError, message } = await fetchTaskDetailsForGivenId();
    console.log("Response received:", { data, isError, message });
  };

  const handleGetRandomNumber = async () => {
    try {
      console.log("Starting fetch:", new Date());
      const { randomNumber: number } = await getRandomNumber();
      console.log("Received result at:", new Date());
      console.log(`Random number: ${number}`);
      const doubledNumber = await doubleTheNumber(number);
      console.log(`Doubled number: ${doubledNumber}`);
      const data = await fetchTaskDetailsForGivenId();
      console.log("Fetched task details:", data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <h1>UseConsolidatedTesterV3</h1>
      <button onClick={handleFetchTaskDetailsForGivenId}>
        Test: fetchTaskDetailsForGivenId
      </button>
      <br />
      <button onClick={handleGetRandomNumber}>Test: getRandomNumber</button>
    </div>
  );
};

export default UseConsolidatedTesterV3;
