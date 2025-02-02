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

export const ModalV4 = ({ isOpen, onClose, closeOnEscKey, showCloseButton = false, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            {showCloseButton && (
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            )}
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalV3;

