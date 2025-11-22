import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import HoverableSpan from "./HoverableSpan";

describe("common/components/hoverable-span/HoverableSpan", () => {
  it("calls onClick and toggles hovered class on mouse enter/leave", () => {
    const onClick = jest.fn();
    render(
      <HoverableSpan onClick={onClick} isSelected={false}>
        Hover me
      </HoverableSpan>
    );

    const el = screen.getByText(/Hover me/i);
    expect(el.className).toContain("bg-gray-200");

    fireEvent.mouseEnter(el);
    expect(el.className).toContain("bg-gray-300");

    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(el);
    expect(el.className).toContain("bg-gray-200");
  });

  it("does not toggle hovered state when isHoverable is false", () => {
    render(
      <HoverableSpan isHoverable={false} isSelected={false}>
        No hover
      </HoverableSpan>
    );

    const el = screen.getByText(/No hover/i);
    expect(el.className).toContain("bg-gray-200");

    fireEvent.mouseEnter(el);
    expect(el.className).toContain("bg-gray-200");
  });
});

