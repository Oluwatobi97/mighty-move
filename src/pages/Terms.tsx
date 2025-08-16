import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
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

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
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
    <SectionTitle>Payment Methods</SectionTitle>
    <p>
      <b>Bank Transfer:</b>
      <br />
      Bank: Santander PLC
      <br />
      Account Name: O S Odunaiya
      <br />
      Sort Code: 09-01-27
      <br />
      Account Number: 19477556
      <br />
      <br />
      <b>PayPal:</b>{" "}
      <a href="mailto:Olumidy_sezy@hotmail.co.uk">Olumidy_sezy@hotmail.co.uk</a>
    </p>
    <SectionTitle>Contact</SectionTitle>
    <p>
      <b>Email:</b>{" "}
      <a href="mailto:oladokunabiola969@gmail.com">
        oladokunabiola969@gmail.com
      </a>
      <br />
      <b>Phone:</b> <a href="tel:+447904893167">+44 7904 893167</a>,{" "}
      <a href="tel:+447350164970">+44 7350 164970</a>
    </p>
    <p>
      For the full legal document, please contact our support team or visit our
      website.
    </p>
  </Container>
);

export default Terms;
