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

const Input = styled.input`
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
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
  const [locationInputs, setLocationInputs] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAllBookings(token)
        .then((data) => {
          // Parse details if they're stored as JSON strings
          // Map tracking_id to trackingNumber for frontend compatibility
          const parsedData = data.map((booking: any) => ({
            ...booking,
            trackingNumber: booking.tracking_id, // Map backend field to frontend field
            details:
              typeof booking.details === "string"
                ? JSON.parse(booking.details)
                : booking.details,
          }));
          setBookings(parsedData);
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
    if (!token) return toast.error("Authentication error.");

    setApproving(bookingId);
    try {
      const updatedBooking = await approveBooking(bookingId, token);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? updatedBooking : b))
      );
      toast.success(`Booking #${bookingId} approved!`);
    } catch {
      toast.error("Failed to approve booking.");
    } finally {
      setApproving(null);
    }
  };

  const handleUpdateLocation = async (
    trackingId: string,
    lat: number,
    lng: number
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Authentication error.");

    try {
      const res = await fetch(`/api/bookings/location/${trackingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lat, lng }),
      });
      if (!res.ok) throw new Error("Location update failed");
      toast.success("Location updated successfully.");
    } catch {
      toast.error("Failed to update location.");
    }
  };

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  const pending = bookings.filter((b) => b.status === "Pending");
  const others = bookings.filter((b) => b.status !== "Pending");

  const stats = {
    total: bookings.length,
    pending: pending.length,
    inProgress: bookings.filter((b) => b.status === "In Progress").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <Container>
      <MainCard>
        <Title>Admin Dashboard</Title>

        <SectionTitle>Statistics</SectionTitle>
        <StatsGrid>
          <StatsCard label="Total Bookings" value={stats.total} />
          <StatsCard label="Pending" value={stats.pending} />
          <StatsCard label="In Progress" value={stats.inProgress} />
          <StatsCard label="Completed" value={stats.completed} />
        </StatsGrid>

        {pending.length > 0 && (
          <>
            <SectionTitle>Pending Bookings</SectionTitle>
            <BookingsGrid>
              {pending.map((booking) => (
                <div key={booking.id}>
                  <BookingCard
                    {...booking}
                    id={booking.id}
                    details={booking.details}
                    isAdmin={true}
                  />
                  <ControlButton
                    onClick={() => handleApproveBooking(booking.id)}
                    disabled={approving === booking.id}
                  >
                    {approving === booking.id ? "Approving..." : "Approve"}
                  </ControlButton>
                </div>
              ))}
            </BookingsGrid>
          </>
        )}

        <SectionTitle>Other Bookings</SectionTitle>
        {others.length > 0 ? (
          <BookingsGrid>
            {others.map((booking) => (
              <div key={booking.id}>
                <BookingCard
                  {...booking}
                  id={booking.id}
                  details={booking.details}
                  isAdmin={true}
                />
                {booking.status === "In Progress" && (
                  <div>
                    <Input
                      type="number"
                      placeholder="Latitude"
                      onChange={(e) =>
                        setLocationInputs((prev: any) => ({
                          ...prev,
                          [booking.tracking_id]: {
                            ...prev[booking.tracking_id],
                            lat: parseFloat(e.target.value),
                          },
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Longitude"
                      onChange={(e) =>
                        setLocationInputs((prev: any) => ({
                          ...prev,
                          [booking.tracking_id]: {
                            ...prev[booking.tracking_id],
                            lng: parseFloat(e.target.value),
                          },
                        }))
                      }
                    />
                    <ControlButton
                      onClick={() =>
                        handleUpdateLocation(
                          booking.tracking_id,
                          locationInputs[booking.tracking_id]?.lat,
                          locationInputs[booking.tracking_id]?.lng
                        )
                      }
                    >
                      Update Location
                    </ControlButton>
                  </div>
                )}
              </div>
            ))}
          </BookingsGrid>
        ) : (
          <EmptyState>No other bookings found.</EmptyState>
        )}
      </MainCard>
    </Container>
  );
};

export default AdminDashboard;
