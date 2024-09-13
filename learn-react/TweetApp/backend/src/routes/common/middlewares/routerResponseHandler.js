// backend\src\middlewares\routerResponseHandler.js

const { sendStandardResponse, ResponseStatus } = require("../server-responses/StandardResponse");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const routerResponseHandler = (routerResponse, req, res, next) => {
  if(routerResponse.name==="SuccessCongratulations"){
    sendStandardResponse(res, ResponseStatus.Success, ["Success"], routerResponse.data||null, routerResponse.statusCode, routerResponse);
  }else if (routerResponse.name === "ValidationError") {
    sendStandardResponse(res, ResponseStatus.ValidationFailed, ["Validation Error"], routerResponse.data||null, routerResponse.statusCode, routerResponse);
  } else if (routerResponse.name === "DatabaseError") {
    sendStandardResponse(res, ResponseStatus.DatabaseRelatedError, ["Database Error"], routerResponse.data||null, routerResponse.statusCode, routerResponse);
  } else if (routerResponse.name === "NotFoundError") {
    sendStandardResponse(res, ResponseStatus.Error, ["Resource Not Found"], routerResponse.data||null, routerResponse.statusCode, routerResponse);
  } else {
    // Handle other uncaught errors
    sendStandardResponse(res, ResponseStatus.Error, ["Internal Server Error"], routerResponse.data||null, StatusCodes.INTERNAL_SERVER_ERROR, routerResponse);
  }
};

module.exports = routerResponseHandler;
