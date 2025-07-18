import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BookingCard from "../components/BookingCard";
import StatsCard from "../components/StatsCard";
import AdminModal from "../components/AdminModal";
import {
  mockGetBookings,
  mockUpdateBookingStatus,
  mockAssignWorker,
  mockGetBookingStats,
  mockGetWorkers,
  mockGetNotifications,
  mockClearNotifications,
  mockApproveBooking,
} from "../utils/api";
import { toast } from "react-toastify";

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatsBlock = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    padding: 1.5rem 1.2rem;
    margin-bottom: 2rem;
  }
`;
const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  padding: 0.7rem 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const ControlsSection = styled(motion.div)`
  background: #fffde7;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
`;

const ControlsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  min-width: 250px;
  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const BookingsSection = styled(motion.div)`
  background: #fffde7;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
`;

const BookingsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111;
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BookingWrapper = styled.div`
  position: relative;
`;

const AdminControls = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ControlButton = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return "background: #111; color: white; &:hover { background: #333; }";
      case "danger":
        return "background: #ef4444; color: white; &:hover { background: #dc2626; }";
      default:
        return "background: #f0f0f0; color: #333; &:hover { background: #e0e0e0; }";
    }
  }}
`;

const Spinner = styled.div`
  margin: 2rem auto;
  border: 4px solid #eee;
  border-top: 4px solid #111;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

// Add styled components for the new layout
const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

const DashboardSection = styled.div`
  flex: 2;
  min-width: 0;
`;

const NotificationsPanel = styled.aside`
  flex: 1;
  background: #fff3cd; /* light yellow/orange for notifications */
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.08);
  padding: 2rem 1.5rem;
  min-width: 320px;
  max-width: 400px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  margin-bottom: 0;
  margin-top: 2rem;
  @media (max-width: 900px) {
    position: static;
    width: 100%;
    max-width: 100%;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    padding: 1.2rem 0.7rem;
    min-width: 0;
  }
