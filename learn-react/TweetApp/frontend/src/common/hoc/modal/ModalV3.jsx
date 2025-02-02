import React, { useEffect, useRef, useState } from "react";
import styles from "./modal.v3.module.css";

const ModalV3 = ({ isOpen, onClose, closeOnEscKey = false, title = "Modal Title", children }) => {
  const modalRef = useRef(null);
  const [size, setSize] = useState({ width: 1200, height: 500 }); // Initial modal size
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen && closeOnEscKey) onClose();
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [closeOnEscKey, isOpen, onClose]);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  };

  const resize = (e) => {
    if (!isResizing) return;
    setSize((prevSize) => ({
      width: Math.max(300, e.clientX - modalRef.current.offsetLeft), // Min width 300px
      height: Math.max(200, e.clientY - modalRef.current.offsetTop), // Min height 200px
    }));
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modalContent}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.resizeHandle} onMouseDown={startResizing} />
      </div>
    </div>
  );
};

export default ModalV3;
