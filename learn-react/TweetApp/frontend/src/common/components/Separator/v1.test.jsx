import React from "react";
import { render } from "@testing-library/react";
import SeparatorV1 from "./v1";

describe("SeparatorV1", () => {
  it("renders a horizontal rule with border classes", () => {
    const { container } = render(<SeparatorV1 />);
    const el = container.firstChild;
    expect(el.tagName.toLowerCase()).toBe("div");
    expect(el).toHaveClass("border-t-2", "border-black");
  });

  it("merges custom className", () => {
    const { container } = render(<SeparatorV1 className="mx-4" />);
    expect(container.firstChild).toHaveClass("mx-4");
  });
});
