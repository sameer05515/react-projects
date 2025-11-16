import React from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   closeOnEscKey?: boolean;
// }

const withModal = /**<P extends object>*/ (
  WrappedComponent /**: React.ComponentType<P>*/
) => {
  const Modal /**: React.FC<P & ModalProps>*/ = ({
    isOpen,
    onClose,
    closeOnEscKey,
    showCloseButton=false,
    ...props
  }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center z-[1000]"
        onClick={() => closeOnEscKey && onClose()}
      >
        <div
          className="bg-white p-5 rounded-lg w-[90%] max-w-[60vw] max-h-[60vh] overflow-auto relative shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button 
              className="absolute top-2.5 right-2.5 bg-transparent border-none text-xl cursor-pointer text-gray-800 hover:text-red-600 transition-colors" 
              onClick={onClose}
            >
              &times;
            </button>
          )}
          <WrappedComponent {...props /**as P*/} />
        </div>
      </div>
    );
  };

  return Modal;
};

export default withModal;
