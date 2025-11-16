import React, { useMemo } from "react";

/**
 * Note: This component is no longer in active development. please use [v2.jsx](./v2.jsx)
 * 
*/

const CustomBackdropV1 = ({ shouldActive = "no" }) => {
  const isVisible = useMemo(() => {
    return shouldActive === "yes";
  }, [shouldActive]);

  if (!isVisible) return null;

  return <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[1000]"></div>;
};

export default CustomBackdropV1;
