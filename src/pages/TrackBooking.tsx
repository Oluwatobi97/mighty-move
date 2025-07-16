import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// Add Google Maps import
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Container = styled(motion.div)`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 700px;
  margin: 0 auto;
`;

const Card = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
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

const TrackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.8em 1.2em;
  border-radius: 12px;
  border: 1px solid #fff9c4;
  font-size: 1rem;
  background: #fff;
  color: #111;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
`;

const Button = styled.button`
  align-self: flex-start;
`;

const TrackBooking: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Maps API key (replace with your real key or use env variable)
  const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Mock function to get location by tracking number
  const fetchLocation = async (tracking: string) => {
    // Use London, UK as the city center
    const cityCenter = { lat: 51.5074, lng: -0.1278 }; // London, UK
    const randomOffset = () => (Math.random() - 0.5) * 0.1;
    return {
      lat: cityCenter.lat + randomOffset(),
      lng: cityCenter.lng + randomOffset(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const loc = await fetchLocation(trackingNumber);
      setLocation(loc);
    } catch (err) {
      setError("Tracking number not found.");
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

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
        <Title>Track Your Booking</Title>
        <ArticleText>
          Enter your Tracking Number to see the real-time location of your
          package.
        </ArticleText>
        <TrackForm onSubmit={handleSubmit}>
          <label>Tracking Number:</label>
          <Input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Tracking..." : "Track"}
          </Button>
        </TrackForm>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {isLoaded && location && (
          <div style={{ marginTop: 24 }}>
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "350px",
                borderRadius: 16,
              }}
              center={location}
              zoom={14}
            >
              <Marker position={location} />
            </GoogleMap>
            <div style={{ marginTop: 8, fontWeight: 600 }}>
              Current Location: Lat {location.lat.toFixed(5)}, Lng{" "}
              {location.lng.toFixed(5)}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default TrackBooking;
