import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("./TooltipSpan", () => ({
  __esModule: true,
  default: ({ text }) => <span>{text}</span>,
}), { virtual: true });

import TreeBase from "./TreeBase";

describe("common/components/tree-base/TreeBase", () => {
  beforeAll(() => {
    // TreeNode attempts scrollIntoView; stub it in JSDOM.
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = () => {};
    }
  });

  it("calls onNodeSelection for the initially selected node and moves selection on Next", async () => {
    const onNodeSelection = jest.fn();

    const treeList = [
      {
        id: "root",
        name: "Root",
        type: "category",
        children: [
          { id: "c1", name: "Child1", type: "question", children: [] },
        ],
      },
    ];

    render(
      <TreeBase treeList={treeList} onNodeSelection={onNodeSelection} />
    );

    await waitFor(() => {
      expect(onNodeSelection).toHaveBeenCalledWith(
        expect.objectContaining({ id: "root", name: "Root" })
      );
    });

    const nextBtn = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(onNodeSelection).toHaveBeenCalledWith(
        expect.objectContaining({ id: "c1", name: "Child1" })
      );
    });
  });
});

