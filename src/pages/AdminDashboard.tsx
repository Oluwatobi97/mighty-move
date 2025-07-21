import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getAllBookings, approveBooking } from "../utils/api";
import BookingCard from "../components/BookingCard";
import StatsCard from "../components/StatsCard";

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const Section = styled(motion.section)`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const ControlButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  background: #2d3748;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background: #4a5568;
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  margin: 4rem auto;
  border: 5px solid #e2e8f0;
  border-top: 5px solid #2d3748;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  font-size: 1.1rem;
`;

const AdminDashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      getAllBookings(token)
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load bookings.");
          setLoading(false);
        });
    }
  }, []);

  const handleApproveBooking = async (bookingId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error.");
      return;
    }

    setApproving(bookingId);
    try {
      const updatedBooking = await approveBooking(bookingId, token);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? updatedBooking : b))
      );
      toast.success(`Booking #${bookingId} approved!`);
    } catch (error) {
      toast.error("Failed to approve booking.");
    } finally {
      setApproving(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "Pending");
  const otherBookings = bookings.filter((b) => b.status !== "Pending");

  const stats = {
    total: bookings.length,
    pending: pendingBookings.length,
    inProgress: bookings.filter((b) => b.status === "In Progress").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Admin Dashboard</Title>
      </Header>

      <MainGrid>
        <Section>
          <SectionTitle>Key Statistics</SectionTitle>
          <StatsGrid>
            <StatsCard label="Total Bookings" value={stats.total} />
            <StatsCard label="Pending Approval" value={stats.pending} />
            <StatsCard label="In Progress" value={stats.inProgress} />
            <StatsCard label="Completed" value={stats.completed} />
          </StatsGrid>
        </Section>

        {pendingBookings.length > 0 && (
          <Section>
            <SectionTitle>
              Pending Approval ({pendingBookings.length})
            </SectionTitle>
            <BookingsGrid>
              {pendingBookings.map((booking) => (
                <div key={booking.id}>
                  <BookingCard {...booking} isAdmin={true} />
                  <ControlButton
                    onClick={() => handleApproveBooking(booking.id)}
                    disabled={approving === booking.id}
                  >
                    {approving === booking.id ? "Approving..." : "Approve"}
                  </ControlButton>
                </div>
              ))}
            </BookingsGrid>
          </Section>
        )}

        <Section>
          <SectionTitle>
            All Other Bookings ({otherBookings.length})
          </SectionTitle>
          {otherBookings.length > 0 ? (
            <BookingsGrid>
              {otherBookings.map((booking) => (
                <BookingCard key={booking.id} {...booking} isAdmin={true} />
              ))}
            </BookingsGrid>
          ) : (
            <EmptyState>No other bookings found.</EmptyState>
          )}
        </Section>
      </MainGrid>
    </Container>
  );
};

export default AdminDashboard;
