import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterBar = styled.footer`
  background: #fff9c4;
  padding: 2rem 1rem 1.2rem 1rem;
  text-align: center;
  font-size: 1rem;
  color: #444;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: 2rem;
`;
const FooterSection = styled.div`
  margin-bottom: 0.7rem;
`;
const FooterLabel = styled.span`
  font-weight: 600;
  color: #111;
`;

const Footer: React.FC = () => (
  <FooterBar>
    <FooterSection>
      <FooterLabel>Contact:</FooterLabel>
      <br />
      <a href="mailto:oladokunabiola969@gmail.com">
        oladokunabiola969@gmail.com
      </a>
      <br />
      <a href="tel:+447904893167">+44 7904 893167</a>,{" "}
      <a href="tel:+447350164970">+44 7350 164970</a>
    </FooterSection>
    <FooterSection>
      <FooterLabel>Payment Methods:</FooterLabel>
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
      <a href="mailto:Olumidy_sezy@hotmail.co.uk">Olumidy_sezy@hotmail.co.uk</a>
    </FooterSection>
    <div style={{ fontSize: "0.95em", color: "#888", marginTop: 8 }}>
      &copy; {new Date().getFullYear()} Mighty Moves. All rights reserved.
    </div>
  </FooterBar>
);

export default Footer;
