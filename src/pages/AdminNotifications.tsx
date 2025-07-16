import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { mockGetNotifications, mockClearNotifications } from "../utils/api";

const Container = styled(motion.div)`
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 700px;
  margin: 0 auto;
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

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NotificationItem = styled.li<{ unread: boolean }>`
  background: ${({ unread }) => (unread ? "#fff176" : "#f9f9f9")};
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  font-weight: ${({ unread }) => (unread ? 700 : 400)};
  box-shadow: ${({ unread }) =>
    unread ? "0 2px 8px 0 rgba(255, 193, 7, 0.15)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
`;

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [read, setRead] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const notes = await mockGetNotifications();
    setNotifications(notes as any[]);
  };

  const handleMarkRead = (idx: number) => {
    setRead((prev) => new Set(prev).add(idx));
  };

  const handleClearAll = async () => {
    await mockClearNotifications();
    setNotifications([]);
    setRead(new Set());
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
        <Title>Admin Notifications</Title>
        <Button onClick={handleClearAll} style={{ marginBottom: 16 }}>
          Clear All
        </Button>
        <NotificationList>
          {notifications.length === 0 ? (
            <li>No notifications.</li>
          ) : (
            notifications.map((n, i) => (
              <NotificationItem key={i} unread={!read.has(i)}>
                <span>{n.message}</span>
                {!read.has(i) && (
                  <Button onClick={() => handleMarkRead(i)}>
                    Mark as Read
                  </Button>
                )}
              </NotificationItem>
            ))
          )}
        </NotificationList>
      </Card>
    </Container>
  );
};

export default AdminNotifications;
