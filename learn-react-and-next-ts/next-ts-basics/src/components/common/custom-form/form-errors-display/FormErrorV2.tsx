import React from "react";

export type FormErrorElement = {
  errorType: 'Form Validation'|'API Response Error',
  message: string
};

type FormErrorProps = {
  formErrors: FormErrorElement[];
};

const FormError = ({ formErrors }: FormErrorProps) => {
  return (
    <>
      {formErrors.length > 0 && (
        <div style={{ padding: "10px" }}>
          {formErrors.map((error, index) => (
            <div key={index} style={{ color: 'yellow' }}>
              <span style={{fontSize:'20px'}}>{`${error.errorType}: `}</span>{error.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FormError;
