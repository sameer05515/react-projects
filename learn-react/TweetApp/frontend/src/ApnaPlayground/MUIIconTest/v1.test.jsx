import React from "react";
import { render } from "@testing-library/react";

import MUIIconTestV1 from "./v1";

describe("MUIIconTestV1", () => {
  it("renders two MUI icons (svg elements)", () => {
    const { container } = render(<MUIIconTestV1 />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });
});

