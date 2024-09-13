import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React, { ReactNode, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa"; // Importing a cancel icon from react-icons

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const ModalV3 = ({ children, onClose }: ModalProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: {
      backdrop,
      modal,
      modalCloseButton: closeButton,
    }, // Assuming `closeButton` is added for styling the cancel button
  } = useGlobalStyles();

  const handleEscKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyPress);
    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [handleEscKeyPress]);

  return (
    <>
      <div className={backdrop}></div>
      <dialog open className={modal}>
        <button
          className={closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        {children}
      </dialog>
    </>
  );
};


// The HOC function
export const withModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // The component that will be returned by the HOC
  return (props: P & { onClose: () => void }) => {
    const { onClose } = props;

    return (
      <ModalV3 onClose={onClose}>
        <WrappedComponent {...props} />
      </ModalV3>
    );
  };
};

export default ModalV3;
