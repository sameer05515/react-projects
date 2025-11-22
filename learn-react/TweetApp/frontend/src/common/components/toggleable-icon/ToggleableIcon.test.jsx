import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleableIcon from "./ToggleableIcon";

describe("ToggleableIcon", () => {
  it("calls onToggle when clicked", async () => {
    const onToggle = jest.fn();
    render(
      <ToggleableIcon
        label="Panel"
        isContentVisible={false}
        onToggle={onToggle}
        toggleSymbols={{ showSymbol: "▶", hideSymbol: "▼" }}
      />
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows hide symbol and title when content visible", () => {
    render(
      <ToggleableIcon
        label="Details"
        isContentVisible
        onToggle={() => {}}
        toggleSymbols={{ showSymbol: "+", hideSymbol: "−" }}
      />
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("title", "Hide Details");
    expect(btn).toHaveTextContent("−");
  });

  it("shows show symbol when content hidden", () => {
    render(
      <ToggleableIcon
        label="Menu"
        isContentVisible={false}
        onToggle={() => {}}
      />
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("title", "Show Menu");
    expect(btn).toHaveTextContent("+");
  });
});
