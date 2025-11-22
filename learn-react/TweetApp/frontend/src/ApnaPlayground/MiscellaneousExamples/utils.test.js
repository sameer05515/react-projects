jest.mock(
  "../smart-editor/main/SmartEditorV4Dashboard_V1_0_0",
  () => {
    const React = require("react");
    return {
      __esModule: true,
      default: () =>
        React.createElement(
          "div",
          { "data-testid": "smart-editor-v4-stub" },
          "stub"
        ),
    };
  }
);

jest.mock(
  "../UseConsolidatedTesters/UseConsolidatedTesterDashboard",
  () => {
    const React = require("react");
    return {
      __esModule: true,
      default: () =>
        React.createElement(
          "div",
          { "data-testid": "use-consolidated-stub" },
          "stub"
        ),
    };
  }
);

jest.mock("./dnd-playground/MonthList", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement("div", null, "MonthList stub"),
  };
});

jest.mock("./dnd-playground/TreeList", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement("div", null, "TreeList stub"),
  };
});

jest.mock("./dnd-playground/TreeListV2", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement("div", null, "TreeListV2 stub"),
  };
});

jest.mock("./dnd-playground/TreeListV3", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement("div", null, "TreeListV3 stub"),
  };
});

jest.mock("./dnd-playground/TreeListV4", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: () => React.createElement("div", null, "TreeListV4 stub"),
  };
});

const { getComponentDetails, getNextNthOption } = require("./utils");

describe("ApnaPlayground/MiscellaneousExamples/utils", () => {
  it("getNextNthOption returns null for unknown selected value", () => {
    expect(getNextNthOption("does-not-exist", 1)).toBeNull();
    expect(getNextNthOption("does-not-exist", -1)).toBeNull();
  });

  it("getNextNthOption returns an option object for known selected values (handles negative n)", () => {
    const forward = getNextNthOption("MyTest", 1);
    expect(forward).not.toBeNull();
    expect(forward).toHaveProperty("value");
    expect(forward).toHaveProperty("label");

    const backward = getNextNthOption("MyTest", -1);
    expect(backward).not.toBeNull();
    expect(backward).toHaveProperty("value");
    expect(backward).toHaveProperty("label");

    // Basic sanity: returned label should mention the returned value
    expect(forward.label).toContain(String(forward.value));
    expect(backward.label).toContain(String(backward.value));
  });

  it("getComponentDetails provides safe defaults when key exists but module is missing", () => {
    // NonExistingComponent has no explicit module in the map; should fall back to TestingPurpose.
    const details = getComponentDetails("NonExistingComponent");
    expect(details).toBeTruthy();
    expect(details).toHaveProperty("module");
    expect(details).toHaveProperty("componentLabel");
    expect(details.componentLabel).toContain("NonExistingComponent");
  });
});

