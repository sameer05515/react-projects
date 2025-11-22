import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import DisplayData from "./v1";

describe("SettingsTesting DisplayData", () => {
  it("toggles between TREE and MEMORY_MAP views", () => {
    const treeData = [
      {
        uniqueId: 1,
        name: "Root A",
        parentId: 0,
        children: [
          {
            uniqueId: 2,
            name: "Child A1",
            parentId: 1,
            children: [],
          },
        ],
      },
      // Note: DisplayData uses embedded children off root nodes for rendering.
    ];

    render(<DisplayData treeData={treeData} />);

    // TREE view: should render expand/collapse affordances for nodes with children.
    expect(screen.getByRole("button", { name: /Expand node/i })).toBeInTheDocument();
    expect(screen.getByText("Root A")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: /MEMORY_MAP/i }));

    // MEMORY_MAP view: no expand/collapse button.
    expect(screen.queryByRole("button", { name: /Expand node/i })).not.toBeInTheDocument();
    expect(screen.getByText("Root A")).toBeInTheDocument();
    expect(screen.getByText("Child A1")).toBeInTheDocument();
  });
});

