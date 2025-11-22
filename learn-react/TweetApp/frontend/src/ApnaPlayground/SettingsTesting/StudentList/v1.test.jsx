import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import StudentList from "./v1";

describe("SettingsTesting StudentList", () => {
  it("switches between list/card/table views", () => {
    const students = [
      {
        id: 1,
        name: "John Doe",
        address: "123 Main St, Cityville",
        age: 20,
        major: "Computer Science",
      },
      {
        id: 2,
        name: "Jane Smith",
        address: "456 Elm St, Townsville",
        age: 22,
        major: "Mathematics",
      },
    ];

    render(<StudentList students={students} />);

    expect(
      screen.getByRole("heading", { name: /List View/i })
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: /Card View/i }));
    expect(
      screen.getByRole("heading", { name: /Card View/i })
    ).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Cityville")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: /Table View/i }));
    expect(
      screen.getByRole("heading", { name: /Table View/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();
  });
});

