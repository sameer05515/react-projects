import { authenticatedFetch } from "../../service/authenticatedFetch";
import { fetchFnWrapper, prepareErrorMessage } from "./utils";

jest.mock("../../service/authenticatedFetch", () => ({
  authenticatedFetch: jest.fn(),
}));

describe("useDataFetching utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("prepareErrorMessage", () => {
    it("returns default when error is falsy", () => {
      expect(prepareErrorMessage(null, "d")).toBe("d");
      expect(prepareErrorMessage(undefined, "d")).toBe("d");
    });

    it("returns non-empty string errors as-is", () => {
      expect(prepareErrorMessage("  boom  ", "d")).toBe("  boom  ");
    });

    it("uses error.message when present", () => {
      expect(prepareErrorMessage(new Error("e1"), "d")).toBe("e1");
    });

    it("stringifies object errors", () => {
      expect(prepareErrorMessage({ code: 1 }, "d")).toBe('{"code":1}');
    });
  });

  describe("fetchFnWrapper", () => {
    it("returns error payload when url is missing", async () => {
      const out = await fetchFnWrapper({ url: null, options: {} });
      expect(out.isError).toBe(true);
      expect(out.data).toBeNull();
      expect(out.message).toMatch(/Url should not be null/);
      expect(authenticatedFetch).not.toHaveBeenCalled();
    });

    it("returns data on successful json response", async () => {
      authenticatedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1 }),
      });
      const out = await fetchFnWrapper({ url: "https://api.test/x", options: {} });
      expect(out.isError).toBe(false);
      expect(out.data).toEqual({ id: 1 });
      expect(out.message).toBe("");
    });

    it("returns error when response is not ok", async () => {
      authenticatedFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      });
      const out = await fetchFnWrapper({ url: "https://api.test/x", options: {} });
      expect(out.isError).toBe(true);
      expect(out.data).toBeNull();
      expect(out.message).toMatch(/500/);
    });
  });
});
