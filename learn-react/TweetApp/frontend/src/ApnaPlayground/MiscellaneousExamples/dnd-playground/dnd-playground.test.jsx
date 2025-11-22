import React from "react";
import { render, screen } from "@testing-library/react";

// Mock react-dnd (ESM-only packages / runtime hooks) so we can render the demo in Jest.
jest.mock("react-dnd", () => {
  const React = require("react");
  return {
    __esModule: true,
    DndProvider: ({ children }) => React.createElement(React.Fragment, null, children),
    useDrag: () => [{ isDragging: false }, (node) => node],
    useDrop: () => [{}, (node) => node],
  };
});

jest.mock("react-dnd-html5-backend", () => ({
  __esModule: true,
  HTML5Backend: function HTML5Backend() {
    return null;
  },
}));

import MonthList from "./MonthList";
import TreeList from "./TreeList";

describe("dnd-playground", () => {
  it("renders MonthList months", () => {
    render(<MonthList />);

    // Order is randomized; assert presence.
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("February")).toBeInTheDocument();
    expect(screen.getByText("December")).toBeInTheDocument();
  });

  it("renders TreeList node labels", () => {
    render(<TreeList />);

    // Assert a few nodes from initialTreeData.
    expect(screen.getByText("Root Node")).toBeInTheDocument();
    expect(screen.getByText("Child Node 1")).toBeInTheDocument();
    expect(screen.getByText("Grandchild Node 1.1")).toBeInTheDocument();
    expect(screen.getByText("Great Grandchild Node 1.2.1")).toBeInTheDocument();
  });
});

