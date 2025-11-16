import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  // v3,
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} from "../../../../../redux/slices/backdropSlice";
import { delayForMS } from "../../../../sample-promises";

const SampleV3 = () => {
  const dispatch = useDispatch();
  const handleUpdateTitleWithDelay = useCallback(async () => {
    dispatch(showBackdropV3());
    try {
      for (let i = 1; i <= 3; i++) {
        const message = `Iteration Number: ${i} completed successfully!!`;
        console.log(message);
        dispatch(
          updateBackdropV3({ title: `Operation in progress: ${message}` })
        );
        await delayForMS(5000);
      }
      dispatch(
        updateBackdropV3({ title: `Operation Completed successfully!!` })
      );
      await delayForMS(5000);
    } catch (error) {
    } finally {
      dispatch(hideBackdropV3());
    }
  }, [dispatch]);
  return (
    <div>
      
      <h3>SampleV3: Update Title of BackdropV3: With delay of 5 seconds</h3>
      <p>
        <strong>Description:</strong> This component updates the title in the
        backdrop using periodic updates.
      </p>
      <button onClick={handleUpdateTitleWithDelay}>
      Start Operation
      </button>
    </div>
  );
};

export default SampleV3;
