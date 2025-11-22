import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const mockToastSuccess = jest.fn();

jest.mock("react-toastify", () => ({
  __esModule: true,
  toast: {
    success: (...args) => mockToastSuccess(...args),
  },
}));

import ToastButtonComponentV1 from "./v1";

describe("ToastButtonComponentV1", () => {
  it("calls toast.success on button click", () => {
    render(<ToastButtonComponentV1 />);

    fireEvent.click(screen.getByRole("button", { name: /Click Me/i }));

    expect(mockToastSuccess).toHaveBeenCalledWith("Button clicked!");
  });
});

