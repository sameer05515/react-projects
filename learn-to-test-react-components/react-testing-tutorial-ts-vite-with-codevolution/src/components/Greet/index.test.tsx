import { render, screen } from "@testing-library/react";
import Greet from ".";
import { test, expect, describe } from "vitest";

describe("Greet", () => {
  test("renders component properly", () => {
    render(<Greet />);
    const linkElement = screen.getByText(/Hello/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeVisible();
  });

  test("renders component's name prop correctly", () => {
    render(<Greet name="Ajay" />);
    const linkElement = screen.getByText(/Hello Ajay/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeVisible();
  });
});
