import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../utils/api";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const fields = [
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
    setLoading(true);
    try {
      const res: any = await login(
        values as { email: string; password: string }
      );
      setToken(res.token);
      if (auth?.setUser) auth.setUser(res.user);
      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 800);
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Title>Login</Title>
        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel={loading ? <Spinner /> : "Login"}
          submitDisabled={loading}
          footer={
            <div style={{ marginTop: "1.2rem", fontSize: "1rem" }}>
              Don&apos;t have an account? <Link to="/register">Sign up</Link>
            </div>
          }
        />
      </Card>
    </Container>
  );
};

export default Login;
