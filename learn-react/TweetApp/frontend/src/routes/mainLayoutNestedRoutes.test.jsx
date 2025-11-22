/** Avoid loading Welcome → CKEditor (ESM) when only testing route composition. */
jest.mock("./Welcome/v2", () => ({
  __esModule: true,
  default: function MockWelcome() {
    return null;
  },
}));

import { getMainLayoutNestedRouteElements } from "./mainLayoutNestedRoutes";

describe("mainLayoutNestedRoutes", () => {
  it("returns route elements for authenticated layout", () => {
    const elements = getMainLayoutNestedRouteElements(true);
    expect(Array.isArray(elements)).toBe(true);
    expect(elements.length).toBeGreaterThan(8);
  });

  it("returns route elements for unauthenticated layout", () => {
    const elements = getMainLayoutNestedRouteElements(false);
    expect(Array.isArray(elements)).toBe(true);
    expect(elements.length).toBeGreaterThan(8);
  });
});
