import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ChantingV1 from "./v1";

describe("ApnaPlayground/chanting/ChantingV1", () => {
  it("increments counter on button click", () => {
    render(<ChantingV1 />);

    expect(screen.getByText(/^0$/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Click Me/i }));

    expect(screen.getByText(/^1$/)).toBeInTheDocument();
  });
});

