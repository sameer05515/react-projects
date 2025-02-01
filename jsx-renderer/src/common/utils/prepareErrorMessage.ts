const prepareErrorMessage = (error: unknown) =>
  `⚠️ Error: ${
    error && error instanceof Error && error.message
      ? error.message
      : "Some error occurred: " + JSON.stringify(error, null, 2)
  }`;

export default prepareErrorMessage;
