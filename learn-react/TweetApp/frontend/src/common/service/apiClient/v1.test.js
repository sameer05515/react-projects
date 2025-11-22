import axios from "axios";
import { apiRequest } from "./v1";

jest.mock("axios", () => {
  const fn = jest.fn();
  fn.isAxiosError = jest.fn();
  return fn;
});

describe("apiRequest", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    axios.mockReset();
    axios.isAxiosError.mockReset();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("returns data when axios succeeds", async () => {
    axios.mockResolvedValue({ data: { ok: true, id: 5 } });

    const res = await apiRequest({ method: "get", url: "/items" });

    expect(axios).toHaveBeenCalledWith({ method: "get", url: "/items" });
    expect(res).toEqual({ data: { ok: true, id: 5 }, isError: false, message: "" });
  });

  it("returns string message for axios error with string response data", async () => {
    const err = { message: "fail", response: { data: "Not allowed" } };
    axios.mockRejectedValue(err);
    axios.isAxiosError.mockReturnValue(true);

    const res = await apiRequest({ method: "post", url: "/x" });

    expect(res.isError).toBe(true);
    expect(res.data).toBeNull();
    expect(res.message).toBe("Not allowed");
  });

  it("stringifies non-string axios error response data", async () => {
    const err = { message: "x", response: { data: { code: 1 } } };
    axios.mockRejectedValue(err);
    axios.isAxiosError.mockReturnValue(true);

    const res = await apiRequest({ method: "get", url: "/x" });
    expect(res.message).toBe('{"code":1}');
  });

  it("handles non-axios errors (JSON.stringify payload)", async () => {
    axios.mockRejectedValue({ code: "E_FAIL", detail: "nope" });
    axios.isAxiosError.mockReturnValue(false);

    const res = await apiRequest({ method: "get", url: "/x" });
    expect(res.isError).toBe(true);
    expect(res.data).toBeNull();
    expect(res.message).toBe(JSON.stringify({ code: "E_FAIL", detail: "nope" }));
  });
});
