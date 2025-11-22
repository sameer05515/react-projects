import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders status svg with default size", () => {
    const { container } = render(<LoadingSpinner />);
    const svg = screen.getByRole("status", { name: /loading/i });
    expect(svg).toHaveClass("h-8", "w-8");
    expect(container.firstChild).not.toHaveClass("fixed");
  });

  it("applies small and large size classes", () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    expect(screen.getByRole("status")).toHaveClass("h-5", "w-5");

    rerender(<LoadingSpinner size="large" />);
    expect(screen.getByRole("status")).toHaveClass("h-12", "w-12");
  });

  it("uses full-screen overlay when fullScreen is true", () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    expect(container.firstChild).toHaveClass("fixed", "inset-0");
  });
});
