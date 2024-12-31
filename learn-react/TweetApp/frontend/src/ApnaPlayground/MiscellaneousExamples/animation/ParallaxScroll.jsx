import React, { useEffect, useState } from 'react';
import './ParallaxScroll.css'; // Import the CSS file for styles

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
    <div className="parallax-container">
      {/* Parallax background */}
      <div
        className="parallax-background"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }} // Slower scroll effect
      ></div>

      {/* Foreground content */}
      <div className="parallax-content">
        <h1>Parallax Scrolling Effect</h1>
        <p>This is an example of a parallax scrolling effect using React.</p>
        <p>Scroll down to see the effect.</p>
        <div className="filler-content">
          {/* Filler content to enable scrolling */}
          <p>Keep scrolling...</p>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
