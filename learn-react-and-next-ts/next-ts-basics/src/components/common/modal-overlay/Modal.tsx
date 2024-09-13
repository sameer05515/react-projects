import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: ()=>void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  const {
    GLOBAL_APPLICATION_STYLES: { backdrop, modal },
  } = useGlobalStyles();
  return (
    <>
      <div className={backdrop} onClick={onClose}></div>
      <dialog open className={modal}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
