import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const postUpdateClick = jest.fn();

jest.mock("@ckeditor/ckeditor5-react", () => ({
  __esModule: true,
  CKEditor: ({ onChange, data }) => (
    <button
      type="button"
      data-testid="ckeditor-mock"
      onClick={() => onChange?.({}, { getData: () => "Edited Value" })}
    >
      {data}
    </button>
  ),
}));

jest.mock("@ckeditor/ckeditor5-build-classic", () => ({}));

jest.mock("../Smart/Editor/v3", () => ({
  __esModule: true,
  SmartPreviewer: ({ data }) => <div>{data?.content}</div>,
}));

jest.mock("../custom-button/CustomButton", () => ({
  __esModule: true,
  default: ({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

import EditableLabel from "./EditableLabel";

describe("common/components/editable-label/EditableLabel", () => {
  beforeEach(() => {
    postUpdateClick.mockClear();
  });

  it("enters edit mode on double click and calls postUpdateClick on Update", () => {
    render(
      <EditableLabel
        text="Hello"
        postUpdateClick={postUpdateClick}
        cancelButtonText="Cancel"
        submitButtonText="Update"
        editable={true}
        editMode={false}
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();

    fireEvent.doubleClick(screen.getByText("Hello"));
    expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("ckeditor-mock"));
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    expect(postUpdateClick).toHaveBeenCalledTimes(1);
    expect(postUpdateClick).toHaveBeenCalledWith("Edited Value");
  });

  it("does not enter edit mode when editable is false", () => {
    render(
      <EditableLabel
        text="Hello"
        postUpdateClick={postUpdateClick}
        editable={false}
        editMode={false}
      />
    );

    fireEvent.doubleClick(screen.getByText("Hello"));

    expect(screen.queryByRole("button", { name: /Update/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Cancel/i })).not.toBeInTheDocument();
  });
});

