import React, { useEffect, useState } from 'react';

const ParallaxScroll = () => {
  const [offsetY, setOffsetY] = useState(0);

  // Update the offset when scrolling
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[120vh] overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Parallax background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-200 to-purple-200"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />

      {/* Foreground content */}
      <div className="relative p-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Parallax Scrolling Effect</h1>
        <p className="text-gray-700">This is an example of a parallax scrolling effect using React.</p>
        <p className="mb-6 text-gray-700">Scroll down to see the effect.</p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-700 shadow-sm">
          <p>Keep scrolling...</p>
          <div className="mt-20 h-[120vh]" />
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
