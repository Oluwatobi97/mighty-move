import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
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

const Terms: React.FC = () => (
  <Container>
    <Title>Terms and Conditions</Title>
    <p>
      By using Mighty Moves, you agree to our terms and conditions. All bookings
      are subject to availability and confirmation. Payment must be completed
      before service is rendered. Cancellations may be subject to fees. We are
      not liable for delays due to unforeseen circumstances. For full details,
      please read our complete terms below.
    </p>
    <ul>
      <li>All payments are processed securely via your selected method.</li>
      <li>Bank transfer details will be provided after booking.</li>
      <li>Apple Pay and PayPal are supported for instant payment.</li>
      <li>By booking, you agree to our privacy policy and service terms.</li>
      <li>Contact support for any questions or disputes.</li>
    </ul>
    <p>
      For the full legal document, please contact our support team or visit our
      website.
    </p>
  </Container>
);

export default Terms;
