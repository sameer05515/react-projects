import React from "react";
import { render, screen } from "@testing-library/react";
import Welcome from "./v1";

describe("routes/Welcome/v1", () => {
  it("renders the welcome heading", () => {
    render(<Welcome />);
    expect(
      screen.getByRole("heading", { name: /Welcome Bro!!/i })
    ).toBeInTheDocument();
  });
});
