import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React, { ReactNode, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa"; // Importing a cancel icon from react-icons

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const ModalV2 = ({ children, onClose }: ModalProps) => {
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

export default ModalV2;
