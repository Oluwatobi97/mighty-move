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

const vehicleOptions = [
  "Small Van",
  "Medium Truck",
  "Large Truck",
  "Specialty Vehicle",
];

const MoveBookingForm: React.FC = () => {
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    vehicle: "",
    datetime: "",
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
    console.log("MoveBookingForm: handleSubmit fired", form);
    if (!form.pickup || !form.dropoff || !form.vehicle || !form.datetime) {
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
          service_type: "Moving",
          address: `${form.pickup} to ${form.dropoff}`,
          date: form.datetime,
          price: 0, // You can add price logic if needed
          vehicle: form.vehicle,
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
        <Label htmlFor="pickup">Pickup Location</Label>
        <Input
          id="pickup"
          name="pickup"
          value={form.pickup}
          onChange={handleChange}
          placeholder="Enter pickup address"
        />
      </div>
      <div>
        <Label htmlFor="dropoff">Drop-off Location</Label>
        <Input
          id="dropoff"
          name="dropoff"
          value={form.dropoff}
          onChange={handleChange}
          placeholder="Enter drop-off address"
        />
      </div>
      <div>
        <Label htmlFor="vehicle">Vehicle Type</Label>
        <Select
          id="vehicle"
          name="vehicle"
          value={form.vehicle}
          onChange={handleChange}
        >
          <option value="">Select vehicle</option>
          {vehicleOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="datetime">Preferred Date & Time</Label>
        <Input
          id="datetime"
          name="datetime"
          type="datetime-local"
          value={form.datetime}
          onChange={handleChange}
        />
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
        {loading ? "Booking..." : "Book Move"}
      </Button>
    </FormCard>
  );
};

export default MoveBookingForm;
