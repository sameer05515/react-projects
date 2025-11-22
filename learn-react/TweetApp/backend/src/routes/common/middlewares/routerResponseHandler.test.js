const routerResponseHandler = require("./routerResponseHandler");
const { sendStandardResponse, ResponseStatus } = require("../server-responses/StandardResponse");
const { StatusCodes } = require("http-status-codes");

jest.mock("../server-responses/StandardResponse", () => ({
  sendStandardResponse: jest.fn(),
  ResponseStatus: {
    Success: "SUCCESS",
    ValidationFailed: "VALIDATION_ERROR",
    DatabaseRelatedError: "DATABASE_ERROR",
    Error: "ERROR",
  },
}));

describe("routerResponseHandler", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = {};
    next = jest.fn();
  });

  it("calls sendStandardResponse with Success when routerResponse is SuccessCongratulations", () => {
    const routerResponse = {
      name: "SuccessCongratulations",
      data: { id: 1 },
      statusCode: StatusCodes.OK,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.Success,
      ["Success"],
      { id: 1 },
      StatusCodes.OK,
      routerResponse
    );
  });

  it("calls sendStandardResponse with ValidationFailed when routerResponse is ValidationError", () => {
    const routerResponse = {
      name: "ValidationError",
      data: { field: "email" },
      statusCode: StatusCodes.BAD_REQUEST,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.ValidationFailed,
      ["Validation Error"],
      { field: "email" },
      StatusCodes.BAD_REQUEST,
      routerResponse
    );
  });

  it("calls sendStandardResponse with DatabaseRelatedError when routerResponse is DatabaseError", () => {
    const routerResponse = {
      name: "DatabaseError",
      data: null,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.DatabaseRelatedError,
      ["Database Error"],
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
      routerResponse
    );
  });

  it("calls sendStandardResponse with Error and Resource Not Found when routerResponse is NotFoundError", () => {
    const routerResponse = {
      name: "NotFoundError",
      data: null,
      statusCode: StatusCodes.NOT_FOUND,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.Error,
      ["Resource Not Found"],
      null,
      StatusCodes.NOT_FOUND,
      routerResponse
    );
  });

  it("calls sendStandardResponse with Error and Internal Server Error for unknown routerResponse name", () => {
    const routerResponse = {
      name: "UnknownError",
      data: null,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.Error,
      ["Internal Server Error"],
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
      routerResponse
    );
  });

  it("passes null for data when routerResponse.data is undefined", () => {
    const routerResponse = {
      name: "SuccessCongratulations",
      statusCode: 200,
    };
    routerResponseHandler(routerResponse, req, res, next);
    expect(sendStandardResponse).toHaveBeenCalledWith(
      res,
      ResponseStatus.Success,
      ["Success"],
      null,
      200,
      routerResponse
    );
  });
});
