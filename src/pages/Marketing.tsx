import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Wrapper = styled(motion.div)`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  padding: 2rem 1rem;
`;

const Hero = styled(motion.section)`
  background: var(--card-bg);
  border-radius: 32px;
  box-shadow: var(--shadow);
  padding: 3rem 2.5rem;
  max-width: 540px;
  text-align: center;
  margin-bottom: 2.5rem;
  @media (max-width: 600px) {
    padding: 1.5rem 0.5rem;
    max-width: 98vw;
  }
`;

const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.2rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  background: var(--highlight-color);
  color: var(--btn-text);
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 1.1em 2.2em;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  &:hover {
    background: var(--highlight-color);
    transform: translateY(-6px) scale(1.06);
    box-shadow: var(--shadow);
  }
`;

const Marketing: React.FC = () => (
  <Wrapper
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Hero
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Title>Welcome to Multi-Service Platform</Title>
      <Subtitle>
        Your one-stop solution for Moving, Waste Collection, and Logistics.
        Fast, reliable, and professional services for your everyday needs.
        Experience convenience and peace of mind with our trusted team.
      </Subtitle>
      <CTAGroup>
        <CTAButton to="/register">Get Started</CTAButton>
        <CTAButton to="/home">Learn More</CTAButton>
      </CTAGroup>
    </Hero>
  </Wrapper>
);

export default Marketing;
