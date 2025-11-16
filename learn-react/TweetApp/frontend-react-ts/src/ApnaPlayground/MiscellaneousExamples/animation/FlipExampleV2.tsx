import React, { useEffect } from 'react';

const FlipExampleV2 = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes flip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(360deg); }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const flipBoxStyle = {
    width: '150px',
    height: '150px',
    perspective: '1000px',
  };

  const flipContentStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    borderRadius: '10px',
    transformStyle: 'preserve-3d',
    animation: 'flip 3s infinite',
    backfaceVisibility: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <div style={flipBoxStyle}>
        <div style={flipContentStyle}>Flip Me!</div>
      </div>
    </div>
  );
};

export default FlipExampleV2;
