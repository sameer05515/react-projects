import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { getToken } from "./common/service/authService";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("./common/service/authService", () => ({
  getToken: jest.fn(),
  clearToken: jest.fn(),
}));

jest.mock("./routes/HorizontalMenu/v1", () => {
  function MockMenu() {
    return <div data-testid="horizontal-menu" />;
  }
  return MockMenu;
});

jest.mock("./routes/v1", () => {
  function MockRoutes() {
    return <div data-testid="spp-routes" />;
  }
  return MockRoutes;
});

jest.mock("./common/components/CustomBackdrop/v2", () => {
  function MockBackdrop() {
    return null;
  }
  return MockBackdrop;
});

jest.mock("react-toastify", () => ({
  ToastContainer: () => null,
}));

describe("App", () => {
  const originalPathname = window.location.pathname;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { ...window.location, pathname: "/" };
  });

  afterAll(() => {
    window.location.pathname = originalPathname;
  });

  it("redirects to login when there is no token and path is not register", async () => {
    getToken.mockReturnValue(null);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("does not redirect to login on register path without token", async () => {
    getToken.mockReturnValue(null);
    window.location = { pathname: "/register" };

    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows menu and routes when token exists", async () => {
    getToken.mockReturnValue("fake.jwt");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("horizontal-menu")).toBeInTheDocument();
    });
    expect(screen.getByTestId("spp-routes")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
