const {
  ValidationError,
  DatabaseError,
  NotFoundError,
  SuccessCongratulations,
} = require("./customResponseTypes");
const { StatusCodes } = require("http-status-codes");

describe("customResponseTypes (custom errors and success)", () => {
  describe("ValidationError", () => {
    it("is an Error with name ValidationError and statusCode BAD_REQUEST", () => {
      const err = new ValidationError("Invalid input");
      expect(err).toBeInstanceOf(Error);
      expect(err.name).toBe("ValidationError");
      expect(err.message).toBe("Invalid input");
      expect(err.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(err.data).toBeNull();
    });

    it("accepts optional data", () => {
      const err = new ValidationError("Invalid", { field: "email" });
      expect(err.data).toEqual({ field: "email" });
    });
  });

  describe("DatabaseError", () => {
    it("is an Error with name DatabaseError and statusCode INTERNAL_SERVER_ERROR", () => {
      const err = new DatabaseError("Connection failed");
      expect(err).toBeInstanceOf(Error);
      expect(err.name).toBe("DatabaseError");
      expect(err.message).toBe("Connection failed");
      expect(err.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    it("accepts optional data", () => {
      const err = new DatabaseError("DB error", { code: "ECONNREFUSED" });
      expect(err.data).toEqual({ code: "ECONNREFUSED" });
    });
  });

  describe("NotFoundError", () => {
    it("is an Error with name NotFoundError and statusCode NOT_FOUND", () => {
      const err = new NotFoundError("Resource not found");
      expect(err).toBeInstanceOf(Error);
      expect(err.name).toBe("NotFoundError");
      expect(err.message).toBe("Resource not found");
      expect(err.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it("accepts optional data", () => {
      const err = new NotFoundError("Missing", { id: "123" });
      expect(err.data).toEqual({ id: "123" });
    });
  });

  describe("SuccessCongratulations", () => {
    it("has default message and statusCode OK", () => {
      const success = new SuccessCongratulations();
      expect(success.name).toBe("SuccessCongratulations");
      expect(success.message).toBe("Operation completed Successfully!");
      expect(success.statusCode).toBe(StatusCodes.OK);
      expect(success.data).toBeNull();
      expect(success.timeStamp).toBeDefined();
      expect(new Date(success.timeStamp).toISOString()).toBe(success.timeStamp);
    });

    it("accepts data, message and statusCode", () => {
      const success = new SuccessCongratulations(
        { id: 1 },
        "Created",
        201
      );
      expect(success.data).toEqual({ id: 1 });
      expect(success.message).toBe("Created");
      expect(success.statusCode).toBe(201);
    });
  });
});
