const prepareErrorMessage = (error) => {
  const errMsg = error && error instanceof Error && error.message ? error.message : "Something unexpected occurreed";
  return errMsg;
};

module.exports= prepareErrorMessage;