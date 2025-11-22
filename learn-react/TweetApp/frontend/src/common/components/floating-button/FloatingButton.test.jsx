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

import FloatingButton from "./FloatingButton";

describe("common/components/floating-button/FloatingButton", () => {
  it("toggles the floating panel when clicked", () => {
    render(
      <FloatingButton buttonText="Open" showButtonText={true}>
        <div>Panel Content</div>
      </FloatingButton>
    );

    const toggleBtn = screen.getByRole("button", { name: /Open/i });
    expect(screen.queryByText(/Panel Content/i)).not.toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByText(/Panel Content/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/Panel Content/i)).not.toBeInTheDocument();
  });
});

