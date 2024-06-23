import React, { useState } from 'react';

const DarkLightModeToggle = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const styles = {
    container: {
      backgroundColor: isDarkMode ? 'black' : 'white',
      color: isDarkMode ? 'white' : 'black',
      padding: '20px',
      textAlign: 'center',
      minHeight: '100vh',
    },
    toggleContainer: {
      display: 'inline-block',
      padding: '5px',
      backgroundColor: isDarkMode ? 'grey' : 'lightgrey',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    toggleButton: {
      width: '40px',
      height: '20px',
      backgroundColor: isDarkMode ? 'black' : 'white',
      borderRadius: '50%',
      transition: 'transform 0.2s',
      transform: isDarkMode ? 'translateX(20px)' : 'translateX(0px)',
    },
  };

  return (
    <div style={styles.container}>
      {/* <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <p>Toggle the switch to change mode.</p> */}
      <div style={styles.toggleContainer} onClick={toggleMode}>
        <div style={styles.toggleButton}></div>
      </div>
      {children}
    </div>
  );
};

export default DarkLightModeToggle;
