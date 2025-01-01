import React from "react";
import { convertToYesNo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCustomBackdropV3Active, showBackdropV3 } from "../../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../../common/components/CustomBackdrop/v3";

const UsingCustomBackdropV3 = () => {
  const dispatch = useDispatch(); 
  const isActive = useSelector(selectIsCustomBackdropV3Active);
  const handleClick=()=>{
    dispatch(showBackdropV3());
  }
  return (
    <div>
      <h1>UsingCustomBackdropV3</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>
      <br />
      <button onClick={handleClick}>Show BackdropV3</button>

      <CustomBackdropV3/>
    </div>
  );
};

export default UsingCustomBackdropV3;
