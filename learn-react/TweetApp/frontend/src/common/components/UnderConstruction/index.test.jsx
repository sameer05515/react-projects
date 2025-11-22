import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const mockGoBack = jest.fn();
const mockGoToHome = jest.fn();

jest.mock("../../hooks/useSPPNavigation", () => ({
  __esModule: true,
  default: () => ({
    goBack: mockGoBack,
    goToHome: mockGoToHome,
  }),
}));

import UnderConstruction from "./index";

describe("common/components/UnderConstruction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders buttons based on props and triggers navigation handlers", () => {
    render(
      <UnderConstruction
        title="Under Construction"
        showBackButton={true}
        showHomeButton={true}
      />
    );

    expect(
      screen.getByRole("heading", { name: /^Under Construction$/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go Back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go to Home/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Go Back/i }));
    expect(mockGoBack).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /Go to Home/i }));
    expect(mockGoToHome).toHaveBeenCalledTimes(1);
  });
});

