import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TooltipSpan from "./TooltipSpan";

describe("TooltipSpan", () => {
  it("shows full text when short", () => {
    render(<TooltipSpan text="Hi" maxCharLength={10} />);
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("truncates long text and shows tooltip on hover", async () => {
    const long = "abcdefghijklmnopqrstuvwxyz";
    render(<TooltipSpan text={long} maxCharLength={10} />);

    expect(screen.getByText("abcdefghij...")).toBeInTheDocument();
    expect(screen.queryAllByText(long)).toHaveLength(0);

    // Handlers live on the outer span; mouseenter does not bubble from the inner truncated span.
    const wrapper = screen.getByText("abcdefghij...").closest("span.relative");
    fireEvent.mouseEnter(wrapper);
    await waitFor(() => {
      expect(screen.getByText(long)).toBeInTheDocument();
    });
  });

  it("does not show tooltip when isHoverable is false", async () => {
    const long = "123456789012345";
    render(<TooltipSpan text={long} maxCharLength={5} isHoverable={false} />);

    const wrapper = screen.getByText("12345...").closest("span.relative");
    fireEvent.mouseEnter(wrapper);
    expect(screen.queryAllByText(long)).toHaveLength(0);
  });
});
