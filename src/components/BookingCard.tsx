import React, { useState } from "react";
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
  id?: number;
  details?: any;
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
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  // Dark mode styles
  body.dark-mode & {
    background: #2d2d2d;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.15);
    
    // Dark mode hover styles
    body.dark-mode & {
      box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.6);
    }
  }

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
  color: #111;
  
  // Dark mode styles
  body.dark-mode & {
    color: #ffffff;
  }
`;

const DateText = styled.div`
  font-size: 1rem;
  color: #444;
  
  // Dark mode styles
  body.dark-mode & {
    color: #bbbbbb;
  }
`;

const UserText = styled.div`
  font-size: 0.95rem;
  color: #888;
  
  // Dark mode styles
  body.dark-mode & {
    color: #bbbbbb;
  }
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
  
  // Dark mode styles
  body.dark-mode & {
    color: #bbbbbb;
  }
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
  
  // Dark mode styles
  body.dark-mode & {
    color: #ffffff;
  }
`;

const WorkerBadge = styled.div<{ assigned: boolean }>`
  background: ${(props) => (props.assigned ? "#e8f5e8" : "#f0f0f0")};
  color: ${(props) => (props.assigned ? "#22c55e" : "#888")};
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  
  // Dark mode styles
  body.dark-mode & {
    background: ${(props) => (props.assigned ? "#1b5e20" : "#444444")};
    color: ${(props) => (props.assigned ? "#66bb6a" : "#bbbbbb")};
  }
`;

const NotesText = styled.div`
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  
  // Dark mode styles
  body.dark-mode & {
    background: #444444;
    color: #bbbbbb;
  }
`;

const TrackingLink = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  
  // Dark mode styles
  body.dark-mode & {
    background: #0d47a1;
    color: #64b5f6;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  // Dark mode styles
  body.dark-mode & {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 18px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  
  // Dark mode styles
  body.dark-mode & {
    background: #2d2d2d;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: #111;
  font-size: 1.5rem;
  
  // Dark mode styles
  body.dark-mode & {
    color: #ffffff;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  
  // Dark mode styles
  body.dark-mode & {
    color: #bbbbbb;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  
  // Dark mode styles
  body.dark-mode & {
    color: #bbbbbb;
  }
`;

const DetailBody = styled.div`
  font-weight: 500;
  color: #111;
  margin-top: 0.2rem;
  
  // Dark mode styles
  body.dark-mode & {
    color: #ffffff;
  }
`;

const TrackingButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: #1565c0;
  }
  
  // Dark mode styles
  body.dark-mode & {
    background: #0d47a1;
    
    &:hover {
      background: #1565c0;
    }
  }
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
  id,
  details,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTrackClick = () => {
    if (trackingNumber) {
      // Navigate to tracking page or open in same tab
      window.location.href = `/track?trackingId=${trackingNumber}`;
    }
  };

  return (
    <>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleCardClick}
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

        {!isAdmin && trackingNumber && status !== "Pending" && (
          <TrackingLink>Click to view tracking details</TrackingLink>
        )}
      </Card>

      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalTitle>Booking Details</ModalTitle>

            <DetailGrid>
              <DetailItem>
                <DetailHeader>Service Type</DetailHeader>
                <DetailBody>{serviceType} Booking</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailHeader>Status</DetailHeader>
                <DetailBody>
                  <StatusBadge status={status} />
                </DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailHeader>Date</DetailHeader>
                <DetailBody>{date}</DetailBody>
              </DetailItem>
              <DetailItem>
                <DetailHeader>Booking ID</DetailHeader>
                <DetailBody>#{id}</DetailBody>
              </DetailItem>
              {price && (
                <DetailItem>
                  <DetailHeader>Price</DetailHeader>
                  <DetailBody>
                    {typeof price === "number" || !isNaN(Number(price))
                      ? Number(price).toLocaleString("en-GB", {
                          style: "currency",
                          currency: "GBP",
                        })
                      : price}
                  </DetailBody>
                </DetailItem>
              )}
              {trackingNumber && (
                <DetailItem>
                  <DetailHeader>Tracking Number</DetailHeader>
                  <DetailBody>{trackingNumber}</DetailBody>
                </DetailItem>
              )}
            </DetailGrid>

            {address && (
              <div>
                <DetailHeader>Address</DetailHeader>
                <DetailBody>{address}</DetailBody>
              </div>
            )}

            {phone && (
              <div>
                <DetailHeader>Phone</DetailHeader>
                <DetailBody>{phone}</
