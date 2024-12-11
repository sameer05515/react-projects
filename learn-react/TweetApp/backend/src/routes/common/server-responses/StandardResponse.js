// backend\src\routes\common\server-responses\StandardResponse.js

// Standard response format
const sendStandardResponse = (
    res,
    status,
    messages,
    data,
    statusCode,
    routerResponse = null
) => {
    if (routerResponse?.message) {
        messages.push(routerResponse.message);
    }
    res.status(statusCode).json({
        status,
        messages,
        data,
        statusCode,
        timeStamp: new Date().toISOString(),
    });
};

// Enum for different response statuses
const ResponseStatus = {
    Success: "SUCCESS",
    ValidationFailed: "VALIDATION_ERROR",
    DatabaseRelatedError: "DATABASE_ERROR",
    Error: "ERROR",
};

module.exports = {
    sendStandardResponse,
    ResponseStatus,
};
