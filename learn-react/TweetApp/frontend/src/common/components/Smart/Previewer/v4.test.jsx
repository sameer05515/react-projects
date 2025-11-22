import React from "react";
import { render, screen } from "@testing-library/react";

// Avoid importing heavy sub-components we don't need for TEXT/YAML rendering.
jest.mock(
  "../../../../components/memory-maps/copy-to-clipboard/CopyButton",
  () => ({
  __esModule: true,
  default: () => <div>CopyButtonMock</div>,
  })
);

jest.mock("../../markdown-component/MarkdownComponent", () => ({
  __esModule: true,
  default: () => <div>MarkdownMock</div>,
}));

jest.mock("../../tree-viewer/TreeViewer", () => ({
  __esModule: true,
  default: () => <div>TreeMock</div>,
}));

import SmartPreviewerV4 from "./v4";

describe("common/components/Smart/Previewer/v4", () => {
  it("renders text output content for SupportedOutFormats.TEXT", () => {
    render(
      <SmartPreviewerV4
        data={{
          content: "plain text",
          textOutputType: "text",
          textInputType: "TextArea",
        }}
      />
    );

    const pre = screen.getByText("plain text");
    expect(pre.tagName.toLowerCase()).toBe("pre");
  });

  it("shows YAML parsing error for invalid YAML", () => {
    render(
      <SmartPreviewerV4
        data={{
          content: "a: [1, 2",
          textOutputType: "yaml",
          textInputType: "TextArea",
        }}
      />
    );

    expect(screen.getByText(/Error parsing YAML/i)).toBeInTheDocument();
  });
});

