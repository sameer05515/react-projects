import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("@ckeditor/ckeditor5-build-classic", () => ({}));
jest.mock("@ckeditor/ckeditor5-react", () => ({
  __esModule: true,
  CKEditor: () => <div data-testid="ckeditor-mock" />,
}));

jest.mock("../Previewer/v4", () => ({
  __esModule: true,
  default: ({ data }) => (
    <div data-testid="smart-previewer-mock">{data?.content || ""}</div>
  ),
}));

import SmartEditorV4 from "./v4";

describe("common/components/Smart/Editor/v4", () => {
  it("renders textarea for TextArea input and shows preview by default", () => {
    render(
      <SmartEditorV4
        initialValue={{
          content: "Hello Smart Editor",
          textOutputType: "text",
          textInputType: "TextArea",
        }}
        onSubmit={jest.fn()}
      />
    );

    const textarea = screen.getByRole("textbox", { name: /Content/i });
    expect(textarea).toHaveValue("Hello Smart Editor");

    // Preview is shown because previewInitialValue defaults to true.
    expect(screen.getByTestId("smart-previewer-mock")).toHaveTextContent(
      "Hello Smart Editor"
    );

    expect(
      screen.getByRole("button", { name: /Hide Preview/i })
    ).toBeInTheDocument();
  });

  it("shows validation message when content is emptied", () => {
    render(
      <SmartEditorV4
        initialValue={{
          content: "Hello",
          textOutputType: "text",
          textInputType: "TextArea",
        }}
        onSubmit={jest.fn()}
      />
    );

    const textarea = screen.getByRole("textbox", { name: /Content/i });
    fireEvent.change(textarea, { target: { value: "" } });

    expect(screen.getByText(/Content cannot be empty/i)).toBeInTheDocument();
  });

  it("calls onSubmit on Save and renders returned messages", async () => {
    const onSubmit = jest.fn(() =>
      Promise.resolve({
        isError: false,
        messages: [{ type: "info", message: "Saved successfully!" }],
      })
    );

    render(
      <SmartEditorV4
        initialValue={{
          content: "Hello Save",
          textOutputType: "text",
          textInputType: "TextArea",
        }}
        onSubmit={onSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    expect(
      await screen.findByText(/Saved successfully!/i)
    ).toBeInTheDocument();
  });
});

