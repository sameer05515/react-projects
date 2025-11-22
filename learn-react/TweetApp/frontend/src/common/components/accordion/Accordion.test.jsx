import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./Accordion";

jest.mock("../editable-label/EditableLabel", () => {
  function MockEditableLabel({ text }) {
    return <span>{text}</span>;
  }
  return MockEditableLabel;
});

describe("Accordion", () => {
  it("shows title and toggles content on click", async () => {
    render(
      <Accordion title="Section A" isExpanded={false}>
        <p>Hidden body</p>
      </Accordion>
    );

    expect(screen.getByText("Section A")).toBeInTheDocument();
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(screen.getByText("Hidden body")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /section a/i }));
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument();
  });

  it("opens when isExpanded is true", () => {
    render(
      <Accordion title="Open" isExpanded>
        <span>Visible</span>
      </Accordion>
    );
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });
});
