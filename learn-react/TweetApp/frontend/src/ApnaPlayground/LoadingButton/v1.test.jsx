import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import LoadingButtonV1 from "./v1";

describe("LoadingButtonV1", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("shows loading UI for 5 seconds, then returns to idle", () => {
    render(<LoadingButtonV1 />);

    const btn = screen.getByRole("button", { name: /Click Me/i });
    expect(btn).toBeEnabled();

    act(() => {
      fireEvent.click(btn);
    });

    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
    expect(btn).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByRole("button", { name: /Click Me/i })).toBeEnabled();
  });
});

