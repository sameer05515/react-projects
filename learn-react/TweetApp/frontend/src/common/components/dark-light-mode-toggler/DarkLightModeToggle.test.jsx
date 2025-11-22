import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import DarkLightModeToggle from "./DarkLightModeToggle";

describe("common/components/dark-light-mode-toggler/DarkLightModeToggle", () => {
  it("starts in Light Mode and toggles to Dark Mode on click", () => {
    render(<DarkLightModeToggle />);

    expect(screen.getByText(/Light Mode/i)).toBeInTheDocument();
    const toggleBtn = screen.getByRole("button", { name: /Toggle theme/i });

    fireEvent.click(toggleBtn);
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
  });
});

