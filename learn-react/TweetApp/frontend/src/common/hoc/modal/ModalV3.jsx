import React from "react";
import styles from "./Modal.module.css";

const ModalV3 = ({ isOpen, onClose, closeOnEscKey, showCloseButton = false, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={() => closeOnEscKey && onClose()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ModalV3;

// export default ModalV3;
