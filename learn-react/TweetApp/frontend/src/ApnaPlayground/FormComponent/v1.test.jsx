import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import FormComponentV1 from "./v1";

describe("FormComponentV1", () => {
  it("renders form fields and submits data", () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<FormComponentV1 />);

    expect(screen.getByRole("heading", { name: /Form Component/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Text/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save/i })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2020-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/Text/i), {
      target: { value: "hello" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Form Data:",
      expect.objectContaining({ date: "2020-01-01", text: "hello" })
    );

    consoleLogSpy.mockRestore();
  });
});

