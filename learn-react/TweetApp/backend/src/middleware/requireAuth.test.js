const jwt = require("jsonwebtoken");
const { requireAuth, JWT_SECRET } = require("./requireAuth");

describe("requireAuth middleware", () => {
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  }

  it("returns 401 when Authorization header is missing", () => {
    const req = { headers: {} };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.stringContaining("Missing or invalid Authorization"),
      })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization does not start with Bearer ", () => {
    const req = { headers: { authorization: "Basic abc123" } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("returns 401 when token is empty after Bearer", () => {
    const req = { headers: { authorization: "Bearer " } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Missing token" })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("returns 401 for invalid JWT and calls next for valid token", () => {
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw new Error("invalid");
    });
    const req = { headers: { authorization: "Bearer invalid-token" } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockNext).not.toHaveBeenCalled();
    jwt.verify.mockRestore();
  });

  it("returns 401 with 'Token expired' when token is expired", () => {
    const err = new Error("jwt expired");
    err.name = "TokenExpiredError";
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw err;
    });
    const req = { headers: { authorization: "Bearer expired-token" } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Token expired" })
    );
    expect(mockNext).not.toHaveBeenCalled();
    jwt.verify.mockRestore();
  });

  it("returns 401 with 'Invalid token' for JsonWebTokenError", () => {
    const err = new Error("jwt malformed");
    err.name = "JsonWebTokenError";
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      throw err;
    });
    const req = { headers: { authorization: "Bearer bad-token" } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Invalid token" })
    );
    expect(mockNext).not.toHaveBeenCalled();
    jwt.verify.mockRestore();
  });

  it("sets req.user and calls next when token is valid", () => {
    const decoded = { userId: "user123", userName: "Test" };
    jest.spyOn(jwt, "verify").mockReturnValueOnce(decoded);
    const req = { headers: { authorization: "Bearer valid-token" } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(jwt.verify).toHaveBeenCalledWith("valid-token", JWT_SECRET);
    expect(req.user).toEqual(decoded);
    expect(mockNext).toHaveBeenCalledWith();
    expect(res.status).not.toHaveBeenCalled();
    jwt.verify.mockRestore();
  });

  it("trims token when Bearer value has extra spaces", () => {
    const decoded = { userId: "user123" };
    jest.spyOn(jwt, "verify").mockReturnValueOnce(decoded);
    const req = { headers: { authorization: "Bearer  token-with-spaces  " } };
    const res = mockRes();
    requireAuth(req, res, mockNext);
    expect(jwt.verify).toHaveBeenCalledWith("token-with-spaces", expect.any(String));
    expect(mockNext).toHaveBeenCalled();
    jwt.verify.mockRestore();
  });
});
