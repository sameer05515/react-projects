import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../redux/slices/backdropSlice";
import { getRandomNumber } from "../sample-promises";
import UsingCustomBackdropV3 from "./testers/UsingCustomBackdropV3";
// import CustomBackdropV3 from "../../../common/components/CustomBackdrop/v3";

const SamplePromiseTesterDashboard = () => {
  const dispatch = useDispatch();

  const handleRandomNumber = useCallback(async () => {
    dispatch(showBackdrop());
    const response = await getRandomNumber();
    console.log("getRandomNumber response: ", response);
    dispatch(hideBackdrop());
  }, [dispatch]);
  return (
    <div>
      <h1>SamplePromiseTesterDashboard</h1>

      <div>
        <button onClick={handleRandomNumber}>handleRandomNumber</button>
      </div>
      <hr />
      <UsingCustomBackdropV3 />
    </div>
  );
};

export default SamplePromiseTesterDashboard;
