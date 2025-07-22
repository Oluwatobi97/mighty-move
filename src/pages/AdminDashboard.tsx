import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getAllBookings, approveBooking } from "../utils/api";
import BookingCard from "../components/BookingCard";
import StatsCard from "../components/StatsCard";

const Container = styled(motion.div)`
  padding: 2.5rem 1rem 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const MainCard = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    gap: 1.2rem;
  }
`;

const TopPanelsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
`;

const PanelCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
  padding: 1.5rem 1.2rem;
  max-width: 400px;
  min-width: 260px;
  width: 100%;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
    min-width: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MainCard
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Title>Admin Dashboard</Title>

        <TopPanelsWrapper>
          <PanelCard>
            <SectionTitle>Key Statistics</SectionTitle>
            <StatsGrid>
              <StatsCard label="Total Bookings" value={stats.total} />
              <StatsCard label="Pending Approval" value={stats.pending} />
              <StatsCard label="In Progress" value={stats.inProgress} />
              <StatsCard label="Completed" value={stats.completed} />
            </StatsGrid>
          </PanelCard>
        </TopPanelsWrapper>

        {pendingBookings.length > 0 && (
          <div>
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
          </div>
        )}

        <div>
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
        </div>
      </MainCard>
    </Container>
  );
};

export default AdminDashboard;
