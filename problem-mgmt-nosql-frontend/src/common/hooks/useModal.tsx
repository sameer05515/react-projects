import { useState } from "react";

const useModal = <T,>(initialValue: T | null = null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(initialValue);

  const openModal = (modalData?: T) => {
    setData(modalData || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setIsOpen(false);
  };

  return { isOpen, data, openModal, closeModal };
};

export default useModal;
