import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BookingCard from "../components/BookingCard";
import { mockGetBookings } from "../utils/api";
import { Link } from "react-router-dom";

const Container = styled(motion.div)`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Card = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
`;

const ProfileLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #111;
  background: #fff9c4;
  border-radius: 10px;
  padding: 0.5em 1.5em;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: #fff176;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ArticleText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2rem;
`;

const BookingsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Spinner = styled.div`
  margin: 2rem auto;
  border: 4px solid #eee;
  border-top: 4px solid #111;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const UserDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockGetBookings().then((data: any) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ProfileLink to="/profile">View/Edit Profile</ProfileLink>
        <Title>User Dashboard</Title>
        <ArticleText>
          View and manage all your bookings in one place. Track active services,
          update or cancel bookings, and stay informed about your service
          status.
        </ArticleText>
        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <BookingsList>
            {bookings.map((b, i) => (
              <BookingCard key={i} {...b} />
            ))}
          </BookingsList>
        )}
      </Card>
    </Container>
  );
};

export default UserDashboard;
