import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LineNumberFormatter, { appendLineNumbers } from "./v1";

describe("appendLineNumbers", () => {
  it("pads and numbers non-empty lines", () => {
    expect(appendLineNumbers("a\n\nb", 3, 0)).toBe("001 a\n\n002 b");
  });
});

describe("LineNumberFormatter", () => {
  it("formats non-empty lines with padded numbers as inputs change", async () => {
    render(<LineNumberFormatter />);

    await userEvent.type(screen.getByPlaceholderText(/multiline text/i), "alpha\n\nbeta");
    const numberInputs = document.querySelectorAll('input[type="number"]');
    expect(numberInputs).toHaveLength(2);
    await userEvent.clear(numberInputs[0]);
    await userEvent.type(numberInputs[0], "3");
    await userEvent.clear(numberInputs[1]);
    await userEvent.type(numberInputs[1], "0");

    expect(screen.getByLabelText(/formatted output/i)).toHaveValue("001 alpha\n\n002 beta");
  });

  it("applies default padding for a single line", async () => {
    render(<LineNumberFormatter />);

    await userEvent.type(screen.getByPlaceholderText(/multiline text/i), "only");

    expect(screen.getByLabelText(/formatted output/i)).toHaveValue("001 only");
  });
});
