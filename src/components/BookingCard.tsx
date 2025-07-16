import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import StatusBadge from "./StatusBadge";

export type BookingCardProps = {
  serviceType: string;
  status: string;
  date: string;
  user?: string;
  address?: string;
  phone?: string;
  assignedWorker?: string | null;
  price?: string;
  notes?: string;
  isAdmin?: boolean;
  trackingNumber?: string;
};

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 1.5rem 1.2rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 220px;
  max-width: 400px;
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    max-width: 98vw;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServiceType = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
`;

const DateText = styled.div`
  font-size: 1rem;
  color: #444;
`;

const UserText = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
`;

const WorkerBadge = styled.div<{ assigned: boolean }>`
  background: ${(props) => (props.assigned ? "#e8f5e8" : "#f0f0f0")};
  color: ${(props) => (props.assigned ? "#22c55e" : "#888")};
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const NotesText = styled.div`
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const BookingCard: React.FC<BookingCardProps> = ({
  serviceType,
  status,
  date,
  user,
  address,
  phone,
  assignedWorker,
  price,
  notes,
  isAdmin = false,
  trackingNumber,
}) => (
  <Card
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <TopRow>
      <ServiceType>{serviceType} Booking</ServiceType>
      <StatusBadge status={status} />
    </TopRow>
    <DateText>Date: {date}</DateText>
    {trackingNumber && status !== "Pending" && (
      <DetailRow>
        <DetailLabel>Tracking #:</DetailLabel>
        <DetailValue>{trackingNumber}</DetailValue>
      </DetailRow>
    )}
    {user && <UserText>Customer: {user}</UserText>}

    {isAdmin && (
      <>
        {address && (
          <DetailRow>
            <DetailLabel>Address:</DetailLabel>
            <DetailValue>{address}</DetailValue>
          </DetailRow>
        )}
        {phone && (
          <DetailRow>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{phone}</DetailValue>
          </DetailRow>
        )}
        <DetailRow>
          <DetailLabel>Worker:</DetailLabel>
          <WorkerBadge assigned={!!assignedWorker}>
            {assignedWorker || "Unassigned"}
          </WorkerBadge>
        </DetailRow>
        {price && (
          <DetailRow>
            <DetailLabel>Price:</DetailLabel>
            <DetailValue>
              {typeof price === "number" || !isNaN(Number(price))
                ? Number(price).toLocaleString("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  })
                : price}
            </DetailValue>
          </DetailRow>
        )}
        {notes && <NotesText>Notes: {notes}</NotesText>}
      </>
    )}
  </Card>
);

export default BookingCard;
