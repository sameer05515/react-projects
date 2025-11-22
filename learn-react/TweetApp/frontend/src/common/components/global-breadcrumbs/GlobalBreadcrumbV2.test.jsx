import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const mockNavigate = jest.fn();

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: () => "Selected Module",
}));

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

jest.mock("../hoverable-span/HoverableSpan", () => ({
  __esModule: true,
  default: ({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

import GlobalBreadcrumbV2 from "./GlobalBreadcrumbV2";

describe("common/components/global-breadcrumbs/GlobalBreadcrumbV2", () => {
  afterEach(() => {
    mockNavigate.mockClear();
  });

  it("renders home and selected module segments; clicking navigates to '/'", () => {
    render(<GlobalBreadcrumbV2 />);

    const homeBtn = screen.getByRole("button", { name: /Home/i });
    const moduleBtn = screen.getByRole("button", { name: /Selected Module/i });

    fireEvent.click(homeBtn);
    fireEvent.click(moduleBtn);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenNthCalledWith(1, "/");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "/");
  });
});

