import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframe animation
const flip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

// Styled component for the container
const FlipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Styled component for the flip box
const FlipBox = styled.div`
  width: 150px;
  height: 150px;
  perspective: 1000px;
`;

// Styled component for the flip content
const FlipContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 10px;
  transform-style: preserve-3d;
  animation: ${flip} 3s infinite;
  backface-visibility: hidden;
`;

// React functional component
const FlipExampleV3 = () => {
  return (
    <FlipContainer>
      <FlipBox>
        <FlipContent>Flip Me!</FlipContent>
      </FlipBox>
    </FlipContainer>
  );
};


export default FlipExampleV3