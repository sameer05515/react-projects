import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockFetchThinkTankItems = jest.fn(() => Promise.resolve({ data: [] }));
const mockSaveThinkTankItem = jest.fn(() => Promise.resolve({ isError: false, data: { uniqueId: "id-1" } }));
const mockUpdateThinkTankItem = jest.fn(() => Promise.resolve({ isError: false, data: {} }));

jest.mock("../../components/my-reports/ThinkTank/data", () => ({
  __esModule: true,
  myTodos: [
    {
      createdDate: "2024-01-01",
      itemType: "TODO",
      smartContent: { textOutputType: "html", content: "x", textInputType: "TextArea" },
    },
    {
      createdDate: "2024-01-02",
      itemType: "TODO",
      smartContent: { textOutputType: "html", content: "y", textInputType: "TextArea" },
    },
  ],
}));

jest.mock("../../components/my-reports/ThinkTank/utils/ThinkTankApiServices", () => ({
  __esModule: true,
  fetchThinkTankItems: (...args) => mockFetchThinkTankItems(...args),
  saveThinkTankItem: (...args) => mockSaveThinkTankItem(...args),
  updateThinkTankItem: (...args) => mockUpdateThinkTankItem(...args),
}));

jest.mock("../../common/hooks/useConsolidated/message-preparation-utils", () => ({
  __esModule: true,
  prepareErrorMessage: (err) => `prepared: ${String(err?.message ?? err)}`,
}));

jest.mock("../sample-promises", () => ({
  __esModule: true,
  delayForMS: () => Promise.resolve(),
}));

import TestHttpV1 from "./v1";

describe("TestHttpV1", () => {
  it("shows total todos count and validates dates to populate messages", async () => {
    render(<TestHttpV1 />);

    expect(
      screen.getByRole("heading", { name: /Total Todos:/i })
    ).toHaveTextContent("2");

    fireEvent.click(screen.getByRole("button", { name: /Validate dates/i }));

    // Should render per-todo messages containing createdDate values
    await waitFor(() => {
      expect(screen.getByText(/2024-01-01/)).toBeInTheDocument();
      expect(screen.getByText(/2024-01-02/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Clear Messages/i }));

    await waitFor(() => {
      expect(screen.queryByText(/2024-01-01/)).not.toBeInTheDocument();
      expect(screen.queryByText(/2024-01-02/)).not.toBeInTheDocument();
    });
  });

  it("blocks Save All Old Todos and does not call saveThinkTankItem", async () => {
    render(<TestHttpV1 />);

    fireEvent.click(
      screen.getByRole("button", { name: /Save All Old Todos/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/one time activity/i)).toBeInTheDocument();
      expect(screen.getByText(/blocked/i)).toBeInTheDocument();
    });

    expect(mockSaveThinkTankItem).not.toHaveBeenCalled();
    expect(mockUpdateThinkTankItem).not.toHaveBeenCalled();
  });
});

