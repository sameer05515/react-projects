import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>3</Badge>);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("applies danger color classes", () => {
    render(<Badge color="danger">Error</Badge>);
    const badge = screen.getByText("Error");
    expect(badge).toHaveClass("bg-red-600");
    expect(badge).toHaveClass("rounded-full");
  });

  it("uses rounded corners instead of pill when rounded is false", () => {
    render(<Badge rounded={false}>X</Badge>);
    const badge = screen.getByText("X");
    expect(badge).toHaveClass("rounded");
    expect(badge).not.toHaveClass("rounded-full");
  });

  it("falls back to secondary for unknown color", () => {
    render(<Badge color="unknown">?</Badge>);
    expect(screen.getByText("?")).toHaveClass("bg-gray-600");
  });

  it("merges custom className", () => {
    render(<Badge className="ml-2">tag</Badge>);
    expect(screen.getByText("tag")).toHaveClass("ml-2");
  });
});
