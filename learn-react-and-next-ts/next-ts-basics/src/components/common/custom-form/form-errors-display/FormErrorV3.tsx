import React from "react";

type FormErrorProps = {
  formErrors: string[];
};

const FormError = ({ formErrors }: FormErrorProps) => {
  return (
    <>
      {formErrors.length > 0 && (
        <div style={{ padding: "10px" }}>
          {formErrors.map((error, index) => (
            <div key={index} style={{ color: "yellow" }}>
              <pre style={{ whiteSpace: "pre-wrap" }}>{error}</pre>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FormError;
