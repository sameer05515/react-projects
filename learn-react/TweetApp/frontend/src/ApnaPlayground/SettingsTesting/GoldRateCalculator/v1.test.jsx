import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import GoldRateCalculator from "./v1";
import GOLD_RATE from "../../../common/constants/goldRate";

describe("SettingsTesting GoldRateCalculator", () => {
  it("computes formula and target amount for selected years", () => {
    render(<GoldRateCalculator />);

    const [yearSelect, targetYearSelect] = screen.getAllByRole("combobox");
    const amountInput = screen.getByPlaceholderText(/Amount/i);

    // Select: 1964 -> 1965 (default amount is 1)
    fireEvent.change(yearSelect, { target: { value: "1964" } });
    fireEvent.change(targetYearSelect, { target: { value: "1965" } });

    // Amount is controlled via onInput, so fire an input event.
    fireEvent.input(amountInput, { target: { value: "1" } });

    const price = parseFloat(
      GOLD_RATE.data.find((d) => d.year === "1964")?.price
    );
    const targetPrice = parseFloat(
      GOLD_RATE.data.find((d) => d.year === "1965")?.price
    );
    const expectedAmount = (1 * (targetPrice / price)).toFixed(2);

    // GoldRateDetails shows only when both years are selected.
    expect(
      screen.getByText(/Gold Rate Calculator/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Formula:/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/\(71\.75 \/ 63\.25\)/i).length
    ).toBeGreaterThan(0);

    // targetAmount.toFixed(2) for 1 * (71.75 / 63.25) ~= 1.13
    expect(
      screen.getByText(/Equivalent Target Amount for year 1965:/i)
    ).toBeInTheDocument();
    const expectedAmountRegex = new RegExp(
      expectedAmount.replace(".", "\\.")
    );
    expect(screen.getAllByText(expectedAmountRegex).length).toBeGreaterThan(
      0
    );
  });
});

