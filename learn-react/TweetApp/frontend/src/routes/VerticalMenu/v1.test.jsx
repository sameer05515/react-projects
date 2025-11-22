import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VerticalMenu from "./v1";

describe("routes/VerticalMenu/v1", () => {
  const originalPathname = window.location.pathname;

  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: { ...window.location, pathname: originalPathname },
      writable: true,
    });
  });

  it("renders nav links", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/settings", search: "", hash: "" },
      writable: true,
    });

    render(
      <MemoryRouter initialEntries={["/settings"]}>
        <VerticalMenu isAuthenticated={false} handleLogout={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tweets/i })).toHaveAttribute(
      "href",
      "/tweet-base"
    );
  });

  it("shows Logout and calls handleLogout when authenticated", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/", search: "", hash: "" },
      writable: true,
    });

    const handleLogout = jest.fn();

    render(
      <MemoryRouter>
        <VerticalMenu isAuthenticated handleLogout={handleLogout} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Logout/i }));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
