import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  __esModule: true,
  useDispatch: () => mockDispatch,
}));

jest.mock("../../common/components/collapsible-menu/CollapsibleMenu", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="collapsible-mock">{children}</div>,
}));

import HorizontalMenu from "./v1";

describe("routes/HorizontalMenu/v1", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders a Home link and dispatches module name on click", () => {
    render(
      <MemoryRouter>
        <HorizontalMenu isAuthenticated={false} handleLogout={jest.fn()} />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole("link", { name: /^Home$/i });
    expect(homeLink).toHaveAttribute("href", "/");

    fireEvent.click(homeLink);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("shows Logout when authenticated", () => {
    render(
      <MemoryRouter>
        <HorizontalMenu isAuthenticated handleLogout={jest.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Logout/i })
    ).toBeInTheDocument();
  });
});
