import React from "react";
import useGlobalServiceProvider from "../../common/hooks/useGlobalServiceProvider";

const UseGlobalServiceProviderTestingV1 = () => {
  const { getNameValComponent, setNameVal } = useGlobalServiceProvider();
  return (
    <div>
      <h1>UseGlobalServiceProviderTestingV1</h1>
      {getNameValComponent || "Empty name!!"}
      <br />
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
    </div>
  );
};

export default UseGlobalServiceProviderTestingV1;
