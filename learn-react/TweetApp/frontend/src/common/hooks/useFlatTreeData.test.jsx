import React from "react";
import { render, screen } from "@testing-library/react";
import useFlatTreeData from "./useFlatTreeData";

function Probe({ treeData, selectedUniqueId, uniqueIdFieldName = "uniqueId" }) {
  const { flatData, prevItem, nextItem } = useFlatTreeData(
    treeData,
    selectedUniqueId,
    uniqueIdFieldName
  );

  return (
    <div>
      <span data-testid="len">{flatData?.length ?? 0}</span>
      <span data-testid="current">{flatData.find((x) => x?.[uniqueIdFieldName] === selectedUniqueId)?.title ?? ""}</span>
      <span data-testid="prev">{prevItem?.title ?? ""}</span>
      <span data-testid="next">{nextItem?.title ?? ""}</span>
    </div>
  );
}

describe("common/hooks/useFlatTreeData", () => {
  const treeData = [
    {
      uniqueId: "root",
      _id: "r1",
      name: "Root",
      type: "category",
      ancestors: [],
      children: [
        {
          uniqueId: "child1",
          _id: "c1",
          name: "Child1",
          type: "question",
          ancestors: [{ uniqueId: "root", name: "Root", parentId: null }],
          children: [],
        },
        {
          uniqueId: "child2",
          _id: "c2",
          name: "Child2",
          type: "category",
          ancestors: [{ uniqueId: "root", name: "Root", parentId: null }],
          children: [
            {
              uniqueId: "grand1",
              _id: "g1",
              name: "Grand1",
              type: "question",
              ancestors: [
                { uniqueId: "root", name: "Root", parentId: null },
                { uniqueId: "child2", name: "Child2", parentId: "root" },
              ],
              children: [],
            },
          ],
        },
      ],
    },
  ];

  it("creates flatData titles with ancestor chain and computes prev/next", () => {
    render(
      <Probe treeData={treeData} selectedUniqueId="grand1" />
    );

    expect(screen.getByTestId("len").textContent).toBe("4");
    expect(screen.getByTestId("current")).toHaveTextContent(
      "Root / Child2 / Grand1"
    );
    expect(screen.getByTestId("prev")).toHaveTextContent("Root / Child2");
    expect(screen.getByTestId("next")).toHaveTextContent("Root");
  });

  it("wraps prev/next when selected node is the first item", () => {
    render(<Probe treeData={treeData} selectedUniqueId="root" />);

    expect(screen.getByTestId("current")).toHaveTextContent("Root");
    // prev of Root should wrap to the last flattened item.
    expect(screen.getByTestId("prev")).toHaveTextContent("Root / Child2 / Grand1");
    // next of Root should be Child1 (depth-first flatten order).
    expect(screen.getByTestId("next")).toHaveTextContent("Root / Child1");
  });
});

