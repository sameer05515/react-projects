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
    <div className="w-[95vw] block items-center">
      {/* Top bar: Home/root link */}
      <div className="flex items-center font-bold py-1 w-full">
        <NavLink
          className="flex-1 text-center hover:underline"
          to={param ? "/apna-playground" : "/"}
        >
          {param ? "TESTING PAGE HOME" : "ROOT"}
        </NavLink>
      </div>

      {/* Navigation header: Previous, current, next links */}
      <header className="flex text-[chocolate] bg-blue-200 items-center w-full">
        {/* Previous tester navigation link, if available */}
        {prev && (
          <NavLink
            to={`/apna-playground?tester=${prev}`}
            className="flex-1 text-left text-[10px] flex justify-start items-center hover:underline"
          >
            <PrevIcon className="mr-1" />
            <span>{prev}</span>
          </NavLink>
        )}

        {/* Info about the currently selected component tester */}
        <span className="flex-[3] text-center text-[13px] font-bold">
          Current Tester: '{param || "None"}'
        </span>

        {/* Next tester navigation link, if available */}
        {next && (
          <NavLink
            to={`/apna-playground?tester=${next}`}
            className="flex-1 text-right text-[10px] flex items-center justify-end hover:underline"
          >
            <span>{next}</span>
            <NextIcon className="ml-1" />
          </NavLink>
        )}
      </header>

      {/* Description of the playground's aim */}
      <ToggleablDescription />

      {/* If no component is currently selected, show links to all test components */}
      {!param && (
        <div className="block items-center font-bold py-1 w-full">
          {componentNames.map((name) => (
            <NavLink
              key={name}
              to={`/apna-playground?tester=${name}`}
              className="text-center block hover:underline"
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
    <div className="pl-6">
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
