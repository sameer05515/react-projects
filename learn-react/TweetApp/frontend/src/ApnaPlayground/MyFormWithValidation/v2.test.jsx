import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import MyFormWithValidationV2 from "./v2";

describe("MyFormWithValidationV2", () => {
  it("shows validation error for non-alphanumeric input", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<MyFormWithValidationV2 />);

    const input = screen.getByPlaceholderText(/Enter text/i);
    fireEvent.change(input, { target: { value: "abc!" } });

    await waitFor(() => {
      expect(
        screen.getByText(/Input should be alphanumeric and 50 characters or less/i)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(consoleLogSpy).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});

