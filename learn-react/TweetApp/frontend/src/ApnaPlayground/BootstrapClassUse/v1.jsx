import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillForward as NextIcon, AiFillBackward as PrevIcon } from "react-icons/ai";

const BootstrapClassUseV1 = () => {
  return (
    <div className="container-fluid py-4 px-3 mx-auto">
      <h1>Hello, from BootstrapClassUseV1!</h1>
      <div className="row">
        <div className="col">
          <NavLink
            // to={`/apna-playground?tester=${prev}`}
            className="row"
            // style={{
            //   flex: 1,
            //   textAlign: "left",
            //   fontSize: 10,
            //   display: "flex",
            //   justifyContent: "flex-start",
            // }}
          >
            <PrevIcon
            // style={{ marginRight: "4px" }}
            />
            <span>Prev</span>
          </NavLink>
        </div>
      </div>
      <button className="btn btn-primary">Primary button</button>
    </div>
  );
};

export default BootstrapClassUseV1;
