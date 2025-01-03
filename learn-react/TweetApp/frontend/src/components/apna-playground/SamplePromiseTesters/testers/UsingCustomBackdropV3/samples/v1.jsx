import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  // v3,
  showBackdropV3,
  hideBackdropV3,
} from "../../../../../../redux/slices/backdropSlice";
import { delayForMS } from "../../../../sample-promises";

const description = `This component should show a backdrop with ' dispatch(showBackdropV3());' action, where no payload passed`;

const SampleV1 = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(async () => {
    dispatch(showBackdropV3());
    await delayForMS(1000);
    dispatch(hideBackdropV3());
  }, [dispatch]);
  return (
    <div>
      <h1>SampleV1: Show BackdropV3</h1>
      <strong>Description: </strong>
      <pre>{description}</pre>
      <button onClick={handleClick}>Show Result</button>
    </div>
  );
};

export default SampleV1;
