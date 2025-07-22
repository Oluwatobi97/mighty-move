import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../utils/api";

const FormCard = styled(motion.form)`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
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

const Select = styled.select`
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
  margin-top: 1rem;
`;

const Error = styled.div`
  color: #d32f2f;
  font-size: 0.98rem;
  margin-top: -1rem;
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

const wasteTypes = [
  "Household",
  "Construction",
  "Commercial",
  "Recyclable",
  "Hazardous",
];

const WasteBookingForm: React.FC = () => {
  const [form, setForm] = useState({
    wasteType: "",
    address: "",
    frequency: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("WasteBookingForm: handleSubmit fired", form);
    if (!form.wasteType || !form.address || !form.frequency) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new (window as any).Error("Not authenticated");
      await createBooking(
        {
          service_type: "Waste",
          address: form.address,
          date: new Date().toISOString(), // You can update this to use a real date field
          price: 0, // Add price logic if needed
          waste_type: form.wasteType,
          frequency: form.frequency,
        },
        token
      );
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="wasteType">Waste Type</Label>
        <Select
          id="wasteType"
          name="wasteType"
          value={form.wasteType}
          onChange={handleChange}
        >
          <option value="">Select waste type</option>
          {wasteTypes.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="address">Pickup Address</Label>
        <Input
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter pickup address"
        />
      </div>
      <div>
        <Label htmlFor="frequency">Frequency</Label>
        <Select
          id="frequency"
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
        >
          <option value="">Select frequency</option>
          <option value="One-time">One-time</option>
          <option value="Recurring">Recurring</option>
        </Select>
      </div>
      {error && <Error>{error}</Error>}
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
      <Button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Waste Pickup"}
      </Button>
    </FormCard>
  );
};

export default WasteBookingForm;
