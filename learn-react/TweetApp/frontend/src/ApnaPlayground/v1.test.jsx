import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../common/components/toggleable-panel/ToggleablePanel", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ title }) =>
      React.createElement(
        "div",
        { "data-testid": "toggleable-panel" },
        title
      ),
  };
});

import ApnaPlaygroundV1 from "./v1";

describe("ApnaPlayground/v1", () => {
  it("renders ROOT + list of component links when no tester query param is provided", () => {
    render(
      <MemoryRouter initialEntries={["/apna-playground"]}>
        <ApnaPlaygroundV1 />
      </MemoryRouter>
    );

    expect(screen.getByText("ROOT")).toBeInTheDocument();
    expect(screen.getByTestId("toggleable-panel")).toBeInTheDocument();

    // Shows a default tester label + link list
    expect(screen.getByText(/Current Tester:\s*'None'/i)).toBeInTheDocument();

    // Should show some registry keys as navigation links
    expect(screen.getByRole("link", { name: /MetaLearningCycle/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /MyFormWithValidation/i })
    ).toBeInTheDocument();
  });

  it("renders header for an unknown tester without crashing (no lazy demo render)", () => {
    render(
      <MemoryRouter initialEntries={["/apna-playground?tester=UnknownDemo"]}>
        <ApnaPlaygroundV1 />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Current Tester:\s*'UnknownDemo'/i)
    ).toBeInTheDocument();

    // When a tester is selected, the component link list should not be shown.
    expect(
      screen.queryByRole("link", { name: /MetaLearningCycle/i })
    ).not.toBeInTheDocument();

    // No demo is rendered for unknown tester (LazyComponent is null)
    expect(screen.queryByTestId(/apna-playground-demo/i)).not.toBeInTheDocument();
  });
});

