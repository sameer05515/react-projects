import React from "react";
import { toast } from "react-toastify";

const ToastButtonComponentV1 = () => {
  const handleButtonClick = () => {
    toast.success("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click Me</button>
    </div>
  );
};

export default ToastButtonComponentV1;
