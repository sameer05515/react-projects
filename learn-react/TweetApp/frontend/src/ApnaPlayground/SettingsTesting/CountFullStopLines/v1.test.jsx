import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import CountFullStopLines from "./v1";

describe("SettingsTesting CountFullStopLines", () => {
  it("counts sentences ending with a full stop", () => {
    render(<CountFullStopLines />);

    const textarea = screen.getByPlaceholderText(
      /Enter text to count sentences ending with a full stop/i
    );

    fireEvent.change(textarea, {
      target: { value: "Hello. World. Not counted?" },
    });

    // "Hello." and "World." end with '.', so count should be 2.
    expect(
      screen.getByText(/Lines ending with a full stop:/i).textContent
    ).toContain("2");
  });
});

