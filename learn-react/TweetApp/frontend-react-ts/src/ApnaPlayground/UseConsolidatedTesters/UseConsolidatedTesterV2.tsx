import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../redux/slices/backdropSlice";
import CustomBackdrop from "../../common/components/CustomBackdrop/v2";
import useConsolidated from "../../common/hooks/useConsolidated/archieved/v2";
import type { RootState, AppDispatch } from "../../redux/store";

const UseConsolidatedTesterV2 = () => {
  const isBackdropActive = useSelector((state: RootState) => state.backdrop.active);
  const dispatch: AppDispatch = useDispatch();
  const {
    fetchTaskDetailsForGivenId,
    getRandomNumber,
    doubleTheNumber,
    fetchAPIRequestWithUndefinedConfig,
  } = useConsolidated();

  const handleFetchTaskDetailsForGivenId = async () => {
    const { data, isError, message } = await fetchTaskDetailsForGivenId();
    console.log("Response received:", { data, isError, message });
  };

  const handleFetchAPIRequestWithUndefinedConfig = async () => {
    const { data, isError, message } =
      await fetchAPIRequestWithUndefinedConfig();
    console.log("Response received:", { data, isError, message });
  };

  const handleShowBackdrop = () => {
    dispatch(showBackdrop());
    setTimeout(() => {
      dispatch(hideBackdrop());
    }, 7000); // Auto-hide after 7 seconds
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
      <h1>UseConsolidatedTesterV2</h1>
      <button onClick={handleFetchTaskDetailsForGivenId}>
        Test: fetchTaskDetailsForGivenId
      </button>
      <br />
      <button onClick={handleGetRandomNumber}>Test: getRandomNumber</button>
      <br />
      <button onClick={handleFetchAPIRequestWithUndefinedConfig}>
        Test: fetchAPIRequestWithUndefinedConfig
      </button>
      <br />
      <div>
        <h1>Backdrop Example</h1>
        <button onClick={handleShowBackdrop}>Show Backdrop</button>
        <CustomBackdrop />
      </div>
    </div>
  );
};

export default UseConsolidatedTesterV2;
