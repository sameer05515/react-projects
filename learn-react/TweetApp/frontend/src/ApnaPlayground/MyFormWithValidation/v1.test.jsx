import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import MyFormWithValidationV1 from "./v1";

describe("MyFormWithValidationV1", () => {
  it("logs form data on submit", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<MyFormWithValidationV1 />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
      })
    );

    consoleLogSpy.mockRestore();
  });
});

