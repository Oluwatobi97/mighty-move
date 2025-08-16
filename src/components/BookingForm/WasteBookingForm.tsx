import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ServiceForm from "../ServiceForm";
import { createBooking } from "../../utils/api";
import { useNavigate } from "react-router-dom";

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
    name: "wasteType",
    label: "Waste Type",
    options: [
      "Household",
      "Construction",
      "Commercial",
      "Recyclable",
      "Hazardous",
    ],
  },
  {
    name: "address",
    label: "Pickup Address",
    placeholder: "Enter pickup address",
  },
  {
    name: "frequency",
    label: "Frequency",
    options: ["One-time", "Recurring"],
  },
];

const WasteBookingForm: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: Record<string, string>) => {
    console.log("WasteBookingForm: handleSubmit fired", values);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new (window as any).Error("Not authenticated");

      await createBooking(
        {
          service_type: "Waste",
          address: values.address,
          date: new Date().toISOString(),
          price: 0,
          waste_type: values.wasteType,
          frequency: values.frequency,
        },
        token
      );

      navigate("/home");
    } catch (err: any) {
      alert(err.message || "Booking failed. Try again.");
    }

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
        <Title>Book Waste Pickup For Me</Title>
        <ArticleText>
          Schedule a waste pickup for your home, business, or construction site.
          Select the waste type, frequency, and provide the pickup address.
        </ArticleText>
      </Card>

      <ServiceForm
        ref={formRef}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Book Waste Pickup"
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
        <a href="mailto:Olumidy_sezy@hotmail.co.uk">
          Olumidy_sezy@hotmail.co.uk
        </a>
      </PaymentSection>
    </Container>
  );
};

export default WasteBookingForm;
