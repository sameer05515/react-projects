import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../../../common/components/custom-button/CustomButton", () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock("../../../common/constants/expectationsData", () => ({
  __esModule: true,
  default: [
    { title: "Set A", expectations: ["A1", "A2"] },
    { title: "Set B", expectations: ["B1"] },
  ],
}));

jest.mock("./ComparisonTable", () => ({
  __esModule: true,
  default: ({ expectations1, expectations2 }) => (
    <div data-testid="comparison-table">
      E1:{expectations1.length} E2:{expectations2.length}
    </div>
  ),
}));

import ComparisonTableContainer from "./ComparisonTableContainer";

describe("SettingsTesting comparisons/ComparisonTableContainer", () => {
  it("updates ComparisonTable expectations based on select changes", () => {
    render(<ComparisonTableContainer />);

    expect(screen.getByTestId("comparison-table").textContent).toContain(
      "E1:0"
    );
    expect(screen.getByTestId("comparison-table").textContent).toContain(
      "E2:0"
    );

    fireEvent.change(screen.getByLabelText(/Select Expectations Set 1:/i), {
      target: { value: "Set A" },
    });

    fireEvent.change(screen.getByLabelText(/Select Expectations Set 2:/i), {
      target: { value: "Set B" },
    });

    expect(screen.getByTestId("comparison-table").textContent).toContain(
      "E1:2"
    );
    expect(screen.getByTestId("comparison-table").textContent).toContain(
      "E2:1"
    );
  });
});

