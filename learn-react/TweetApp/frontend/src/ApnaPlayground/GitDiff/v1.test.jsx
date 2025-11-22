import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import GitDiffV1 from "./v1";

describe("GitDiffV1", () => {
  it("renders heading and diff viewer controls", () => {
    render(<GitDiffV1 oldContent="a\nb" newContent="a\nc" />);

    expect(screen.getByRole("heading", { name: /GitDiffV1/i })).toBeInTheDocument();
    expect(screen.getByText(/In-line View/i)).toBeInTheDocument();
    expect(screen.getByText(/Side-by-Side View/i)).toBeInTheDocument();
  });

  it("switches view mode to side-by-side on button click", () => {
    render(<GitDiffV1 oldContent="a\nb" newContent="a\nc" />);

    fireEvent.click(screen.getByText(/Side-by-Side View/i));
    // Side-by-side mode renders section headings.
    expect(screen.getByText(/Old Content/i)).toBeInTheDocument();
    expect(screen.getByText(/New Content/i)).toBeInTheDocument();
  });
});

