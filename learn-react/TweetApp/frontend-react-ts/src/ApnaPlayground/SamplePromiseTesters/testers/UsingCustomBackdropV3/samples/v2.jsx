import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} from "../../../../../redux/slices/backdropSlice";
import { createIntervalPromise, delayForMS } from "../../../../sample-promises";

const SampleV2 = () => {
  const dispatch = useDispatch();

  const handleUpdateTitle = useCallback(async () => {
    try {
      dispatch(showBackdropV3());
      dispatch(updateBackdropV3({ title: "Starting calculations" }));

      let iteration = 0;
      await createIntervalPromise(
        () => {
          const message = `Iteration Number: ${++iteration} completed successfully!`;
          console.log(message);
          dispatch(
            updateBackdropV3({ title: `Operation in progress: ${message}` })
          );
        },
        3000,
        5
      );

      console.log("All iterations completed!");
      await delayForMS(5000);
    } catch (error) {
      console.error("Error in SampleV2 handleUpdateTitle:", error);
      dispatch(
        updateBackdropV3({ title: "An error occurred during the operation." })
      );
    } finally {
      dispatch(hideBackdropV3());
    }
  }, [dispatch]);

  return (
    <div>
      <h3>SampleV2: Update BackdropV3 Title with Iterations</h3>
      <p>
        <strong>Description:</strong> This component updates the title in the
        backdrop using periodic updates.
      </p>
      <button onClick={handleUpdateTitle}>Start Operation</button>
    </div>
  );
};

export default SampleV2;
