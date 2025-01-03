import React, { useCallback } from "react";
import { convertToYesNo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsCustomBackdropV3Active,
  // v3,
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} from "../../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../../common/components/CustomBackdrop/v3";
import { delayForMS } from "../../../sample-promises";
import SampleV1 from "./samples/v1";
import SampleV2 from "./samples/v2";

const UsingCustomBackdropV3 = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsCustomBackdropV3Active);
  



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

  const loadInitialDataForModule = useCallback(
    async (moduleName) => {
      dispatch(showBackdropV3());
      try {
        /**
         * TO-DO:
         * 1. prepare message post validating it, give some default fallback value
         * */
        const backdropMessages = {
          title: `Loading Data for given module ${moduleName}`,
          subtitle:"",
          description:""
        };
        console.log("moduleName: " + moduleName);
        dispatch(updateBackdropV3(backdropMessages));
        const totalIterations = 9;
        for (let i = 1; i <= totalIterations; i++) {
          const subtitle = `Iteration Number: ${i} completed successfully!!`;
          // console.log(message);
          dispatch(updateBackdropV3({...backdropMessages, subtitle }));
          await delayForMS(3000); 
        }
        dispatch(
          updateBackdropV3({
            title: `Operation Completed successfully!!`,
            subtitle: "",
          })
        );
        await delayForMS(5000);
      } catch (error) {
      } finally {
        dispatch(hideBackdropV3());
      }
    },
    [dispatch]
  );

  return (
    <div>
      <h1>UsingCustomBackdropV3</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>
      <br />
      <SampleV1/>
      <br />
      <SampleV2/>

      <br />
      <button onClick={handleUpdateTitleWithDelay}>
        Update Title of BackdropV3: With delay of 5 seconds
      </button>

      <br />
      <button onClick={() => loadInitialDataForModule("Tweet App")}>
        Update Title of BackdropV3: <strong>Load initial data</strong> for a
        dummy module: With delay of 5 seconds
      </button>

      <CustomBackdropV3 />
    </div>
  );
};

export default UsingCustomBackdropV3;
