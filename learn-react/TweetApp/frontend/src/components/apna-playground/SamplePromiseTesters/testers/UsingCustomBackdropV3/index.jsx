import React, { useCallback } from "react";
import { convertToYesNo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCustomBackdropV3Active,
  v3,
} from "../../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../../common/components/CustomBackdrop/v3";
import { createIntervalPromise, delayForMS } from "../../../sample-promises";

const UsingCustomBackdropV3 = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsCustomBackdropV3Active);
  const handleClick = useCallback(async () => {
    dispatch(v3.show());
    await delayForMS(1000);
    dispatch(v3.hide());
  }, [dispatch]);

  const handleUpdateTitle = useCallback(async () => {
    try {
      let itration = 0;
      await createIntervalPromise(
        () => {
          console.log(`Iteration Number: ${++itration}`);
        },
        3000,
        5
      );
      console.log("Interval completed!");
    } catch (error) {
      console.error("Error during interval:", error);
    }
  }, []);

  return (
    <div>
      <h1>UsingCustomBackdropV3</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>
      <br />
      <button onClick={handleClick}>Show BackdropV3</button>
      <br />
      <button onClick={handleUpdateTitle}>Update Title of BackdropV3</button>

      <CustomBackdropV3 />
    </div>
  );
};

export default UsingCustomBackdropV3;
