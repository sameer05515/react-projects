import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const withModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Modal: React.FC<P & ModalProps> = ({ isOpen, onClose, ...props }) => {
    if (!isOpen) return null;

    return (
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <WrappedComponent {...(props as P)} />
        </div>
      </div>
    );
  };

  return Modal;
};

export default withModal;
