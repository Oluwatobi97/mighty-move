import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BookingCard from "../components/BookingCard";
import { mockGetBookings } from "../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

const TopPanelsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
`;
const PanelCard = styled(Card)`
  max-width: 400px;
  margin-bottom: 0;
  padding: 1.5rem 1.2rem;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
  }
`;
const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const HistoryItem = styled.li`
  background: #f4faff;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #dbefff;
  }
`;

const UserDashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockGetBookings().then((data: any) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  // Split bookings into ongoing and history
  const ongoingBookings = bookings.filter(
    (b) => b.status === "Pending" || b.status === "In Progress"
  );
  const historyBookings = bookings.filter(
    (b) => b.status === "Completed" || b.status === "Cancelled"
  );

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 style={{ marginBottom: "1.2rem" }}>
          Welcome, {auth?.user?.name || "User"}!
        </h2>
        <ProfileLink to="/profile">View/Edit Profile</ProfileLink>
        <TopPanelsWrapper>
          <PanelCard>
            <h3 style={{ marginBottom: 12 }}>Notifications</h3>
            <div style={{ color: "#888" }}>No new notifications.</div>
          </PanelCard>
          <PanelCard>
            <h3 style={{ marginBottom: 12 }}>History</h3>
            {historyBookings.length === 0 ? (
              <div style={{ color: "#888" }}>
                No completed or cancelled bookings.
              </div>
            ) : (
              <HistoryList>
                {historyBookings.map((b, i) => (
                  <HistoryItem key={i}>
                    <span>
                      <strong>{b.serviceType}</strong> - {b.status}
                    </span>
                    <span style={{ fontSize: "0.95em", color: "#888" }}>
                      {b.date}
                    </span>
                  </HistoryItem>
                ))}
              </HistoryList>
            )}
          </PanelCard>
        </TopPanelsWrapper>
        <Title>User Dashboard</Title>
        <ArticleText>
          View and manage all your bookings in one place. Track active services,
          update or cancel bookings, and stay informed about your service
          status.
        </ArticleText>
        {loading ? (
          <Spinner />
        ) : ongoingBookings.length === 0 ? (
          <div>No ongoing bookings found.</div>
        ) : (
          <BookingsList>
            {ongoingBookings.map((b, i) => (
              <BookingCard key={i} {...b} />
            ))}
          </BookingsList>
        )}
      </Card>
    </Container>
  );
};

export default UserDashboard;
