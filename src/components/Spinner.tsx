import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 1; }
  50% { transform: rotate(180deg) scale(1.2); opacity: 0.7; }
  100% { transform: rotate(360deg) scale(1); opacity: 1; }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  border: 4px solid #ffd600;
  border-top: 4px solid #111;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 0.7s linear infinite;
`;

const Spinner: React.FC = () => (
  <SpinnerWrapper>
    <Circle />
  </SpinnerWrapper>
);

export default Spinner;
