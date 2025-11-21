import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../../redux/slices/backdropSlice";
import { getRandomNumber } from "../../../sample-promises";

const UsingEarlierVersionsOfBackdrops = () => {
  const dispatch = useDispatch();
  const handleRandomNumber = useCallback(async () => {
    dispatch(showBackdrop());
    const response = await getRandomNumber();
    console.log("getRandomNumber response: ", response);
    dispatch(hideBackdrop());
  }, [dispatch]);

  // useEffect(() => {
  //   console.trace("I have been rendered!");
  //   return () => console.trace("I have been destroyed!");
  // },[]);
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
