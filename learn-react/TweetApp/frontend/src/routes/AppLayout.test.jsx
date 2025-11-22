import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MainLayout, NotFound } from "./AppLayout";
import { fetchPinnedItems } from "../redux/slices/pinnedItemSlice";

jest.mock("../common/components/global-breadcrumbs/GlobalBreadcrumbV2", () => {
  function MockCrumb() {
    return <nav data-testid="breadcrumb" />;
  }
  return MockCrumb;
});

jest.mock("../common/components/toggleable-icon/ToggleableIcon", () => {
  function MockToggle({ label, onToggle }) {
    return (
      <button type="button" onClick={onToggle}>
        {label}
      </button>
    );
  }
  return MockToggle;
});

jest.mock("../redux/slices/pinnedItemSlice", () => ({
  fetchPinnedItems: jest.fn(),
}));

const noopReducer = (state = {}) => state;

function renderMainLayoutAt(path) {
  const store = configureStore({ reducer: { _: noopReducer } });
  jest.spyOn(store, "dispatch");
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/topic-mgmt" element={<MainLayout />}>
            <Route index element={<div data-testid="outlet-child">child</div>} />
          </Route>
          <Route path="/words" element={<MainLayout />}>
            <Route index element={<div data-testid="outlet-child">w</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
  return store;
}

describe("AppLayout", () => {
  beforeEach(() => {
    fetchPinnedItems.mockReturnValue({ type: "TEST_FETCH_PINNED" });
  });

  describe("NotFound", () => {
    it("renders 404 messaging", () => {
      render(<NotFound />);
      expect(screen.getByRole("heading", { name: /404 not found/i })).toBeInTheDocument();
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
  });

  describe("MainLayout", () => {
    it("dispatches fetchPinnedItems on topic-mgmt path", () => {
      const store = renderMainLayoutAt("/topic-mgmt");
      expect(fetchPinnedItems).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: "TEST_FETCH_PINNED" });
    });

    it("does not dispatch fetchPinnedItems on unrelated path", () => {
      jest.mocked(fetchPinnedItems).mockClear();
      renderMainLayoutAt("/words");
      expect(fetchPinnedItems).not.toHaveBeenCalled();
    });

    it("toggles dark mode class on container when toggle is clicked", async () => {
      renderMainLayoutAt("/topic-mgmt");
      const shell = screen.getByTestId("breadcrumb").closest(".relative");
      expect(shell).toHaveClass("bg-white");

      await userEvent.click(screen.getByRole("button", { name: /dark mode/i }));
      expect(shell).toHaveClass("bg-black");

      await userEvent.click(screen.getByRole("button", { name: /dark mode/i }));
      expect(shell).toHaveClass("bg-white");
    });

    it("renders outlet content", () => {
      renderMainLayoutAt("/topic-mgmt");
      expect(screen.getByTestId("outlet-child")).toHaveTextContent("child");
    });
  });
});
