const prepareErrorMessage = (error, defaultMessage) => {
  if (!error) return defaultMessage;
  if (typeof error === "string" && error.trim()) return error;
  if (
    error.message &&
    typeof error.message === "string" &&
    error.message.trim()
  )
    return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return defaultMessage;
  }
};

const fetchFnWrapper = async ({ url, options }) => {
  console.log(`url: ${url}, ${new Date()}`);

  try {
    if (!url) {
      return {
        data: null,
        isError: true,
        message: `Url should not be null or undefined. Provided url is: '${url}'`,
      };
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data : Response Status: ${response.status}`
      );
    }
    const result = await response.json();
    return { data: result, isError: false, message: "" };
  } catch (error) {
    return {
      data: null,
      isError: true,
      message: prepareErrorMessage(error, "Something bad happenned!!"),
    };
  }
};

export { fetchFnWrapper, prepareErrorMessage };
