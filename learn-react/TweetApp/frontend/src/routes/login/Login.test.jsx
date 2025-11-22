import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

describe("routes/login/Login", () => {
  it("updates fields and submits with preventDefault", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { name: "username", value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { name: "password", value: "secret" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^Login$/i }));

    expect(logSpy).toHaveBeenCalledWith(
      "Login data submitted:",
      expect.objectContaining({ username: "alice", password: "secret" })
    );

    logSpy.mockRestore();
  });
});
