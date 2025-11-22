import {
  calculateNextPrev,
  componentNames,
  getComponentDetails,
} from "./utils";

describe("ApnaPlayground/utils", () => {
  it("exports a non-empty registry and includes canonical keys", () => {
    expect(componentNames.length).toBeGreaterThan(0);
    expect(componentNames).toContain("MetaLearningCycle");
    expect(componentNames).toContain("MyFormWithValidation");
  });

  it("does not expose quarantined versioned keys (v1/v2/v3) for collapsed demos", () => {
    // These were present before quarantine; they should not appear in the active playground list.
    expect(componentNames).not.toContain("MetaLearningCycleV1");
    expect(componentNames).not.toContain("MetaLearningCycleV2");
    expect(componentNames).not.toContain("MetaLearningCycleV3");

    expect(componentNames).not.toContain("MyFormWithValidationV1");
    expect(componentNames).not.toContain("MyFormWithValidationV2");
  });

  it("calculateNextPrev cycles correctly", () => {
    const { next, prev } = calculateNextPrev(0);
    expect(next).toBe(componentNames[1]);
    expect(prev).toBe(componentNames[componentNames.length - 1]);
  });

  it("getComponentDetails returns null LazyComponent for unknown keys", () => {
    const res = getComponentDetails("does-not-exist");
    expect(res.LazyComponent).toBe(null);
    expect(res.next).toBe("");
    expect(res.prev).toBe("");
  });
});

