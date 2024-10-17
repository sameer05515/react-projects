import React, { useState } from 'react';

const WysiwygEditor = () => {
  const [content, setContent] = useState('');

  const editorStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const textareaStyles = {
    flex: 1,
    minHeight: '200px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const previewStyles = {
    marginTop: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    fontSize: '16px',
    overflowY: 'auto',
    maxHeight: '200px', // Adjust as needed
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div style={editorStyles}>
      <textarea
        style={textareaStyles}
        value={content}
        onChange={handleChange}
      />
      <div
        style={previewStyles}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default WysiwygEditor;
