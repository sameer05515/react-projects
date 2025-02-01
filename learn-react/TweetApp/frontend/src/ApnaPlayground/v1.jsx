import React, { useMemo } from "react";
import {
  AiFillForward as NextIcon,
  AiFillBackward as PrevIcon,
} from "react-icons/ai";
import { NavLink, useSearchParams } from "react-router-dom";
import ToggleablePanel from "../common/components/toggleable-panel/ToggleablePanel";
import { componentNames, getComponentDetails } from "./utils";

const PlaygroundHeader = ({ param, next, prev }) => {
  return (
    <div
      style={{
        width: "95vw",
        display: "block",
        alignItems: "center",
        // justifyContent:"center"
      }}
    >
      {/* Top Title Section */}
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          fontWeight: "bold",
          paddingTop: "4px",
          paddingBottom: "4px",
          width: "100%",
        }}
      >
        <NavLink
          style={{ flex: 1, textAlign: "center" }}
          to={param ? "/apna-playground" : "/"}
        >
          {param ? "TESTING PAGE HOME" : "ROOT"}
        </NavLink>
      </div>

      {/* Navigation Header Section */}
      <header
        style={{
          display: "flex",
          color: "chocolate",
          backgroundColor: "lightblue",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {/* Previous Link */}
        {prev && (
          <NavLink
            to={`/apna-playground?tester=${prev}`}
            style={{
              flex: 1,
              textAlign: "left",
              fontSize: 10,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <PrevIcon style={{ marginRight: "4px" }} />
            <span>{prev}</span>
          </NavLink>
        )}

        {/* Current Route Info */}
        <span
          style={{
            flex: 3,
            textAlign: "center",
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          Current Tester: '{param || "None"}'
        </span>

        {/* Next Link */}
        {next && (
          <NavLink
            to={`/apna-playground?tester=${next}`}
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <span>{next}</span>
            <NextIcon style={{ marginLeft: "4px" }} />
          </NavLink>
        )}
      </header>

      {/* Description Section */}
      <ToggleablDescription />

      {/* Navigation Links for Component Names */}
      {!param && (
        <div
          style={{
            display: "block",
            justifyItems: "center",
            fontWeight: "bold",
            paddingTop: "4px",
            paddingBottom: "4px",
            width: "100%",
          }}
          // className="py-2 flex flex-col justify-center gap-4"
        >
          {componentNames.map((name) => (
            <NavLink
              key={name}
              to={`/apna-playground?tester=${name}`}
              // className="text-blue-600 dark:text-cyan-300 hover:underline font-medium text-sm"
              style={{ textAlign: "center" }}
            >
              <div>{name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const ApnaPlaygroundBaseV1 = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("tester") || "";

  const { Component, next, prev } = useMemo(() => {
    return getComponentDetails(param);
  }, [param]);
  return (
    <div
      style={{
        // backgroundColor: isDarkMode ? "black" : "white",
        // color: isDarkMode ? "white" : "black",
        paddingLeft: "25px",
        // paddingTop: "5px",
      }}
    >
      <div>
        <PlaygroundHeader param={param} next={next} prev={prev} />

        {/* <UseGlobalServiceProviderTestingV1 />

        <MiscellaneousExamples /> */}
        {Component && <Component />}
      </div>
    </div>
  );
};

const ToggleablDescription = () => (
  <ToggleablePanel showContent={false} title="Aim for Playground base compoent">
    <h1>Purpose: </h1>
    <ul>
      <li>
        To test any compoent (especially custom component, built within TweetApp
        ) independently
      </li>
    </ul>
  </ToggleablePanel>
);

export default ApnaPlaygroundBaseV1;
