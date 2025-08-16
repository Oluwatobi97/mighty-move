import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterBar = styled.footer`
  background: var(--highlight-color);
  padding: 2rem 1rem 1.2rem 1rem;
  text-align: center;
  font-size: 1rem;
  color: var(--btn-text);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: 2rem;
`;
const FooterSection = styled.div`
  margin-bottom: 0.7rem;
`;
const FooterLabel = styled.span`
  font-weight: 600;
  color: var(--btn-text);
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
    <div style={{ fontSize: "0.95em", color: "var(--btn-text)", marginTop: 8 }}>
      &copy; {new Date().getFullYear()} Mighty Moves. All rights reserved.
    </div>
  </FooterBar>
);

export default Footer;
