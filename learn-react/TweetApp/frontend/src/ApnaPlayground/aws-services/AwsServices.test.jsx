import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import DesignPatternAccordion from "./DesignPatternAccordion";
import AwsCategoriesAccordion from "./AwsCategoriesAccordion";

describe("ApnaPlayground/aws-services", () => {
  it("opens DesignPatternAccordion and renders pattern names", () => {
    render(<DesignPatternAccordion />);

    expect(
      screen.getByRole("button", { name: /Creational Patterns/i })
    ).toBeInTheDocument();
    // By default, patterns aren't visible.
    expect(screen.queryByText("Singleton")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Creational Patterns/i }));
    expect(screen.getByText("Singleton")).toBeInTheDocument();
  });

  it("opens AwsCategoriesAccordion and renders service names", () => {
    render(<AwsCategoriesAccordion />);

    // Match the group button for "Compute" specifically (avoid matching other "compute" text in descriptions).
    const computeText = screen.getByText(/^Compute$/);
    const computeButton = computeText.closest("button");
    expect(computeButton).toBeInTheDocument();
    expect(screen.queryByText("Amazon EC2")).not.toBeInTheDocument();

    fireEvent.click(computeButton);
    expect(screen.getByText("Amazon EC2")).toBeInTheDocument();
  });
});

