import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonGroup from "./ButtonGroup";

jest.mock("../custom-button/CustomButton", () => {
  function MockButton({ children, onClick, title }) {
    return (
      <button type="button" title={title} onClick={onClick}>
        {children}
      </button>
    );
  }
  return MockButton;
});

describe("ButtonGroup", () => {
  it("renders one button per option and wires onClick", async () => {
    const a = jest.fn();
    const b = jest.fn();
    render(
      <ButtonGroup
        options={[
          { id: "1", children: "One", onClick: a },
          { id: "2", children: "Two", onClick: b, title: "Second" },
        ]}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "One" }));
    expect(a).toHaveBeenCalled();
    expect(b).not.toHaveBeenCalled();

    expect(screen.getByTitle("Second")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Two" }));
    expect(b).toHaveBeenCalled();
  });

  it("uses column layout classes when orientation is column", () => {
    const { container } = render(
      <ButtonGroup options={[{ children: "Solo", onClick: () => {} }]} orientation="column" />
    );
    expect(container.firstChild).toHaveClass("flex-col");
  });
});
