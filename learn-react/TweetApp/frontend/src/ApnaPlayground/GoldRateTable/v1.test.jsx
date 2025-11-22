import React from "react";
import { render, screen } from "@testing-library/react";

import GoldRateTableV1 from "./v1";

describe("GoldRateTableV1", () => {
  it("renders a table with year and price columns", () => {
    render(<GoldRateTableV1 />);

    expect(screen.getByRole("heading", { name: /Gold Rate Data/i })).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();

    // Assert some known years from the constant data.
    expect(screen.getByText("1964")).toBeInTheDocument();
    expect(screen.getByText("63.25")).toBeInTheDocument();
  });
});

