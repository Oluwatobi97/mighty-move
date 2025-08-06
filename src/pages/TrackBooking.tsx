import React, { useState } from "react";
import axios from "axios";

const TrackBooking: React.FC = () => {
  const [trackingId, setTrackingId] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      setError("");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/bookings/track/${trackingId}`
      );

      if (response.data.location) {
        setLocation(response.data.location);
      } else {
        setError("No location found for this tracking ID.");
        setLocation(null);
      }
    } catch (err: any) {
      console.error("Tracking failed:", err);
      setError(err.response?.data?.error || "Failed to fetch tracking info.");
      setLocation(null);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Track Your Booking</h2>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter tracking ID"
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={handleTrack} style={{ padding: "0.5rem 1rem" }}>
        Track
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {location && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Current Location:</h4>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  );
};

export default TrackBooking;
