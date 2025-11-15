import React from "react";
import { Outlet } from "react-router-dom";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";

const Details = () => {
  const {
    sharedData: { styles },
  } = useSharedConfigurations();

  return (
    <div
      style={{
        flex: 1,
        ...styles.greenBorder,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Details;
