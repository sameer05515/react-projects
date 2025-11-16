import React, { useState } from 'react';

const FlipExample = () => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setFlipped((p) => !p)}
        className="group relative h-32 w-56 [transform-style:preserve-3d] transition-transform duration-500"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        aria-pressed={flipped}
        title="Flip card"
      >
        <div className="absolute inset-0 grid place-items-center rounded-lg border border-gray-300 bg-gray-50 text-gray-800 [backface-visibility:hidden]">
          Flip Me!
        </div>
        <div className="absolute inset-0 grid place-items-center rounded-lg border border-gray-300 bg-blue-600 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          Back Side
        </div>
      </button>
    </div>
  );
};

export default FlipExample;
