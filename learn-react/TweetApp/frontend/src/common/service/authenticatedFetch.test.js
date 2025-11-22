import { clearToken, getToken } from "./authService";
import { authenticatedFetch } from "./authenticatedFetch";

jest.mock("./authService", () => ({
  clearToken: jest.fn(),
  getToken: jest.fn(),
}));

describe("authenticatedFetch", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("calls fetch with Headers from auth merge", async () => {
    getToken.mockReturnValue(null);
    const response = { status: 200, ok: true };
    global.fetch.mockResolvedValue(response);

    const out = await authenticatedFetch("https://api.test/x", { method: "GET" });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, init] = global.fetch.mock.calls[0];
    expect(init.method).toBe("GET");
    expect(init.headers).toBeInstanceOf(Headers);
    expect(out).toBe(response);
  });

  it("on 401 clears token and redirects to login when not already on login", async () => {
    const hrefSetter = jest.fn();
    delete window.location;
    window.location = {
      pathname: "/dashboard",
      get href() {
        return this._href || "";
      },
      set href(v) {
        hrefSetter(v);
        this._href = v;
      },
    };

    getToken.mockReturnValue(null);
    global.fetch.mockResolvedValue({ status: 401, ok: false });

    await authenticatedFetch("https://api.test/secure");

    expect(clearToken).toHaveBeenCalled();
    expect(hrefSetter).toHaveBeenCalledWith("/login");
  });

  it("on 401 does not redirect when already on /login", async () => {
    const hrefSetter = jest.fn();
    delete window.location;
    window.location = {
      pathname: "/login",
      get href() {
        return "";
      },
      set href(v) {
        hrefSetter(v);
      },
    };

    getToken.mockReturnValue(null);
    global.fetch.mockResolvedValue({ status: 401, ok: false });

    await authenticatedFetch("https://api.test/secure");

    expect(clearToken).toHaveBeenCalled();
    expect(hrefSetter).not.toHaveBeenCalled();
  });
});
