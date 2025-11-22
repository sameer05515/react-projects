import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../../../common/components/Smart/Editor/v4", () => ({
  __esModule: true,
  default: ({ initialValue }) => (
    <div data-testid="smart-editor-mock">
      SmartEditorV4 Mock: {initialValue?.content || ""}
    </div>
  ),
}));

jest.mock("../../../common/components/toggleable-panel/ToggleablePanel", () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <div>
      <div>{title}</div>
      {children}
    </div>
  ),
}));

jest.mock("../../../common/hoc/modal/ModalV3", () => ({
  __esModule: true,
  default: ({ isOpen, children }) =>
    isOpen ? <div data-testid="modal-mock">{children}</div> : null,
}));

jest.mock("../../../common/components/custom-button/CustomButton", () => ({
  __esModule: true,
  default: ({ onClick, children, className }) => (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  ),
}));

import SmartEditorV4Dashboard_V1_0_0 from "./SmartEditorV4Dashboard_V1_0_0";
import { smartPreviewerDataArray } from "../common/data";

describe("ApnaPlayground/smart-editor/main/SmartEditorV4Dashboard_V1_0_0", () => {
  it("renders the current data title and cycles on Next click", () => {
    render(<SmartEditorV4Dashboard_V1_0_0 />);

    expect(screen.getByText(smartPreviewerDataArray[0].title)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(screen.getByText(smartPreviewerDataArray[1].title)).toBeInTheDocument();
  });

  it("opens a modal and renders the SmartEditor inside when Show Modal is clicked", () => {
    render(<SmartEditorV4Dashboard_V1_0_0 />);

    expect(screen.queryByTestId("modal-mock")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show Modal/i }));

    expect(screen.getByTestId("modal-mock")).toBeInTheDocument();
    expect(screen.getAllByTestId("smart-editor-mock").length).toBeGreaterThan(0);
  });
});

