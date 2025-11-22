import { getToken } from "./authService";
import {
  getBearerToken,
  mergeAuthorizationIntoAxiosConfig,
  mergeAuthorizationIntoFetchHeaders,
} from "./authRequest";

jest.mock("./authService", () => ({
  getToken: jest.fn(),
}));

describe("authRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBearerToken", () => {
    it("returns null when getToken returns null", () => {
      getToken.mockReturnValue(null);
      expect(getBearerToken()).toBeNull();
    });

    it("returns token from getToken when present", () => {
      getToken.mockReturnValue("abc.jwt.token");
      expect(getBearerToken()).toBe("abc.jwt.token");
    });
  });

  describe("mergeAuthorizationIntoAxiosConfig", () => {
    it("returns config unchanged when there is no token", () => {
      getToken.mockReturnValue(null);
      const config = { headers: { "X-Custom": "1" } };
      const out = mergeAuthorizationIntoAxiosConfig(config);
      expect(out).toBe(config);
      expect(out.headers.Authorization).toBeUndefined();
    });

    it("sets Authorization Bearer header when token exists", () => {
      getToken.mockReturnValue("secret");
      const config = { headers: {} };
      mergeAuthorizationIntoAxiosConfig(config);
      expect(config.headers.Authorization).toBe("Bearer secret");
    });

    it("creates headers object when missing", () => {
      getToken.mockReturnValue("t");
      const config = {};
      mergeAuthorizationIntoAxiosConfig(config);
      expect(config.headers.Authorization).toBe("Bearer t");
    });
  });

  describe("mergeAuthorizationIntoFetchHeaders", () => {
    it("returns Headers without Authorization when no token", () => {
      getToken.mockReturnValue(null);
      const h = mergeAuthorizationIntoFetchHeaders({ "Content-Type": "application/json" });
      expect(h.get("Content-Type")).toBe("application/json");
      expect(h.get("Authorization")).toBeNull();
    });

    it("merges Authorization when token exists", () => {
      getToken.mockReturnValue("tok");
      const h = mergeAuthorizationIntoFetchHeaders();
      expect(h.get("Authorization")).toBe("Bearer tok");
    });
  });
});
