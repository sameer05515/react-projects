import React, { useEffect } from "react";

const underConstruction = true;
/**
 *
 * This component is unstable. Please use ModalV3 in production.
 *
 */
const ModalV4 = ({ isOpen, onClose, showCloseButton = false, title = "Modal Title", children }) => {
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  if (underConstruction) {
    console.error("This component is unstable. Please use ModalV3 in production.");
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "show d-block" : "fade"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            {showCloseButton && (
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            )}
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalV4;
