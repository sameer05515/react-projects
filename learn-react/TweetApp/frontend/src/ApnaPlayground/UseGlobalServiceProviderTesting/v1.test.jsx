import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSetNameVal = jest.fn();

jest.mock("../../common/hooks/useGlobalServiceProvider", () => ({
  __esModule: true,
  default: () => ({
    getNameValComponent: "Initial value",
    setNameVal: (...args) => mockSetNameVal(...args),
  }),
}));

import UseGlobalServiceProviderTestingV1 from "./v1";

describe("UseGlobalServiceProviderTestingV1", () => {
  it("renders initial getNameValComponent and calls setNameVal on button click", () => {
    render(<UseGlobalServiceProviderTestingV1 />);

    expect(
      screen.getByRole("heading", { name: /UseGlobalServiceProviderTestingV1/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Initial value/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Set current date string to name val/i,
      })
    );

    expect(mockSetNameVal).toHaveBeenCalledTimes(1);
    expect(mockSetNameVal.mock.calls[0][0]).toEqual(
      expect.stringContaining("To test, If we can pass a reactjs jsx component")
    );
  });
});

