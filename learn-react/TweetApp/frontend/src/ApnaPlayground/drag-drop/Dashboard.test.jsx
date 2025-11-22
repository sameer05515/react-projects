import React from "react";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";

import DraggableAreaDashboard from "./Dashboard";

describe("ApnaPlayground/drag-drop", () => {
  it("reorders DraggableAreaV1 items using drag events", () => {
    render(<DraggableAreaDashboard />);

    const listItems = screen
      .getAllByRole("listitem")
      .filter((el) =>
        ["Alpha", "Bravo", "Charlie", "Delta"].includes(el.textContent)
      );

    expect(listItems.map((el) => el.textContent)).toEqual([
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
    ]);

    // Drag "Bravo" (index 1) over "Charlie" (index 2).
    fireEvent.dragStart(listItems[1]);
    fireEvent.dragOver(listItems[2], { preventDefault: () => {} });

    const updated = screen
      .getAllByRole("listitem")
      .filter((el) =>
        ["Alpha", "Bravo", "Charlie", "Delta"].includes(el.textContent)
      );

    expect(updated.map((el) => el.textContent)).toEqual([
      "Alpha",
      "Charlie",
      "Bravo",
      "Delta",
    ]);
  });

  it("renders initial column tasks in DraggableAreaV2", () => {
    render(<DraggableAreaDashboard />);

    const todoHeader = screen.getByText("todo");
    const doingHeader = screen.getByText("doing");
    const doneHeader = screen.getByText("done");

    const todoColumn = todoHeader.closest("div");
    const doingColumn = doingHeader.closest("div");
    const doneColumn = doneHeader.closest("div");

    expect(within(todoColumn).getByText(/Task A/i)).toBeInTheDocument();
    expect(within(todoColumn).getByText(/Task B/i)).toBeInTheDocument();
    expect(within(doingColumn).getByText(/Task C/i)).toBeInTheDocument();
    expect(within(doneColumn).getByText(/Task D/i)).toBeInTheDocument();
  });
});

