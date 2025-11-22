import React from "react";

import { LoaderStates } from "./LoaderWithTitle";

const mockToastDismiss = jest.fn();
const mockToastClearQueue = jest.fn();
const mockToastUpdate = jest.fn();
const mockToastFn = jest.fn(() => "toast-1");

jest.mock("react-toastify", () => ({
  __esModule: true,
  toast: (() => {
    const t = (...args) => mockToastFn(...args);
    t.dismiss = (...args) => mockToastDismiss(...args);
    t.clearWaitingQueue = (...args) => mockToastClearQueue(...args);
    t.update = (...args) => mockToastUpdate(...args);
    t.TYPE = { INFO: "info" };
    return t;
  })(),
}));

import { notify, updateNotification } from "./toast-utils";

describe("common/hooks/useConsolidated/toast-utils", () => {
  beforeEach(() => {
    mockToastDismiss.mockClear();
    mockToastClearQueue.mockClear();
    mockToastUpdate.mockClear();
    mockToastFn.mockClear();

    // Keep the deterministic return value even after clearing call history.
    mockToastFn.mockImplementation(() => "toast-1");
  });

  it("notify dismisses previous notifications and creates a loading toast", () => {
    const toastId = notify("Loading test...");

    expect(mockToastDismiss).toHaveBeenCalledTimes(1);
    expect(mockToastClearQueue).toHaveBeenCalledTimes(1);
    expect(mockToastFn).toHaveBeenCalledTimes(1);
    expect(toastId).toBe("toast-1");

    const toastArg = mockToastFn.mock.calls[0][0];
    expect(React.isValidElement(toastArg)).toBe(true);
    expect(toastArg.props.title).toBe("Loading test...");
    expect(toastArg.props.state).toBe(LoaderStates.spinner);
  });

  it("updateNotification updates an existing toast when toastId is provided", () => {
    updateNotification("toast-99", "Done!", LoaderStates.success);

    expect(mockToastUpdate).toHaveBeenCalledTimes(1);
    const [toastId, updateObj] = mockToastUpdate.mock.calls[0];

    expect(toastId).toBe("toast-99");
    expect(updateObj.type).toBe("info");
    expect(React.isValidElement(updateObj.render)).toBe(true);
    expect(updateObj.render.props.title).toBe("Done!");
    expect(updateObj.render.props.state).toBe(LoaderStates.success);
  });

  it("updateNotification is a no-op when toastId is falsy", () => {
    updateNotification(null, "Ignored", LoaderStates.error);
    expect(mockToastUpdate).not.toHaveBeenCalled();
  });
});

