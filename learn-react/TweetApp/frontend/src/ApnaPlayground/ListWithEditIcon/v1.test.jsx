import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ListWithEditIconV1 from "./v1";

describe("ListWithEditIconV1", () => {
  it("renders list items and edit actions", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<ListWithEditIconV1 />);

    // Items are rendered as plain text.
    expect(
      screen.getByText(/Lorem ipsum dolor sit amet/i)
    ).toBeInTheDocument();

    // Edit icon is rendered as a button; jsdom doesn't apply hover styles,
    // but the button still exists in the DOM with the title.
    const editButtons = screen.getAllByTitle(/Edit item/i);
    // One per row; click the first.
    fireEvent.click(editButtons[0]);

    expect(consoleLogSpy).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});

