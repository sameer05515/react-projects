import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ToggleablePanel from "./ToggleablePanel";

describe("common/components/toggleable-panel/ToggleablePanel", () => {
  it("renders children only when metadata is visible", () => {
    render(
      <ToggleablePanel title="My Panel" showContent={true}>
        <div>Panel Content</div>
      </ToggleablePanel>
    );

    expect(screen.getByText("Panel Content")).toBeInTheDocument();

    // When visible, ToggleableIcon shows '-' by default.
    const minusSpan = screen.getByText("-");
    const toggleBtn = minusSpan.closest("button");
    expect(toggleBtn).toBeTruthy();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();

    // Now it should show '+' when hidden.
    const plusSpan = screen.getByText("+");
    expect(plusSpan).toBeInTheDocument();
  });

  it("hides children by default when showContent is false", () => {
    render(
      <ToggleablePanel title="My Panel">
        <div>Panel Content</div>
      </ToggleablePanel>
    );

    expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();
  });
});

