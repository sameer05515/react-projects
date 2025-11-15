import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("renders button with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders button with default variant (primary)", () => {
    const { container } = render(<Button>Test</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("primary");
  });

  it("applies variant classes correctly", () => {
    const { container, rerender } = render(<Button variant="primary">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("primary");

    rerender(<Button variant="secondary">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("secondary");

    rerender(<Button variant="danger">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("danger");
  });

  it("applies size classes correctly", () => {
    const { container, rerender } = render(<Button size="small">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("small");

    rerender(<Button size="medium">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("medium");

    rerender(<Button size="large">Test</Button>);
    expect(container.querySelector("button")).toHaveClass("large");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    
    const button = screen.getByText("Disabled");
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled attribute correctly", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });

  it("passes through additional HTML attributes", () => {
    const { container } = render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <Button className="custom-class">Test</Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("primary");
    expect(button).toHaveClass("medium");
    expect(button).toHaveClass("custom-class");
  });
});

