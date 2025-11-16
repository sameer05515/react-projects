import React from "react";
import CustomButton from "../custom-button/CustomButton";

const Popup = ({
  headerText = "Popup Content",
  children,
  onClose = () => {},
  overlayClassName = "",
  contentClassName = "",
}) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm ${overlayClassName}`}
    role="dialog"
    aria-modal="true"
  >
    <div
      className={`relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10 max-h-[80vh] overflow-y-auto ${contentClassName}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">{headerText}</h2>
        <CustomButton
          className="bg-transparent px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          title="Close"
          onClick={onClose}
        >
          ×
        </CustomButton>
      </div>
      {children ? children : <p className="text-sm text-gray-600">This is a simple popup</p>}
    </div>
  </div>
);

export default Popup;