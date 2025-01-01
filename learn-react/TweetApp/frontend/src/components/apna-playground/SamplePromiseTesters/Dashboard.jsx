import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBackdrop,
  selectIsCustomBackdropV3Active,
  showBackdrop,
} from "../../../redux/slices/backdropSlice";
import { getRandomNumber } from "../sample-promises";
// import CustomBackdropV3 from "../../../common/components/CustomBackdrop/v3";

const convertToYesNo = (value) => (!value ? "No" : "Yes");

const SamplePromiseTesterDashboard = () => {
  const dispatch = useDispatch();

  const isActive = useSelector(selectIsCustomBackdropV3Active);

  const handleRandomNumber = useCallback(async () => {
    dispatch(showBackdrop());
    const response = await getRandomNumber();
    console.log("getRandomNumber response: ", response);
    dispatch(hideBackdrop());
  }, [dispatch]);
  return (
    <div>
      <h1>SamplePromiseTesterDashboard</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>
      <div>
        <button onClick={handleRandomNumber}>handleRandomNumber</button>
      </div>
    </div>
  );
};

export default SamplePromiseTesterDashboard;
