import { observations, smartPreviewerDataArray } from "./data";

describe("ApnaPlayground/smart-editor/common/data", () => {
  it("exports expected observation text", () => {
    expect(typeof observations).toBe("string");
    expect(observations).toMatch(/SmartEditorV3/i);
    expect(observations).toMatch(/SmartEditorV4/i);
  });

  it("exports smartPreviewerDataArray with required items", () => {
    expect(Array.isArray(smartPreviewerDataArray)).toBe(true);
    expect(smartPreviewerDataArray.length).toBeGreaterThanOrEqual(3);

    const [first] = smartPreviewerDataArray;
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("title");
    expect(first).toHaveProperty("data");
  });

  it("includes an entry with null data (show-empty-content)", () => {
    const empty = smartPreviewerDataArray.find(
      (x) => x.id === "show-empty-content"
    );
    expect(empty).toBeTruthy();
    expect(empty.data).toBe(null);
  });
});

