import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutoCompleteDropdown from "./AutoCompleteDropdown";

describe("AutoCompleteDropdown", () => {
  const names = ["Apple", "Banana", "Apricot"];

  it("filters options as user types", async () => {
    render(<AutoCompleteDropdown names={names} />);
    const input = screen.getByPlaceholderText(/search for names/i);

    await userEvent.type(input, "ap");

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Apricot")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("selecting a list item sets input value and hides dropdown", async () => {
    render(<AutoCompleteDropdown names={names} />);
    const input = screen.getByPlaceholderText(/search for names/i);

    await userEvent.type(input, "ban");
    expect(screen.getByText("Banana")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Banana"));

    expect(input).toHaveValue("Banana");
    expect(document.querySelector(".dropdown")).not.toBeInTheDocument();
  });
});
