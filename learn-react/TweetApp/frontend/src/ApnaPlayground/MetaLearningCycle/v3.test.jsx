import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import MetaLearningCycleV3 from "./v3";

jest.mock("../../common/components/markdown-component/v7", () => ({
  __esModule: true,
  default: () => {
    const React = require("react");
    return React.createElement("div", { "data-testid": "md-section-stub" });
  },
}));

describe("MetaLearningCycleV3", () => {
  it("shows default title/description and updates on stage click", () => {
    render(<MetaLearningCycleV3 />);

    expect(screen.getByText("Meta-Learning Cycle")).toBeInTheDocument();
    expect(
      screen.getByText(/Click a stage to learn more\./i)
    ).toBeInTheDocument();

    // Click Discomfort stage to update title/description.
    fireEvent.click(screen.getByText("Discomfort"));

    // Title text and description text are updated; "Discomfort" exists multiple places,
    // so assert on the unique description sentence instead.
    expect(
      screen.getByText(
        /This is where you push yourself beyond your current abilities\./i
      )
    ).toBeInTheDocument();

    // Old default description should no longer be present.
    expect(
      screen.queryByText(/Click a stage to learn more\./i)
    ).not.toBeInTheDocument();

    // Markdown section is stubbed.
    expect(screen.getByTestId("md-section-stub")).toBeInTheDocument();
  });
});

