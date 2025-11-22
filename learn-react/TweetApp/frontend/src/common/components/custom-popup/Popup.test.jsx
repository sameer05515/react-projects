import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../custom-button/CustomButton", () => ({
  __esModule: true,
  default: ({ onClick, children, title }) => (
    <button type="button" onClick={onClick} title={title}>
      {children}
    </button>
  ),
}));

import Popup from "./Popup";

describe("common/components/custom-popup/Popup", () => {
  it("renders header text and children; clicking close calls onClose", () => {
    const onClose = jest.fn();

    render(
      <Popup headerText="My Popup" onClose={onClose}>
        <div>Popup content</div>
      </Popup>
    );

    expect(
      screen.getByRole("heading", { name: /My Popup/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Popup content/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "×" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders default children when none are provided", () => {
    render(<Popup />);

    expect(
      screen.getByRole("heading", { name: /Popup Content/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/This is a simple popup/i)).toBeInTheDocument();
  });
});

