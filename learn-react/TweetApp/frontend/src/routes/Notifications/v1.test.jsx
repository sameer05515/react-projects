import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../../common/hooks/useMemoryManagementApis/v1", () => {
  const payload = {
    data: { name: "Test Map", skeleton: "sk" },
    isError: false,
    message: "ok",
  };
  async function getMemoryMap() {
    return payload;
  }
  return {
    __esModule: true,
    default: () => ({ getMemoryMap }),
  };
});

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: () => false,
}));

jest.mock("../../common/components/Smart/Editor/v3", () => {
  const React = require("react");
  return {
    __esModule: true,
    availableOutputTypes: { MARKDOWN: "markdown", SKELETON: "skeleton" },
    SmartPreviewer: ({ data }) =>
      React.createElement(
        "div",
        {
          "data-testid": `previewer-${data?.textOutputType ?? "x"}`,
        },
        String(data?.content ?? "")
      ),
  };
});

const { default: Notifications } = require("./v1");

describe("routes/Notifications/v1", () => {
  it("hook mock resolves with map payload", async () => {
    const useMemoryManagementApis = require("../../common/hooks/useMemoryManagementApis/v1")
      .default;
    const result = await useMemoryManagementApis().getMemoryMap("any-id");
    expect(result).toMatchObject({
      data: { name: "Test Map", skeleton: "sk" },
      isError: false,
      message: "ok",
    });
  });

  it("loads memory map and shows success status", async () => {
    render(<Notifications />);

    await waitFor(() => {
      expect(screen.getByTestId("previewer-markdown")).toHaveTextContent(
        "Test Map"
      );
    });

    expect(screen.getByText(/Success/i)).toBeInTheDocument();
    expect(screen.getByText("ok")).toBeInTheDocument();
  });
});
