import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-select", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ options = [], onChange }) => (
      <select
        aria-label="example-select"
        onChange={(e) => {
          const next = options.find((o) => o.value === e.target.value);
          onChange?.(next);
        }}
        defaultValue=""
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ),
  };
});

jest.mock("./react-archer-examples", () => ({
  __esModule: true,
  ReactArcherApp1: () => <div>ReactArcherApp1 Mock</div>,
}));

import ArrowConnectorExamplesDashboard from "./Dashboard";

describe("SettingsTesting ArrowConnectorExamples/Dashboard", () => {
  it("shows prompt, then renders ArrowConnectorExample when selected", () => {
    render(<ArrowConnectorExamplesDashboard />);

    expect(
      screen.getByText(/Select an example to preview/i)
    ).toBeInTheDocument();

    // Our mocked react-select is a native <select>.
    const select = screen.getByRole("combobox", { name: /example-select/i });
    fireEvent.change(select, { target: { value: "ArrowConnectorExample" } });

    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("End")).toBeInTheDocument();
  });
});

