import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("./breadcrumbs/Breadcrumb2", () => ({
  __esModule: true,
  default: () => <div>Breadcrumb2 Mock</div>,
}));

jest.mock("./comparisons/ComparisonContainer", () => ({
  __esModule: true,
  default: () => <div>ComparisonContainer Mock</div>,
}));

jest.mock("./comparisons/ComparisonTableContainer", () => ({
  __esModule: true,
  default: () => <div>ComparisonTableContainer Mock</div>,
}));

jest.mock("./ArrowConnectorExamples/Dashboard", () => ({
  __esModule: true,
  default: () => <div>ArrowConnectorExamples Mock</div>,
}));

jest.mock("./CountFullStopLines/v1", () => ({
  __esModule: true,
  default: () => <div>CountFullStopLines Mock</div>,
}));

jest.mock("./DisplayData/v1", () => ({
  __esModule: true,
  default: () => <div>DisplayData Mock</div>,
}));

jest.mock("./GoldRateCalculator/v1", () => ({
  __esModule: true,
  default: () => <div>GoldRateCalculator Mock</div>,
}));

jest.mock("./StudentList/v1", () => ({
  __esModule: true,
  default: () => <div>StudentList Mock</div>,
}));

import SettingDashboard from "./Dashboard";

describe("SettingsTesting Dashboard", () => {
  it("renders default tab content and switches tabs", () => {
    render(<SettingDashboard />);

    expect(screen.getByText(/GoldRateCalculator Mock/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Student List Container/i,
      })
    );

    expect(screen.getByText(/StudentList Mock/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/GoldRateCalculator Mock/i)
    ).not.toBeInTheDocument();
  });
});

