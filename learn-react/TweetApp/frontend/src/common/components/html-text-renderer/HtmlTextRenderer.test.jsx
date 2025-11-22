import React from "react";
import { render, screen } from "@testing-library/react";

import HtmlTextRenderer from "./HtmlTextRenderer";

describe("common/components/html-text-renderer/HtmlTextRendrer", () => {
  it("renders sanitized HTML content", () => {
    render(
      <HtmlTextRenderer htmlString={'<b>Hello</b><script>evil()</script>'} />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.queryByText(/evil/i)).not.toBeInTheDocument();
  });
});

