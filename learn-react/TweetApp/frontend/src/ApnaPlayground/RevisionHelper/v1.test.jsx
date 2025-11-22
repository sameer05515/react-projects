import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Prevent mount-time effects from running (component calls apiRequest in useEffect).
jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useEffect: jest.fn(),
  };
});

jest.mock("../../common/service/apiClient/v1", () => ({
  __esModule: true,
  apiRequest: jest.fn(() => ({
    then: (resolve) => {
      resolve({ data: [] });
      return { catch: () => {} };
    },
    catch: () => {},
  })),
}));

import { apiRequest } from "../../common/service/apiClient/v1";
import RevisionHelperV1 from "./v1";

describe("RevisionHelperV1", () => {
  it("does not save when required fields are empty", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<RevisionHelperV1 />);

    // useEffect is mocked out; apiRequest should not have been called on mount.
    expect(apiRequest).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
    // Still should have only the initial GET calls, no POST.
    const postCalls = apiRequest.mock.calls.filter(
      (call) => call[0]?.method === "post"
    );
    expect(postCalls.length).toBe(0);

    consoleLogSpy.mockRestore();
  });

});

