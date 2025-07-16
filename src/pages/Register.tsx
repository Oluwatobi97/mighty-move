import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../utils/api";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Container = styled(motion.div)`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 400px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
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

const Register: React.FC = () => {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const fields = [
    { name: "name", label: "Name", placeholder: "Enter your name" },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      const res: any = await register(
        values as { name: string; email: string; password: string }
      );
      setToken(res.token);
      if (auth?.setUser) auth.setUser(res.user);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/home"), 1200);
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || err.message || "Registration failed"
      );
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
        <Title>Register</Title>
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel="Register"
          footer={
            <div style={{ marginTop: "1.2rem", fontSize: "1rem" }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          }
          requireTerms={true}
        />
      </Card>
    </Container>
  );
};

export default Register;
