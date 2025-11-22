import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("../../common/components/Smart/Editor/v3", () => ({
  __esModule: true,
  availableOutputTypes: { HTML: "html" },
  SmartPreviewer: ({ data }) => (
    <div data-testid="smart-previewer-mock">{data?.content ?? ""}</div>
  ),
}));

jest.mock("../../ApnaPlayground/MetaLearningCycle", () => ({
  __esModule: true,
  default: () => <div data-testid="meta-learning-mock">MetaLearningCycle</div>,
}));

import WelcomeV2 from "./v2";

describe("routes/Welcome/v2", () => {
  it("renders welcome header and learning steps", () => {
    render(<WelcomeV2 />);

    expect(
      screen.getByRole("heading", { name: /Welcome Bro!!/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/1: Stay calm/i)).toBeInTheDocument();
    expect(screen.getByText(/Stay calm → Review/i)).toBeInTheDocument();

    expect(screen.getByTestId("smart-previewer-mock")).toBeInTheDocument();
    expect(screen.getByTestId("meta-learning-mock")).toBeInTheDocument();
  });
});
