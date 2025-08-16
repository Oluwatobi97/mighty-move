import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  padding: 2rem 1rem;
`;

const Card = styled(motion.section)`
  background: var(--card-bg);
  border-radius: 32px;
  box-shadow: var(--shadow);
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
  color: var(--text-primary);
  margin-bottom: 1.2rem;
`;

const Subtitle = styled.p`
  font-size: 1.18rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 2rem 0 0.7rem 0;
`;

const About: React.FC = () => (
  <Wrapper
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
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
      <SectionTitle>Contact</SectionTitle>
      <Subtitle>
        <b>Email:</b>{" "}
        <a href="mailto:oladokunabiola969@gmail.com">
          oladokunabiola969@gmail.com
        </a>
        <br />
        <b>Phone:</b> <a href="tel:+447904893167">+44 7904 893167</a>,{" "}
        <a href="tel:+447350164970">+44 7350 164970</a>
      </Subtitle>
      <SectionTitle>Payment Methods</SectionTitle>
      <Subtitle>
        <b>Bank Transfer:</b>
        <br />
        Bank: Santander PLC
        <br />
        Account Name: O S Odunaiya
        <br />
        Sort Code: 09-01-27
        <br />
        Account Number: 19477556
        <br />
        <br />
        <b>PayPal:</b>{" "}
        <a href="mailto:Olumidy_sezy@hotmail.co.uk">
          Olumidy_sezy@hotmail.co.uk
        </a>
      </Subtitle>
    </Card>
  </Wrapper>
);

export default About;
