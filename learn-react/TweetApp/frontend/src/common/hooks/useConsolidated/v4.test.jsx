import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LoaderStates } from "./LoaderWithTitle";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  __esModule: true,
  useDispatch: () => mockDispatch,
}));

jest.mock("../../../redux/slices/backdropSlice", () => ({
  __esModule: true,
  showBackdrop: () => ({ type: "showBackdrop" }),
  hideBackdrop: () => ({ type: "hideBackdrop" }),
}));

const mockNotify = jest.fn(() => "toast-1");
const mockUpdateNotification = jest.fn();

jest.mock("./toast-utils", () => ({
  __esModule: true,
  notify: (...args) => mockNotify(...args),
  updateNotification: (...args) => mockUpdateNotification(...args),
}));

import useConsolidated from "./v4";

function Probe({ apiResult, validatorResult = true }) {
  const { executeApiRequest } = useConsolidated();
  const [res, setRes] = useState(null);

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const out = await executeApiRequest(
            () => Promise.resolve(apiResult),
            () => validatorResult,
            {
              loadingMessage: "Loading test",
              successMessage: "Success test",
              failureMessage: "Failure test",
              unexpectedErrorMessage: "Unexpected!",
            }
          );
          setRes(out);
        }}
      >
        run
      </button>
      {res && <div data-testid="res">{JSON.stringify(res)}</div>}
    </div>
  );
}

describe("common/hooks/useConsolidated/v4 executeApiRequest", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNotify.mockClear();
    mockUpdateNotification.mockClear();

    // Ensure mocked notify keeps returning a toast id.
    mockNotify.mockImplementation(() => "toast-1");
  });

  it("successfully returns data and calls notify/updateNotification/backdrop actions", async () => {
    render(<Probe apiResult={{ data: { ok: true }, isError: false, message: "m" }} />);

    fireEvent.click(screen.getByRole("button", { name: /run/i }));

    await waitFor(() => {
      expect(screen.getByTestId("res").textContent).toContain('"isError":false');
    });

    expect(mockNotify).toHaveBeenCalledTimes(1);
    expect(mockUpdateNotification).toHaveBeenCalledTimes(1);

    const [toastId, msg, state] = mockUpdateNotification.mock.calls[0];
    expect(toastId).toBe("toast-1");
    expect(msg).toBe("Success test");
    expect(state).toBe(LoaderStates.success);

    // Backdrop actions dispatched at least show/hide once.
    expect(mockDispatch).toHaveBeenCalledWith({ type: "showBackdrop" });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "hideBackdrop" });
  });

  it("returns isError=true and error message when result shape is invalid", async () => {
    // Missing `isError`/`message` will break validatePromiseResult.
    render(<Probe apiResult={{ data: { ok: true } }} validatorResult={true} />);

    fireEvent.click(screen.getByRole("button", { name: /run/i }));

    await waitFor(() => {
      expect(screen.getByTestId("res").textContent).toContain('"isError":true');
    });

    expect(mockUpdateNotification).toHaveBeenCalledTimes(1);
    const [toastId, msg, state] = mockUpdateNotification.mock.calls[0];
    expect(toastId).toBe("toast-1");
    expect(msg).toMatch(/expected structure/i);
    expect(state).toBe(LoaderStates.error);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "showBackdrop" });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "hideBackdrop" });
  });
});

