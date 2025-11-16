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

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <textarea
        className="w-[95%] h-[200px] p-2.5 text-base rounded border border-gray-300 mb-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={handleChange}
        rows="10"
        placeholder="Enter text to count sentences ending with a full stop..."
      />
      <label className="text-lg text-gray-700 font-semibold">
        Lines ending with a full stop: <span className="text-blue-600">{count}</span>
      </label>
    </div>
  );
};

export default CountFullStopLines;
