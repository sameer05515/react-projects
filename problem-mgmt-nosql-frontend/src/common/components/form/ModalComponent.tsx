import React from "react";

interface ModalProps {
  title: string;
  errorMessage: string | null;
  submitButtonLabel: string;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode; // A placeholder for form-specific content
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  errorMessage,
  submitButtonLabel,
  onSubmit,
  onClose,
  children,
}) => {
  return (
    <div>
      <h2>Title: {title}</h2>
      {/* Display error message if there's any */}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      {/* Render the form content passed as prop */}
      <div>{children}</div>

      {/* Buttons */}
      <button type="button" onClick={onSubmit}>
        {submitButtonLabel}
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default ModalComponent;
