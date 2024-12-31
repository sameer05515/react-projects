import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  // v3,
  showBackdropV3,
  hideBackdropV3,
  updateBackdropV3,
} from "../../../../../redux/slices/backdropSlice";
import { delayForMS } from "../../../../sample-promises";

const SampleV4 = () => {
  const dispatch = useDispatch();
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
          subtitle: "",
          description: "",
        };
        console.log("moduleName: " + moduleName);
        dispatch(updateBackdropV3(backdropMessages));
        const totalIterations = 9;
        for (let i = 1; i <= totalIterations; i++) {
          const subtitle = `Iteration Number: ${i} completed successfully!!`;
          // console.log(message);
          dispatch(updateBackdropV3({ ...backdropMessages, subtitle }));
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
      <h3>
        SampleV4: Update Title of BackdropV3: <strong>Load initial data</strong>{" "}
        for a dummy module: With delay of 5 seconds
      </h3>
      <p>
        <strong>Description:</strong> This component updates the title and
        subtitle in the backdrop using periodic updates.
      </p>
      <button onClick={() => loadInitialDataForModule("Tweet App")}>
        Start Operation
      </button>
    </div>
  );
};

export default SampleV4;
