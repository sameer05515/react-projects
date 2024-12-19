// withFormModal.tsx

import React from "react";

interface FormModalProps {
  title: string;
  onSubmit: () => void;
  onClose: () => void;
  submitButtonLabel: string;
  isError: boolean;
  errorMessage: string;
}

const withFormModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const FormModal: React.FC<P & FormModalProps> = ({
    title,
    onSubmit,
    onClose,
    submitButtonLabel,
    isError,
    errorMessage,
    ...props
  }) => {
    return (
      <div>
        <h2>{title}</h2>
        {/* Error Handling */}
        {isError && <div style={{ color: "red" }}>{errorMessage}</div>}

        {/* Render the form or content via WrappedComponent */}
        <WrappedComponent {...(props as P)} />

        <button type="button" onClick={onSubmit}>
          {submitButtonLabel}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    );
  };

  return FormModal;
};

export default withFormModal;
