import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.wasteType || !form.address || !form.frequency) {
      setError("Please fill in all fields.");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    // Here you would send the form data to the backend
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
      <Button type="submit">Book Waste Pickup</Button>
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "#388e3c", marginTop: 8 }}
        >
          Booking submitted!
        </motion.div>
      )}
    </FormCard>
  );
};

export default WasteBookingForm;
