import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("./UseConsolidatedTesterV2", () => ({
  __esModule: true,
  default: () => <div>UseConsolidatedTesterV2 Mock</div>,
}));
jest.mock("./UseConsolidatedTesterV3", () => ({
  __esModule: true,
  default: () => <div>UseConsolidatedTesterV3 Mock</div>,
}));
jest.mock("./UseConsolidatedTesterV1", () => ({
  __esModule: true,
  default: () => <div>UseConsolidatedTesterV1 Mock</div>,
}));
jest.mock("./UseConsolidatedTesterV4", () => ({
  __esModule: true,
  default: () => <div>UseConsolidatedTesterV4 Mock</div>,
}));

import UseConsolidatedTesterDashboard from "./UseConsolidatedTesterDashboard";

describe("UseConsolidatedTesterDashboard", () => {
  it("renders V1-V4 sections", () => {
    render(<UseConsolidatedTesterDashboard />);

    expect(
      screen.getByText(/UseConsolidatedTesterV4 Mock/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/UseConsolidatedTesterV3 Mock/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/UseConsolidatedTesterV2 Mock/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/UseConsolidatedTesterV1 Mock/i)
    ).toBeInTheDocument();
  });
});

