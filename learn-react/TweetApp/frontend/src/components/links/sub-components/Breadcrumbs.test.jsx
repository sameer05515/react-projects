import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

describe("components/links/sub-components/Breadcrumbs", () => {
  it("renders Home and ancestor names", () => {
    render(
      <Breadcrumbs
        ancestors={[
          { uniqueId: "a1", name: "Parent" },
          { uniqueId: "a2", name: "Child" },
        ]}
      />
    );

    expect(screen.getByRole("navigation", { name: /Breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Parent")).toBeInTheDocument();
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("treats non-array ancestors as empty", () => {
    render(<Breadcrumbs ancestors={null} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Parent")).not.toBeInTheDocument();
  });
});
