const {
  sendStandardResponse,
  ResponseStatus,
} = require("./StandardResponse");

describe("StandardResponse", () => {
  describe("ResponseStatus", () => {
    it("has expected status constants", () => {
      expect(ResponseStatus.Success).toBe("SUCCESS");
      expect(ResponseStatus.ValidationFailed).toBe("VALIDATION_ERROR");
      expect(ResponseStatus.DatabaseRelatedError).toBe("DATABASE_ERROR");
      expect(ResponseStatus.Error).toBe("ERROR");
    });
  });

  describe("sendStandardResponse", () => {
    it("calls res.status and res.json with status, messages, data, statusCode and timeStamp", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      sendStandardResponse(
        res,
        "SUCCESS",
        ["Done"],
        { id: 1 },
        200
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      const payload = res.json.mock.calls[0][0];
      expect(payload.status).toBe("SUCCESS");
      expect(payload.messages).toEqual(["Done"]);
      expect(payload.data).toEqual({ id: 1 });
      expect(payload.statusCode).toBe(200);
      expect(payload.timeStamp).toBeDefined();
      expect(new Date(payload.timeStamp).toISOString()).toBe(payload.timeStamp);
    });

    it("appends routerResponse.message to messages when provided", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      sendStandardResponse(
        res,
        "ERROR",
        ["First"],
        null,
        400,
        { message: "From router" }
      );
      const payload = res.json.mock.calls[0][0];
      expect(payload.messages).toEqual(["First", "From router"]);
    });

    it("does not add message when routerResponse has no message", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      sendStandardResponse(res, "SUCCESS", [], null, 200, {});
      expect(res.json.mock.calls[0][0].messages).toEqual([]);
    });
  });
});
