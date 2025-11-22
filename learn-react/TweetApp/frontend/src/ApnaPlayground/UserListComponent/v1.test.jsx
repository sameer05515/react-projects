import React from "react";
import { render, screen } from "@testing-library/react";

import UserListComponentV1 from "./v1";

describe("UserListComponentV1", () => {
  it("renders the user list heading and user names", () => {
    render(<UserListComponentV1 />);

    expect(
      screen.getByRole("heading", { name: /User List/i })
    ).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Brown")).toBeInTheDocument();
  });
});

