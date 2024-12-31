import React, { useState } from 'react';

const CountFullStopLines = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Count sentences ending with a full stop
    const sentences = newText.split(/(?<=[.])\s+/);
    const fullStopSentences = sentences.filter(sentence => sentence.trim().endsWith('.')).length;
    setCount(fullStopSentences);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
    },
    textarea: {
      width: '95%',
      height: '200px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      resize: 'none',
    },
    label: {
      fontSize: '18px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <textarea
        style={styles.textarea}
        value={text}
        onChange={handleChange}
        rows="10"
      />
      <label style={styles.label}>
        Lines ending with a full stop: {count}
      </label>
    </div>
  );
};

export default CountFullStopLines;
