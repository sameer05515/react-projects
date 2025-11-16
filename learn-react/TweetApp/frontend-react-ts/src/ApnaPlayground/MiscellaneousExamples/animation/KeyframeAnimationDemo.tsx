import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframe animation
const moveAndChangeColor = keyframes`
  0% {
    transform: translateX(0);
    background-color: red;
  }
  50% {
    transform: translateX(200px);
    background-color: blue;
  }
  100% {
    transform: translateX(0);
    background-color: red;
  }
`;

// Styled component with animation
const AnimatedBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  margin: 50px;
  animation: ${moveAndChangeColor} 3s ease-in-out infinite;
`;

const KeyframeAnimationDemo = () => {
  return (
    <div>
      <h2>Keyframe Animation Example</h2>
      <AnimatedBox />
    </div>
  );
};

export default KeyframeAnimationDemo;
