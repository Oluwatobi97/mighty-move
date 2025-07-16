import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { mockGetBookings } from "../utils/api";
import { toast } from "react-toastify";

const Container = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fffde7;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-right: 1rem;
`;

const Input = styled.input`
  padding: 0.6em 1em;
  border-radius: 10px;
  border: 1px solid #eee;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.7em 2em;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const BookingHistory = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookingItem = styled.li`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
  margin-bottom: 1rem;
  padding: 1rem;
`;

const Profile: React.FC = () => {
  // Mock user info
  const [user, setUser] = useState({
    name: "John Doe",
    email: "user@example.com",
  });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    mockGetBookings().then((data: any) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => {
    setEdit(false);
    setForm(user);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    setUser(form);
    setEdit(false);
    toast.success("Profile updated! (mock)");
  };

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Title>Profile</Title>
      <Section>
        <h3>User Info</h3>
        {edit ? (
          <>
            <div>
              <Label>Name:</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Email:</Label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>
            <Button onClick={handleSave}>Save</Button>{" "}
            <Button onClick={handleCancel} style={{ background: "#888" }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div>
              <Label>Name:</Label>
              {user.name}
            </div>
            <div>
              <Label>Email:</Label>
              {user.email}
            </div>
            <Button onClick={handleEdit}>Edit</Button>
          </>
        )}
      </Section>
      <Section>
        <h3>Booking & Payment History</h3>
        {loading ? (
          <div>Loading...</div>
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <BookingHistory>
            {bookings.map((b, i) => (
              <BookingItem key={i}>
                <div>
                  <b>Service:</b> {b.serviceType}
                </div>
                <div>
                  <b>Status:</b> {b.status}
                </div>
                <div>
                  <b>Date:</b> {b.date}
                </div>
                <div>
                  <b>Payment:</b> Paid (mock)
                </div>
              </BookingItem>
            ))}
          </BookingHistory>
        )}
      </Section>
    </Container>
  );
};

export default Profile;
