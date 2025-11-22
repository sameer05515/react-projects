import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-redux", () => ({
  __esModule: true,
  useDispatch: () => jest.fn(),
}));

jest.mock("../../../redux/slices/comparableDataSlice", () => ({
  __esModule: true,
  fetchData: jest.fn(() => ({ type: "fetchData" })),
}));

jest.mock("./ComparableDataList", () => ({
  __esModule: true,
  default: () => <div>ComparableDataList Mock</div>,
}));

jest.mock("./SaveUpdateComparableData", () => ({
  __esModule: true,
  default: ({ onSaveComplete }) => (
    <div>
      <button
        type="button"
        onClick={() => onSaveComplete?.()}
      >
        Save Mock
      </button>
    </div>
  ),
}));

jest.mock("../../../common/components/custom-button/CustomButton", () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button type="button" onClick={onClick}>
      Add New Comparison
    </button>
  ),
}));

import { fetchData } from "../../../redux/slices/comparableDataSlice";
import ComparisonContainer from "./ComparisonContainer";

describe("SettingsTesting comparisons/ComparisonContainer", () => {
  it("shows add button and dispatches fetch on save complete", () => {
    render(<ComparisonContainer />);

    expect(
      screen.getByRole("button", { name: /Add New Comparison/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Add New Comparison/i }));

    expect(screen.getByRole("button", { name: /Save Mock/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Save Mock/i }));

    expect(fetchData).toHaveBeenCalled();
  });
});

