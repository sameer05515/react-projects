import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockFetchTaskDetailsForGivenId = jest.fn(() =>
  Promise.resolve({ data: { ok: true }, isError: false, message: "" })
);
// Keep these defined but we won't exercise the getRandomNumber flow in this test,
// since the component uses a chained `.then(...)` style.
const mockGetRandomNumber = jest.fn(() => Promise.resolve({ randomNumber: 5 }));
const mockDoubleTheNumber = jest.fn((n) => Promise.resolve(n * 2));

jest.mock("../../common/hooks/useConsolidated/archieved/v1", () => ({
  __esModule: true,
  default: () => ({
    fetchTaskDetailsForGivenId: (...args) =>
      mockFetchTaskDetailsForGivenId(...args),
    getRandomNumber: (...args) => mockGetRandomNumber(...args),
    doubleTheNumber: (...args) => mockDoubleTheNumber(...args),
  }),
}));

jest.mock("../../common/components/CustomBackdrop/v1", () => ({
  __esModule: true,
  default: ({ shouldActive }) => (
    <div data-testid="backdrop">{String(shouldActive)}</div>
  ),
}));

import UseConsolidatedTesterV1 from "./UseConsolidatedTesterV1";

describe("UseConsolidatedTesterV1", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("toggles CustomBackdrop when Show Backdrop is clicked", async () => {
    render(<UseConsolidatedTesterV1 />);

    // initial value from useState("no")
    expect(screen.getByTestId("backdrop")).toHaveTextContent("no");

    fireEvent.click(
      screen.getByRole("button", {
        name: /Show Backdrop/i,
      })
    );

    expect(screen.getByTestId("backdrop")).toHaveTextContent("yes");

    // showBackdrop schedules hideBackdrop after 7000ms
    jest.advanceTimersByTime(7000);
    await waitFor(() => {
      expect(screen.getByTestId("backdrop")).toHaveTextContent("no");
    });
  });
});

