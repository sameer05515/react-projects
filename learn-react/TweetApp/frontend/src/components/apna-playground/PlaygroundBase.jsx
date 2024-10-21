import React from "react";
import MiscellaneousExamples from "../miscelleneous/misc/MiscellaneousExamples";
import ToggleablePanel from "../../common/components/toggleable-panel/ToggleablePanel";
import useGlobalServiceProvider from "../../common/hooks/useGlobalServiceProvider";

const PlaygroundBase = () => {
  const { getNameValComponent, setNameVal } = useGlobalServiceProvider();
  return (
    <>
      <ToggleablePanel
        showContent={false}
        title="Aim for Playground base compoent"
      >
        <h1>Purpose: </h1>
        <ul>
          <li>
            To test any compoent (especially custom component, built within
            TweetApp ) independently
          </li>
        </ul>
      </ToggleablePanel>
      {getNameValComponent || "Empty name!!"}
      <button
        onClick={() =>
          setNameVal(
            "To test, If we can pass a reactjs jsx component from a custom hook_" +
            new Date().toString()
          )
        }
      >
        Set current date string to name val
      </button>
      <MiscellaneousExamples />
    </>
  );
};

export default PlaygroundBase;
