import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ServiceForm from "../components/ServiceForm";
import { createBooking } from "../utils/api"; // ✅ Using real API
import { toast } from "react-toastify";

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

const fields = [
  {
    name: "pickup",
    label: "Pickup Location",
    placeholder: "Enter pickup address",
  },
  {
    name: "dropoff",
    label: "Drop-off Location",
    placeholder: "Enter drop-off address",
  },
  {
    name: "vehicle",
    label: "Vehicle Type",
    options: ["Small Van", "Medium Truck", "Large Truck", "Specialty Vehicle"],
  },
  {
    name: "datetime",
    label: "Preferred Date & Time",
    type: "datetime-local",
  },
];

const MoveBooking: React.FC = () => {
  const formRef = useRef<any>(null);

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      const token = localStorage.getItem("token"); // Get auth token

      // Set dynamic price based on vehicle type
      const priceMap: Record<string, number> = {
        "Small Van": 100,
        "Medium Truck": 150,
        "Large Truck": 200,
        "Specialty Vehicle": 250,
      };

      const price = priceMap[values.vehicle] || 150;

      // Prepare data for backend
      const data = {
        service_type: values.vehicle,
        address: `${values.pickup} to ${values.dropoff}`,
        date: values.datetime,
        price: price,
        details: {
          pickup: values.pickup,
          dropoff: values.dropoff,
          vehicle: values.vehicle,
          datetime: values.datetime,
        },
      };

      await createBooking(data, token || "");
      toast.success("Move booking submitted!");

      if (formRef.current && formRef.current.reset) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Failed to submit booking.");
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
        <Title>Book the Move</Title>
        <ArticleText>
          Plan your move with confidence. Select your pickup and drop-off
          locations, choose the right vehicle, and set your preferred date and
          time. Our experienced movers will handle your belongings with care and
          efficiency.
        </ArticleText>
      </Card>
      <ServiceForm
        ref={formRef}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Book Move"
      />
    </Container>
  );
};

export default MoveBooking;
