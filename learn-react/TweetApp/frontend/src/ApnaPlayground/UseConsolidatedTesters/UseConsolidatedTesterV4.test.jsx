import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const sampleFileId = "CONVERSATIONS_23_OCT_2024";

const mockFetchAllCGPTFiles = jest.fn(() =>
  Promise.resolve({ data: [], isError: false, message: "" })
);
const mockFetchCGPTFileForGivenUniqueId = jest.fn(() =>
  Promise.resolve({ data: { id: sampleFileId }, isError: false, message: "" })
);

const mockFetchCGPTFileForUIDAndConvUID = jest.fn(() =>
  Promise.resolve({ data: {}, isError: false, message: "" })
);
const mockFetchCGPTFileForUIDAndConvUIDAndMsgUID = jest.fn(() =>
  Promise.resolve({ data: {}, isError: false, message: "" })
);

const mockGetSectionData = jest.fn(() =>
  Promise.resolve({ data: {}, isError: false, message: "" })
);
const mockGetMemoryMap = jest.fn(() =>
  Promise.resolve({ data: {}, isError: false, message: "" })
);

jest.mock("../../common/hooks/useCGPTApis/v2", () => ({
  __esModule: true,
  default: () => ({
    fetchAllCGPTFiles: (...args) => mockFetchAllCGPTFiles(...args),
    fetchCGPTFileForGivenUniqueId: (...args) =>
      mockFetchCGPTFileForGivenUniqueId(...args),
    fetchCGPTFileForUIDAndConvUID: (...args) =>
      mockFetchCGPTFileForUIDAndConvUID(...args),
    fetchCGPTFileForUIDAndConvUIDAndMsgUID: (...args) =>
      mockFetchCGPTFileForUIDAndConvUIDAndMsgUID(...args),
  }),
}));

jest.mock("../../common/hooks/useTopicManagementApis/v1", () => ({
  __esModule: true,
  default: () => ({
    getSectionData: (...args) => mockGetSectionData(...args),
  }),
}));

jest.mock("../../common/hooks/useMemoryManagementApis/v1", () => ({
  __esModule: true,
  default: () => ({
    getMemoryMap: (...args) => mockGetMemoryMap(...args),
  }),
}));

import UseConsolidatedTesterV4 from "./UseConsolidatedTesterV4";

describe("UseConsolidatedTesterV4", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls fetchCGPTFileForGivenUniqueId when its button is clicked", async () => {
    render(<UseConsolidatedTesterV4 />);

    expect(
      screen.getByRole("heading", { name: /UseConsolidatedTesterV4/i })
    ).toBeInTheDocument();

    const uniqueIdButton = screen.getByRole("button", {
      name: /fetchCGPTFileForGivenUniqueId:/i,
    });

    fireEvent.click(uniqueIdButton);

    await waitFor(() => {
      expect(mockFetchCGPTFileForGivenUniqueId).toHaveBeenCalledWith(sampleFileId);
    });
  });
});

