import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-cron-generator", () => ({
  __esModule: true,
  default: ({ value, onChange }) => (
    <div>
      <input
        data-testid="cron-input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  ),
}));

import CronExpressionGenerator from "./CronExpressionGenerator";

describe("common/components/cron-expression-generator/CronExpressionGenerator", () => {
  it("renders default cron expression and updates it on change", () => {
    render(<CronExpressionGenerator />);

    expect(
      screen.getByText(/Generated Cron Expression:/i).textContent
    ).toContain("Generated Cron Expression:");
    expect(screen.getByText("0 0 * * *")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("cron-input"), {
      target: { value: "1 2 3 4 5" },
    });

    expect(screen.getByText("1 2 3 4 5")).toBeInTheDocument();
  });
});

