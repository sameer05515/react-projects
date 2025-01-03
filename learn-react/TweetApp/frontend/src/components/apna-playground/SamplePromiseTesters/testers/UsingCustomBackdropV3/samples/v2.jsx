import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  // v3,
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} from "../../../../../../redux/slices/backdropSlice";
import { createIntervalPromise, delayForMS } from "../../../../sample-promises";

const description = `This component should show title set in backdrop`;
const SampleV2 = () => {
  const dispatch = useDispatch();
  const handleUpdateTitle = useCallback(async () => {
    dispatch(showBackdropV3());
    dispatch(updateBackdropV3({ title: "Starting calculations" }));
    try {
      let itration = 0;
      await createIntervalPromise(
        () => {
          const message = `Iteration Number: ${++itration} completed successfully!!`;
          console.log(message);
          dispatch(
            updateBackdropV3({ title: `Operation in progress: ${message}` })
          );
        },
        3000,
        5
      );
      console.log("Interval completed!");
      await delayForMS(5000);
      // dispatch(v3.hide());
    } catch (error) {
      console.error("Error during interval:", error);
    } finally {
      dispatch(hideBackdropV3());
    }
  }, [dispatch]);
  return (
    <div>
      <h1>SampleV2: Update Title of BackdropV3: With setInterval</h1>
      <strong>Description: </strong>
      <pre>{description}</pre>
      <button onClick={handleUpdateTitle}>Show Result</button>
    </div>
  );
};

export default SampleV2;
