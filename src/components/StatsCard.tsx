import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  text-align: center;
  min-width: 120px;
  flex: 1;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const Change = styled.div<{ positive?: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.positive ? "#22c55e" : "#ef4444")};
  margin-top: 0.5rem;
`;

interface StatsCardProps {
  value: number | string;
  label: string;
  change?: number;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  change,
  delay = 0,
}) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Value>{value}</Value>
      <Label>{label}</Label>
      {change !== undefined && (
        <Change positive={change >= 0}>
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </Change>
      )}
    </Card>
  );
};

export default StatsCard;
