import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showBackdropV3, hideBackdropV3 } from "../../../../../redux/slices/backdropSlice";
import { delayForMS } from "../../../../sample-promises";

const SampleV1 = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(async () => {
    try {
      dispatch(showBackdropV3());
      await delayForMS(1000);
    } catch (error) {
      console.error("Error in SampleV1 handleClick:", error);
    } finally {
      dispatch(hideBackdropV3());
    }
  }, [dispatch]);

  return (
    <div>
      <h3>SampleV1: Show BackdropV3</h3>
      <p>
        <strong>Description:</strong> This component shows a backdrop using the `showBackdropV3` action.
      </p>
      <button onClick={handleClick}>Show Backdrop</button>
    </div>
  );
};

export default SampleV1;
