import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }) => {
    const text = typeof children === "string" ? children : String(children ?? "");
    const match = text.match(/\*\*(.+?)\*\*/);

    return match ? <strong>{match[1]}</strong> : <span>{text}</span>;
  },
}));

jest.mock("remark-gfm", () => () => []);
jest.mock("rehype-highlight", () => () => []);

import MarkdownComponent from "./MarkdownComponent";

describe("common/components/markdown-component/MarkdownComponent", () => {
  it("renders markdown bold content", () => {
    render(<MarkdownComponent markdownText="**bold**" />);

    const bold = screen.getByText("bold");
    expect(bold.tagName.toLowerCase()).toBe("strong");
  });
});

