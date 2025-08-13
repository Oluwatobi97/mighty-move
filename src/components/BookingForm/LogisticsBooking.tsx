import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ServiceForm from "../ServiceForm";
import { createBooking } from "../../utils/api";
import { useNavigate } from "react-router-dom";
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

const PaymentSection = styled.div`
  background: #fffde7;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #444;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
`;

const fields = [
  {
    name: "sender",
    label: "Sender Info",
    placeholder: "Sender name, phone, address",
  },
  {
    name: "receiver",
    label: "Receiver Info",
    placeholder: "Receiver name, phone, address",
  },
  {
    name: "package",
    label: "Package Details",
    placeholder: "Weight, size, description",
  },
  {
    name: "deliveryType",
    label: "Delivery Type",
    options: ["Standard", "Express"],
  },
  {
    name: "pickupDate",
    label: "Pickup Date & Time",
    type: "datetime-local",
  },
];

const LogisticsBooking: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to book a service.");
        return;
      }

      // Set dynamic price based on delivery type
      const priceMap: Record<string, number> = {
        Standard: 25,
        Express: 50,
      };

      const price = priceMap[values.deliveryType] || 25;

      await createBooking(
        {
          service_type: "Logistics",
          address: `${values.sender} to ${values.receiver}`,
          date: values.pickupDate,
          price: price,
          details: {
            sender: values.sender,
            receiver: values.receiver,
            package: values.package,
            delivery_type: values.deliveryType,
            pickup_date: values.pickupDate,
          },
        },
        token
      );

      toast.success("Logistics booking submitted successfully!");

      // Reset form
      if (formRef.current && formRef.current.reset) {
        formRef.current.reset();
      }

      // Navigate to home or bookings page
      navigate("/home");
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.message || "Failed to submit booking. Please try again.");
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
        <Title>Send a Package</Title>
        <ArticleText>
          Send your packages quickly and securely. Enter sender and receiver
          details, package information, and choose your preferred delivery type.
          Track your shipment every step of the way.
        </ArticleText>
      </Card>

      <ServiceForm
        ref={formRef}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Send Package"
      />

      <PaymentSection>
        <b>Payment Methods:</b>
        <br />
        <b>Bank:</b> Santander PLC
        <br />
        <b>Account Name:</b> O S Odunaiya
        <br />
        <b>Sort Code:</b> 09-01-27
        <br />
        <b>Account Number:</b> 19477556
        <br />
        <b>PayPal:</b>{" "}
        <a href="Olumidy_sezy@hotmail.co.uk">Olumidy_sezy@hotmail.co.uk</a>
      </PaymentSection>
    </Container>
  );
};

export default LogisticsBooking;
