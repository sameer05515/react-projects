import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./index";

describe("Input", () => {
  it("renders input element", () => {
    const { container } = render(<Input />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("renders input with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates label with input using htmlFor", () => {
    const { container } = render(<Input label="Username" id="username-input" />);
    const input = container.querySelector("input");
    const label = container.querySelector("label");
    
    expect(input).toHaveAttribute("id", "username-input");
    expect(label).toHaveAttribute("for", "username-input");
  });

  it("generates unique id when id is not provided", () => {
    const { container } = render(<Input label="Test" />);
    const input = container.querySelector("input");
    const label = container.querySelector("label");
    
    const inputId = input?.getAttribute("id");
    expect(inputId).toBeTruthy();
    expect(inputId).toMatch(/^input-/);
    expect(label).toHaveAttribute("for", inputId);
  });

  it("displays error message when error prop is provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("associates error message with input using aria-describedby", () => {
    const { container } = render(<Input label="Email" error="Invalid email" />);
    const input = container.querySelector("input");
    const errorId = input?.getAttribute("aria-describedby");
    
    expect(errorId).toBeTruthy();
    expect(errorId).toMatch(/-error$/);
    expect(screen.getByText("Invalid email")).toHaveAttribute("id", errorId);
  });

  it("sets aria-invalid when error is present", () => {
    const { container } = render(<Input error="Error message" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid when error is not present", () => {
    const { container } = render(<Input />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("applies error class when error is present", () => {
    const { container } = render(<Input error="Error" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("error");
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    const { container } = render(<Input fullWidth />);
    const wrapper = container.querySelector(".inputWrapper");
    const input = container.querySelector("input");
    
    expect(wrapper).toHaveClass("fullWidth");
    expect(input).toHaveClass("fullWidth");
  });

  it("calls onChange handler when input value changes", () => {
    const handleChange = vi.fn();
    const { container } = render(<Input onChange={handleChange} />);
    const input = container.querySelector("input");
    
    fireEvent.change(input!, { target: { value: "test" } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("passes through standard input attributes", () => {
    const { container } = render(
      <Input
        type="email"
        placeholder="Enter email"
        required
        disabled
        name="email"
      />
    );
    const input = container.querySelector("input");
    
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("name", "email");
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector("input");
    
    expect(input).toHaveClass("input");
    expect(input).toHaveClass("custom-class");
  });

  it("renders error message with role alert", () => {
    render(<Input error="Error message" />);
    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toHaveAttribute("role", "alert");
  });
});

