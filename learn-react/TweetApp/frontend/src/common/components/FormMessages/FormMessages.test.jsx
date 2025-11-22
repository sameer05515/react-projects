import React from "react";
import { render, screen } from "@testing-library/react";
import FormMessagesV1 from "./v1";

describe("FormMessagesV1", () => {
  it("returns null for empty messages", () => {
    const { container } = render(<FormMessagesV1 messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows invalid format when messages is not an array", () => {
    render(<FormMessagesV1 messages="oops" />);
    expect(screen.getByText(/invalid messages format/i)).toBeInTheDocument();
  });

  it("renders messages with type-specific classes", () => {
    render(
      <FormMessagesV1
        messages={[
          { type: "error", message: "Bad" },
          { type: "info", message: "Note" },
          { type: "warning", message: "Careful" },
          { type: "unknown", message: "Other" },
        ]}
      />
    );

    expect(screen.getByText("Bad")).toHaveClass("alert-danger");
    expect(screen.getByText("Note")).toHaveClass("alert-info");
    expect(screen.getByText("Careful")).toHaveClass("alert-warning");
    expect(screen.getByText("Other")).toHaveClass("alert-secondary");
  });
});
