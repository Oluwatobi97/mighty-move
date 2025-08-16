import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { mockGetBookings } from "../utils/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Container = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 18px;
  box-shadow: var(--shadow);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-right: 1rem;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.6em 1em;
  border-radius: 10px;
  border: 1px solid var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
  background: var(--card-bg);
  color: var(--text-primary);
`;

const Button = styled.button`
  background: var(--highlight-color);
  color: var(--btn-text);
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
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
  padding: 1rem;
`;

const Profile: React.FC = () => {
  const auth = useContext(AuthContext);
  // Use real user info from context if available
  const [user, setUser] = useState({
    name: auth?.user?.name || "John Doe",
    email: auth?.user?.email || "user@example.com",
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
    setUser({ ...user, name: form.name }); // Only update name
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
              <Input name="email" value={form.email} disabled />
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
            <Button onClick={handleEdit}>Edit Name</Button>
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
