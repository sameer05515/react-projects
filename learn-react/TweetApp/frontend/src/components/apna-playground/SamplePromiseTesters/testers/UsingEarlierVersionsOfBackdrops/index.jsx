import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../../../redux/slices/backdropSlice";
import { getRandomNumber } from "../../../sample-promises";

const UsingEarlierVersionsOfBackdrops = () => {
  const dispatch = useDispatch();
  const handleRandomNumber = useCallback(async () => {
    dispatch(showBackdrop());
    const response = await getRandomNumber();
    console.log("getRandomNumber response: ", response);
    dispatch(hideBackdrop());
  }, [dispatch]);
  return (
    <div>
      <h1>UsingEarlierVersionsOfBackdrops</h1>
      <div>
        <button onClick={handleRandomNumber}>handleRandomNumber</button>
      </div>      
    </div>
  );
};

export default UsingEarlierVersionsOfBackdrops;
