import React, { useEffect, useRef, useState } from "react";

const ModalV3 = ({ isOpen, onClose, closeOnEscKey = false, title = "Modal Title", children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
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
    if (!isResizing || !modalRef.current) return;
    const modalElement = modalRef.current;
    setSize((prevSize) => ({
      width: Math.max(300, e.clientX - modalElement.offsetLeft), // Min width 300px
      height: Math.max(200, e.clientY - modalElement.offsetTop), // Min height 200px
    }));
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg overflow-hidden relative shadow-lg flex flex-col resize overflow-auto"
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-2.5 bg-gray-100 border-b border-gray-300 cursor-grab">
          <span className="text-lg font-bold">{title}</span>
          <button 
            className="bg-transparent border-none text-xl cursor-pointer text-gray-800 hover:text-red-600 transition-colors" 
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        <div 
          className="w-[15px] h-[15px] bg-gray-400 absolute bottom-0 right-0 cursor-nwse-resize" 
          onMouseDown={startResizing} 
        />
      </div>
    </div>
  );
};

export default ModalV3;
