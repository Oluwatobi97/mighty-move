import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterBar = styled(motion.footer)`
  background: #fff9c4;
  color: #111111;
  box-shadow: 0 -8px 32px 0 rgba(31, 38, 135, 0.1);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 2rem 0 1rem 0;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 3rem;
`;

const Footer: React.FC = () => (
  <FooterBar
    initial={{ y: 60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
  >
    <div>
      &copy; {new Date().getFullYear()} Multi-Service Platform. All rights
      reserved.
      <br />
      <span style={{ fontSize: "0.95em", color: "#888" }}>
        Designed with care for your convenience.
      </span>
    </div>
  </FooterBar>
);

export default Footer;
