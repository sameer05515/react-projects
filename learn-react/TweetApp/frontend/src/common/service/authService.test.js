import jwtDecode from "jwt-decode";
import {
  clearToken,
  getToken,
  getUserIdFromToken,
  getUserNameFromToken,
  isAuthenticated,
  storeToken,
} from "./authService";

jest.mock("jwt-decode", () => jest.fn());

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore?.();
  });

  it("storeToken and getToken round-trip", () => {
    storeToken("abc");
    expect(getToken()).toBe("abc");
    expect(localStorage.getItem("token")).toBe("abc");
  });

  it("getUserIdFromToken decodes token and stores userId", () => {
    storeToken("fake.jwt");
    jwtDecode.mockReturnValue({ userId: "user-42" });

    expect(getUserIdFromToken()).toBe("user-42");
    expect(jwtDecode).toHaveBeenCalledWith("fake.jwt");
    expect(localStorage.getItem("userId")).toBe("user-42");
  });

  it("getUserNameFromToken decodes token and stores userName", () => {
    storeToken("fake.jwt");
    jwtDecode.mockReturnValue({ userName: "Ada" });

    expect(getUserNameFromToken()).toBe("Ada");
    expect(localStorage.getItem("userName")).toBe("Ada");
  });

  it("getUserIdFromToken returns null when no token", () => {
    expect(getUserIdFromToken()).toBeNull();
    expect(jwtDecode).not.toHaveBeenCalled();
  });

  it("getUserIdFromToken returns null when jwtDecode throws", () => {
    storeToken("bad");
    jwtDecode.mockImplementation(() => {
      throw new Error("invalid");
    });
    expect(getUserIdFromToken()).toBeNull();
  });

  it("clearToken removes token and userId", () => {
    localStorage.setItem("token", "t");
    localStorage.setItem("userId", "u");
    clearToken();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });

  it("isAuthenticated returns false when no token", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("isAuthenticated returns true for non-expired token", () => {
    storeToken("t");
    const future = Math.floor(Date.now() / 1000) + 3600;
    jwtDecode.mockReturnValue({ exp: future });
    expect(isAuthenticated()).toBe(true);
  });

  it("isAuthenticated returns false for expired token", () => {
    storeToken("t");
    jwtDecode.mockReturnValue({ exp: 1 });
    expect(isAuthenticated()).toBe(false);
  });
});
