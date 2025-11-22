import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import WysiwygEditor from "./WysiwygEditor";

describe("common/components/wysiwyg-editor/WysiwygEditor", () => {
  it("renders preview HTML from textarea input", () => {
    const { container } = render(<WysiwygEditor />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "<b>Hi</b> there" },
    });

    const previewDiv =
      textarea.nextElementSibling || container.querySelector('div[style*="margin-top"]');
    expect(previewDiv).toBeTruthy();
    expect(previewDiv.textContent).toContain("Hi");
  });
});

