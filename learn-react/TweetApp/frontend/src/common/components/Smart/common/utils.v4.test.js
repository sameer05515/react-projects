import React from "react";
import { render, screen } from "@testing-library/react";

import {
  SupportedOutFormats,
  SupportedInputComponents,
  getKeyName,
  getDetailedName,
  getInpOupDetailsForKey,
  getComboOptions,
  getSmartPreviewerProcessedData,
  validateSmartContent,
} from "./utils.v4";

describe("common/components/Smart/common/utils.v4", () => {
  it("getKeyName maps text + TextArea to RT_from_RT", () => {
    expect(getKeyName("text", "TextArea")).toBe("RT_from_RT");
  });

  it("getInpOupDetailsForKey maps RT_from_RT to text/output TextArea input", () => {
    expect(getInpOupDetailsForKey("RT_from_RT")).toEqual({
      textOutputType: "text",
      textInputType: "TextArea",
    });
  });

  it("getComboOptions renders options for all mappings", () => {
    render(
      <select aria-label="OutputTypeCombobox">{getComboOptions()}</select>
    );

    // Spot-check known keys.
    expect(screen.getByRole("option", { name: /RT from RT/i })).toBeInTheDocument();
  });

  it("getSmartPreviewerProcessedData returns content for TEXT", () => {
    const { content, textOutputType, yamlProcessedData, resultData, errorMessage } =
      getSmartPreviewerProcessedData({
        content: "hello",
        textOutputType: SupportedOutFormats.TEXT,
      });

    expect(content).toBe("hello");
    expect(textOutputType).toBe(SupportedOutFormats.TEXT);
    expect(yamlProcessedData).toBe(null);
    expect(resultData).toEqual([]);
    expect(errorMessage).toBe("");
  });

  it("validateSmartContent returns YAML parsing error for invalid YAML", () => {
    const err = validateSmartContent("a: [1, 2", SupportedOutFormats.YAML);
    expect(typeof err).toBe("string");
    expect(err).toMatch(/Error parsing YAML/i);
  });

  it("validateSmartContent returns empty string for valid YAML", () => {
    const err = validateSmartContent("a: 1", SupportedOutFormats.YAML);
    expect(err).toBe("");
  });

  it("getSmartPreviewerProcessedData sets errorMessage for invalid YAML", () => {
    const { errorMessage } = getSmartPreviewerProcessedData({
      content: "a: [1, 2",
      textOutputType: SupportedOutFormats.YAML,
    });
    expect(errorMessage).toMatch(/Error parsing YAML/i);
  });
});

