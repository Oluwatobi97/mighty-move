import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ServiceForm from "../components/ServiceForm";
import { mockBookService } from "../utils/api";
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
];

const LogisticsBooking: React.FC = () => {
  const formRef = useRef<any>(null);
  const handleSubmit = async (values: Record<string, string>) => {
    await mockBookService(values);
    toast.success("Logistics booking submitted!");
    if (formRef.current && formRef.current.reset) formRef.current.reset();
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
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Send Package"
      />
    </Container>
  );
};

export default LogisticsBooking;
