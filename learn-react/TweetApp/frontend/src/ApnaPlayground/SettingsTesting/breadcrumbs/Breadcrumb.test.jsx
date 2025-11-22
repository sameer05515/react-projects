import React from "react";
import { render, screen } from "@testing-library/react";

import Breadcrumb from "./Breadcrumb";

describe("SettingsTesting breadcrumbs/Breadcrumb", () => {
  it("renders breadcrumb items and disables the current page button", () => {
    render(<Breadcrumb />);

    expect(screen.getByText("Website Root")).toBeInTheDocument();
    expect(screen.getByText("Page Depth 02")).toBeInTheDocument();
    expect(screen.getByText("Page Depth 03")).toBeInTheDocument();
    expect(screen.getByText("Page Depth 04")).toBeInTheDocument();

    const current = screen.getByRole("button", { name: /Page Depth 05/i });
    expect(current).toBeDisabled();
  });
});

