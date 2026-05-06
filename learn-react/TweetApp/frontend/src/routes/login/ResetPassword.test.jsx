import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("routes/login/ResetPassword", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("shows error when passwords do not match", async () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { name: "username", value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { name: "newPassword", value: "Pass@123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { name: "confirmPassword", value: "Pass@456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits reset-password request and shows success toast", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "Password reset successful" }),
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { name: "username", value: "alice" },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { name: "newPassword", value: "Pass@123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { name: "confirmPassword", value: "Pass@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reset Password/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Password reset successful");
    });
  });
});
