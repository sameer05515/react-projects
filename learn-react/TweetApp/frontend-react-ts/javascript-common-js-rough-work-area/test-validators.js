const validateInputs = (inputs) => {
  inputs.forEach(({ key, value, type }) => {
    if (!value || typeof value !== type) {
      throw new Error(`Invalid ${key}: '${value}' provided. Expected ${type}.`);
    }
  });
};

const validatePromise = (promise, name = "Promise") => {
  if (!(promise instanceof Promise)) {
    throw new Error(`Provided ${name} must return a Promise`);
  }
};

const validateFunction = (fn, name = "argument") => {
  if (typeof fn !== "function") {
    throw new Error(`Provided ${name} is not a function`);
  }
};

const validator = () => {
  validateInputs([{ key: "uniqueId", value: undefined, type: "string" }]);
  return true;
};

// Generate a random number
const samplePromise = () => {
  //   const toastId = notify("Generating a random number...");
  console.log("Generating a random number...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      if (randomNumber > 0) {
        resolve({ randomNumber, isError: false, message: "" });
        // updateNotification(
        //   toastId,
        //   "Random number generated!",
        //   LoaderStates.success
        // );
        console.log("Random number generated! : " + randomNumber);
      } else {
        reject({
          randomNumber: null,
          isError: true,
          message: "Error generating random number",
        });
        // updateNotification(
        //   toastId,
        //   "Error generating number",
        //   LoaderStates.error
        // );
        console.error("Error generating number");
      }
    }, 3000); // 3-second delay
  });
};

const executeApiRequest = async (promise, validatorFn) => {
  try {
    validateFunction(promise, "apiRequest");
    validateFunction(validatorFn, "validatorFn");

    const isValid = validatorFn();
    console.log("isValid: ", isValid);

    // Validate API request returns a Promise
    const apiRequestPromise = promise();
    validatePromise(apiRequestPromise, "apiRequest");

    const result = await apiRequestPromise;
    if (!result.isError) console.log("API Response: ", JSON.stringify(result));
  } catch (error) {
    console.error("Some error occurred!  ", error.message);
  }
};

// Sample run

executeApiRequest(samplePromise, validator);

executeApiRequest(
  () => {
    console.log(
      "Hey Javascript!! I am not a promise. Can you identify me without executing me?? :) "
    );
  },
  () => {
    validateInputs([
      { key: "uniqueId", value: "some-valid-id", type: "string" },
    ]);
    return true;
  }
);