`;

const NotificationsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li<{ unread: boolean }>`
  background: ${({ unread }) => (unread ? "#fff176" : "#f9f9f9")};
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;
  font-weight: ${({ unread }) => (unread ? 700 : 400)};
  box-shadow: ${({ unread }) =>
    unread ? "0 2px 8px 0 rgba(255, 193, 7, 0.15)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MarkReadButton = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4em 1em;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
`;

const PanelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 320px;
  max-width: 400px;
  @media (max-width: 900px) {
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
    gap: 1.5rem;
  }
`;

const HistoryPanel = styled.aside`
  background: #e7f3ff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.08);
  padding: 2rem 1.5rem;
  min-width: 320px;
  max-width: 400px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  @media (max-width: 900px) {
    position: static;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding: 1.2rem 0.7rem;
    min-width: 0;
  }
`;

const HistoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryItem = styled.li`
  background: #f4faff;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #dbefff;
  }
`;

const ResponsiveCard = styled(BookingsSection)`
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
  }
`;

const CenteredPanel = styled(NotificationsPanel)`
  @media (max-width: 700px) {
    margin: 0 auto 1.5rem auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TopPanelsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
`;

const CenteredMainCard = styled(ResponsiveCard)`
  margin: 0 auto;
  max-width: 700px;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
  }
`;

const MainCard = styled(motion.section)`
  background: #fffde7;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    gap: 1.2rem;
  }
`;
const PanelCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
  padding: 1.5rem 1.2rem;
  max-width: 400px;
  min-width: 260px;
  width: 100%;
  @media (max-width: 700px) {
    padding: 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
    min-width: 0;
  }
`;
const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #111;
`;

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"status" | "worker" | "notes">(
    "status"
  );
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [readNotifications, setReadNotifications] = useState<Set<number>>(
    new Set()
  );
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<any>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [activeHistory, setActiveHistory] = useState<any>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 700);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filterBookings = () => {
    let filtered = [...bookings];

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.serviceType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    if (serviceFilter) {
      filtered = filtered.filter(
        (booking) => booking.serviceType === serviceFilter
      );
    }

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    loadData();
    loadNotifications();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter, serviceFilter, filterBookings]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsData, statsData, workersData] = await Promise.all([
        mockGetBookings(),
        mockGetBookingStats(),
        mockGetWorkers(),
      ]);
      setBookings(bookingsData as any[]);
      setStats(statsData as any);
      setWorkers(workersData as any[]);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = async () => {
    const notes = await mockGetNotifications();
    setNotifications(notes as any[]);
  };

  const handleUpdateStatus = async (data: any) => {
    try {
      await mockUpdateBookingStatus(selectedBooking.id, data.status);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, status: data.status }
            : booking
        )
      );
      toast.success(
        `Booking #${selectedBooking.id} status updated to ${data.status}`
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAssignWorker = async (data: any) => {
    try {
      await mockAssignWorker(selectedBooking.id, data.worker);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, assignedWorker: data.worker }
            : booking
        )
      );
      toast.success(
        `Worker ${data.worker} assigned to booking #${selectedBooking.id}`
      );
    } catch (error) {
      toast.error("Failed to assign worker");
    }
  };

  const handleApproveBooking = async (booking: any) => {
    const updated = await mockApproveBooking(booking);
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, ...(updated as any) } : b))
    );
    toast.success(`Booking #${booking.id} approved!`);
    loadNotifications();
  };

  const openModal = (type: "status" | "worker" | "notes", booking: any) => {
    setModalType(type);
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: any) => {
    if (modalType === "status") {
      handleUpdateStatus(data);
    } else if (modalType === "worker") {
      handleAssignWorker(data);
    }
  };

  const handleMarkNotificationRead = (idx: number) => {
    setReadNotifications((prev) => new Set(prev).add(idx));
  };

  const handleNotificationClick = (notification: any, idx: number) => {
    setActiveNotification(notification);
    setNotificationModalOpen(true);
    setReadNotifications((prev) => new Set(prev).add(idx));
  };

  const handleHistoryClick = (booking: any) => {
    setActiveHistory(booking);
    setHistoryModalOpen(true);
  };

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MainCard
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 style={{ marginBottom: "1.2rem" }}>Admin Dashboard</h2>
        <TopPanelsWrapper>
          <PanelCard>
            <SectionTitle>Notifications</SectionTitle>
            <NotificationList>
              {notifications.length === 0 ? (
                <li>No notifications.</li>
              ) : (
                (showAllNotifications
                  ? notifications
                  : notifications.slice(0, 2)
                ).map((n, i) => (
                  <NotificationItem
                    key={i}
                    unread={!readNotifications.has(i)}
                    onClick={() => handleNotificationClick(n, i)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{n.message}</span>
                    {!readNotifications.has(i) && (
                      <MarkReadButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkNotificationRead(i);
                        }}
                      >
                        Mark as Read
                      </MarkReadButton>
                    )}
                  </NotificationItem>
                ))
              )}
            </NotificationList>
            {notifications.length > 2 && (
              <MarkReadButton
                style={{ marginTop: 8, width: "100%" }}
                onClick={() => setShowAllNotifications((prev) => !prev)}
              >
                {showAllNotifications ? "Show Less" : "Show All"}
              </MarkReadButton>
            )}
            {notificationModalOpen && activeNotification && (
              <AdminModal
                isOpen={notificationModalOpen}
                onClose={() => setNotificationModalOpen(false)}
                type="notes"
                booking={activeNotification.booking}
                onSubmit={() => setNotificationModalOpen(false)}
              />
            )}
          </PanelCard>
          <PanelCard>
            <SectionTitle>History</SectionTitle>
            <HistoryList>
              {bookings.filter((b) => b.status !== "Pending").length === 0 ? (
                <li>No history yet.</li>
              ) : (
                (showAllHistory
                  ? bookings
                      .filter((b) => b.status !== "Pending")
                      .sort((a, b) => (b.date > a.date ? 1 : -1))
                  : bookings
                      .filter((b) => b.status !== "Pending")
                      .sort((a, b) => (b.date > a.date ? 1 : -1))
                      .slice(0, 2)
                ).map((b, i) => (
                  <HistoryItem
                    key={b.id || i}
                    onClick={() => handleHistoryClick(b)}
                  >
                    <span>
                      <strong>{b.user}</strong> - {b.serviceType} ({b.status})
                    </span>
                    <span style={{ fontSize: "0.95em", color: "#888" }}>
                      {b.date}
                    </span>
                  </HistoryItem>
                ))
              )}
            </HistoryList>
            {bookings.filter((b) => b.status !== "Pending").length > 2 && (
              <MarkReadButton
                style={{ marginTop: 8, width: "100%" }}
                onClick={() => setShowAllHistory((prev) => !prev)}
              >
                {showAllHistory ? "Show Less" : "Show All"}
              </MarkReadButton>
            )}
            {historyModalOpen && activeHistory && (
              <AdminModal
                isOpen={historyModalOpen}
                onClose={() => setHistoryModalOpen(false)}
                type="notes"
                booking={activeHistory}
                onSubmit={() => setHistoryModalOpen(false)}
              />
            )}
          </PanelCard>
        </TopPanelsWrapper>
        {/* Stats Section */}
        {isMobile ? (
          <StatsBlock>
            <StatRow>
              <span>Total Bookings</span>
              <span>{stats?.total ?? 0}</span>
            </StatRow>
            <StatRow>
              <span>Pending</span>
              <span>{stats?.pending ?? 0}</span>
            </StatRow>
            <StatRow>
              <span>In Progress</span>
              <span>{stats?.inProgress ?? 0}</span>
            </StatRow>
            <StatRow>
              <span>Completed</span>
              <span>{stats?.completed ?? 0}</span>
            </StatRow>
            <StatRow>
              <span>Revenue</span>
              <span>
                {stats?.revenue?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }) ?? "£0.00"}
              </span>
            </StatRow>
            <StatRow>
              <span>This Month</span>
              <span>{stats?.thisMonth ?? 0}</span>
            </StatRow>
          </StatsBlock>
        ) : (
          <StatsGrid
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              value={stats?.total ?? 0}
              label="Total Bookings"
              delay={0.1}
            />
            <StatsCard
              value={stats?.pending ?? 0}
              label="Pending"
              delay={0.2}
            />
            <StatsCard
              value={stats?.inProgress ?? 0}
              label="In Progress"
              delay={0.3}
            />
            <StatsCard
              value={stats?.completed ?? 0}
              label="Completed"
              delay={0.4}
            />
            <StatsCard
              value={
                stats?.revenue?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }) ?? "£0.00"
              }
              label="Revenue"
              delay={0.5}
            />
            <StatsCard
              value={stats?.thisMonth ?? 0}
              label="This Month"
              change={100}
              delay={0.6}
            />
          </StatsGrid>
        )}
        {/* Filters & Bookings Section */}
        <ControlsSection>
          <ControlsTitle>Filters & Search</ControlsTitle>
          <ControlsRow>
            <SearchInput
              placeholder="Search by customer, service, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </FilterSelect>
            <FilterSelect
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="">All Services</option>
              <option value="Moving">Moving</option>
              <option value="Waste">Waste</option>
              <option value="Logistics">Logistics</option>
            </FilterSelect>
          </ControlsRow>
        </ControlsSection>
        <BookingsSection>
          <BookingsTitle>Bookings ({filteredBookings.length})</BookingsTitle>
          {filteredBookings.length === 0 ? (
            <EmptyState>
              {searchTerm || statusFilter || serviceFilter
                ? "No bookings match your filters."
                : "No bookings found."}
            </EmptyState>
          ) : (
            <BookingsGrid>
              {filteredBookings.map((booking) => (
                <BookingWrapper key={booking.id}>
                  <BookingCard {...booking} isAdmin={true} />
                  {booking.status === "Pending" && (
                    <ControlButton
                      variant="primary"
                      onClick={() => handleApproveBooking(booking)}
                    >
                      Approve
                    </ControlButton>
                  )}
                  <ControlButton onClick={() => openModal("status", booking)}>
                    Update Status
                  </ControlButton>
                  <ControlButton onClick={() => openModal("worker", booking)}>
                    Assign Worker
                  </ControlButton>
                  <ControlButton onClick={() => openModal("notes", booking)}>
                    Add Notes
                  </ControlButton>
                </BookingWrapper>
              ))}
            </BookingsGrid>
          )}
        </BookingsSection>
      </MainCard>
    </Container>
  );
};

export default AdminDashboard;
