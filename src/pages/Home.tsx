import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled(motion.div)`
  padding: 3rem 2rem 2rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const Hero = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2rem;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ActionButton = styled(Link)`
  background: #fff9c4;
  color: #111111;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 1.2em 2.5em;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  &:hover {
    background: #fff176;
    transform: translateY(-6px) scale(1.06);
    box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.18);
  }
`;

const Articles = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const ArticleCard = styled(motion.article)`
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2rem 1.5rem;
  max-width: 340px;
  min-width: 260px;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ArticleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const ArticleText = styled.p`
  font-size: 1.08rem;
  color: #333;
`;

const Home: React.FC = () => (
  <Container
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Hero
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Title>Welcome to the MIGHTY MOVES</Title>
      <Subtitle>
        Book moving, waste collection, or logistics services easily. Fast,
        reliable, and professional solutions for your everyday needs.
      </Subtitle>
      <QuickActions>
        <ActionButton to="/move">Book a Move</ActionButton>
        <ActionButton to="/waste">Waste Pickup</ActionButton>
        <ActionButton to="/logistics">Send Package</ActionButton>
      </QuickActions>
    </Hero>
    <Articles>
      <ArticleCard
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ArticleTitle>🛠️ Moving Services</ArticleTitle>
        <ArticleText>
          Schedule your move with ease. Choose your pickup and drop-off
          locations, select the perfect vehicle, and set your preferred time.
          Our professional team ensures a smooth and stress-free moving
          experience.
        </ArticleText>
      </ArticleCard>
      <ArticleCard
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ArticleTitle>🗑️ Waste Collection</ArticleTitle>
        <ArticleText>
          Request one-time or recurring waste pickups for household,
          construction, or commercial needs. We offer eco-friendly and timely
          waste collection, keeping your environment clean and safe.
        </ArticleText>
      </ArticleCard>
      <ArticleCard
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <ArticleTitle>📦 Logistics Services</ArticleTitle>
        <ArticleText>
          Send packages anywhere, anytime. Enter sender and receiver details,
          package info, and choose standard or express delivery. Track your
          shipment in real-time for peace of mind.
        </ArticleText>
      </ArticleCard>
    </Articles>
  </Container>
);

export default Home;
