import React from "react";

const FormMessagesV1 = ({ messages = [{ type: "error", message: "Invalid messages forma" }] }) => {
  if (!messages || messages.length === 0) return null;

  if (!Array.isArray(messages)) {
    return <div className="alert alert-danger mt-2">Invalid messages format</div>;
  }

  const getAlertClass = (type) => {
    switch (type) {
      case "info":
        return "alert alert-info";
      case "warning":
        return "alert alert-warning";
      case "error":
        return "alert alert-danger";
      default:
        return "alert alert-secondary"; // Default style for unknown types
    }
  };

  return (
    <div className="mt-2">
      {messages.map((msg, index) => (
        <div key={index} className={`${getAlertClass(msg.type)} mt-1`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default FormMessagesV1;
