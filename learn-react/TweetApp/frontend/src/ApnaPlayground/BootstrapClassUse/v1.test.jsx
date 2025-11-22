import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import BootstrapClassUseV1 from "./v1";

describe("BootstrapClassUseV1", () => {
  it("renders heading, prev link, and primary action button", () => {
    render(
      <MemoryRouter>
        <BootstrapClassUseV1 />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Hello, from BootstrapClassUseV1!/i)
    ).toBeInTheDocument();

    // NavLink is used in the component; we assert on its visible text.
    expect(screen.getByText("Prev")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Primary action/i })).toBeInTheDocument();
  });
});

