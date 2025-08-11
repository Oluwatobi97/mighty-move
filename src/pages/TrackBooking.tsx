import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

const Container = styled(motion.div)`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;

const Card = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #111;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (min-width: 601px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #111;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.1);
  }
`;

const Button = styled(motion.button)`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  height: fit-content;
  align-self: flex-start;
  margin-top: 1.5rem;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: #ffebee;
  color: #d32f2f;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-weight: 500;
`;

const SuccessCard = styled(motion.div)`
  background: #e8f5e8;
  border-radius: 18px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.08);
`;

const LocationTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LocationItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
`;

const LocationLabel = styled.span`
  font-weight: 600;
  color: #111;
`;

const LocationValue = styled.span`
  font-weight: 500;
  color: #333;
`;

const MapPlaceholder = styled.div`
  height: 200px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: #888;
  font-weight: 500;
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

const TrackBooking: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a tracking ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLocation(null);

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/bookings/track/${trackingId}`
      );

      if (response.data.location) {
        setLocation(response.data.location);
      } else {
        setError("No location found for this tracking ID.");
      }
    } catch (err: any) {
      console.error("Tracking failed:", err);
      setError(err.response?.data?.error || "Failed to fetch tracking info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Title>Track Your Booking</Title>
        <Form onSubmit={handleTrack}>
          <InputGroup>
            <Label htmlFor="trackingId">Tracking ID</Label>
            <Input
              id="trackingId"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your tracking ID"
            />
          </InputGroup>
          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Tracking..." : "Track"}
          </Button>
        </Form>

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </ErrorMessage>
        )}

        {loading && <Spinner />}

        {location && (
          <SuccessCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LocationTitle>Current Location</LocationTitle>
            <MapPlaceholder>Map visualization would appear here</MapPlaceholder>
            <LocationInfo>
              <LocationItem>
                <LocationLabel>Latitude:</LocationLabel>
                <LocationValue>{location.lat}</LocationValue>
              </LocationItem>
              <LocationItem>
                <LocationLabel>Longitude:</LocationLabel>
                <LocationValue>{location.lng}</LocationValue>
              </LocationItem>
            </LocationInfo>
          </SuccessCard>
        )}
      </Card>
    </Container>
  );
};

export default TrackBooking;
