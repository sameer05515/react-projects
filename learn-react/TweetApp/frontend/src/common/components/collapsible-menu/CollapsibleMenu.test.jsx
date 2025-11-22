import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import CollapsibleMenu from "./CollapsibleMenu";

describe("common/components/collapsible-menu/CollapsibleMenu", () => {
  it("toggles collapsed state and hides children when clicking outside", () => {
    render(
      <CollapsibleMenu isCollapsedInitialValue={true}>
        <div>Menu Child</div>
      </CollapsibleMenu>
    );

    // Collapsed state: expand button visible, children hidden
    expect(screen.getByRole("button", { name: /Expand menu/i })).toBeInTheDocument();
    expect(screen.queryByText(/Menu Child/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Expand menu/i }));
    expect(screen.getByText(/Menu Child/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Collapse menu/i })).toBeInTheDocument();

    // Clicking outside should collapse and hide children
    fireEvent.mouseDown(document.body, { target: document.body });
    expect(screen.queryByText(/Menu Child/i)).not.toBeInTheDocument();
  });
});

