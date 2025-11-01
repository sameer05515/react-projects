// This file defines a React page used as a playground for testing custom components independently.
// Below is an explanation of the structure and logic implemented in the code.

import React, { useMemo } from "react";
// Importing navigation icons from react-icons
import {
  AiFillForward as NextIcon,
  AiFillBackward as PrevIcon,
} from "react-icons/ai";
import { NavLink, useSearchParams } from "react-router-dom";
// Importing a panel component that shows/hides its content
import ToggleablePanel from "../common/components/toggleable-panel/ToggleablePanel";
// Utilities: a list of component names and a function to get test component data
import { componentNames, getComponentDetails } from "./utils";

/**
 * Header component for navigation and orientation within the playground.
 * - Shows a link to "home" or "root"
 * - Includes previous and next navigation for sequential component testing
 * - Displays the current tester name (which component is selected)
 * - Renders all component names as links when not on a specific tester
 */
const PlaygroundHeader = ({ param, next, prev }) => {
  return (
    <div
      style={{
        width: "95vw",
        display: "block",
        alignItems: "center",
      }}
    >
      {/* Top bar: Home/root link */}
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

      {/* Navigation header: Previous, current, next links */}
      <header
        style={{
          display: "flex",
          color: "chocolate",
          backgroundColor: "lightblue",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {/* Previous tester navigation link, if available */}
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

        {/* Info about the currently selected component tester */}
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

        {/* Next tester navigation link, if available */}
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

      {/* Description of the playground's aim */}
      <ToggleablDescription />

      {/* If no component is currently selected, show links to all test components */}
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
        >
          {componentNames.map((name) => (
            <NavLink
              key={name}
              to={`/apna-playground?tester=${name}`}
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

/**
 * Main base component for the playground.
 * - Reads the "tester" query param to determine which component to show
 * - Use getComponentDetails() to obtain the selected component, along with previous and next for navigation
 * - Renders the PlaygroundHeader and the test component, if any
 */
const ApnaPlaygroundBaseV1 = () => {
  // Access router query parameters
  const [searchParams] = useSearchParams();
  // Read the component to test
  const param = searchParams.get("tester") || "";

  // Memoize the logic to fetch the actual tester component plus prev/next info
  const { Component, next, prev } = useMemo(() => {
    return getComponentDetails(param);
  }, [param]);

  return (
    <div
      style={{
        paddingLeft: "25px",
      }}
    >
      <div>
        {/* Navigation header */}
        <PlaygroundHeader param={param} next={next} prev={prev} />

        {/* Render the chosen tester component if one is selected */}
        {Component && <Component />}
      </div>
    </div>
  );
};

/**
 * This component renders a toggleable panel describing the aim of the playground.
 */
const ToggleablDescription = () => (
  <ToggleablePanel showContent={false} title="Aim for Playground base compoent">
    <h1>Purpose: </h1>
    <ul>
      <li>
        To test any component (especially custom components built within TweetApp) independently
      </li>
    </ul>
  </ToggleablePanel>
);

export default ApnaPlaygroundBaseV1;
