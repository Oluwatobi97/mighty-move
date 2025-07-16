import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #fff9c4 0%, #ffffff 100%);
  padding: 2rem 1rem;
`;

const Card = styled(motion.section)`
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.13);
  padding: 2.5rem 2rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 2.5rem;
  @media (max-width: 600px) {
    padding: 1.5rem 0.5rem;
    max-width: 98vw;
  }
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.2rem;
`;

const Subtitle = styled.p`
  font-size: 1.18rem;
  color: #444;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
  margin: 2rem 0 0.7rem 0;
`;

const About: React.FC = () => (
  <Wrapper
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.7 }}
  >
    <Card
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <Title>About Mighty Moves</Title>
      <Subtitle>
        Mighty Moves is your trusted partner for moving, waste collection, and
        logistics services across the UK. We are dedicated to making your life
        easier with fast, reliable, and professional solutions for every need.
      </Subtitle>
      <SectionTitle>Our Mission</SectionTitle>
      <Subtitle>
        To deliver seamless, stress-free services that empower our customers to
        focus on what matters most. We believe in transparency, efficiency, and
        a customer-first approach.
      </Subtitle>
      <SectionTitle>Contact Us</SectionTitle>
      <Subtitle>
        Have questions or need support? Email us at{" "}
        <a href="mailto:support@mightymoves.co.uk">support@mightymoves.co.uk</a>{" "}
        and our team will be happy to help.
      </Subtitle>
    </Card>
  </Wrapper>
);

export default About;
