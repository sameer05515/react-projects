import React, { useState } from 'react';

const CustomButton = ({ onClick, children, style={} }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: isHovered ? '#0056b3' : '#0074d9',
    color: isHovered ? '#ffffff' : '#000000', // Text color changes on hover
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <button
      style={{...style,...buttonStyle}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
