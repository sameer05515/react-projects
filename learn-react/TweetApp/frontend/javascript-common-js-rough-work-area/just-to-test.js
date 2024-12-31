const validateInputs = (inputs) => {
  inputs.forEach(({ key, value, type }) => {
    if (!value || typeof value !== type) {
      throw new Error(`Invalid ${key}: '${value}' provided. Expected ${type}.`);
    }
  });
};

const validator = () => {
  validateInputs([{ key: "uniqueId", value: undefined, type: "string" }]);
  return true;
};


const executeApiRequest=(validatorFn)=>{
    try{
        const isValid = validatorFn();
        console.log("isValid: ", isValid)
    }catch(error){
        console.error('Some error occurred!  ',error);
    }
}

// Sample run

executeApiRequest(validator);

