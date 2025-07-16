import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
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
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: #fffde7;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: #111;
    color: white;
    &:hover { background: #333; }
  `
      : `
    background: #f0f0f0;
    color: #333;
    &:hover { background: #e0e0e0; }
  `}
`;

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "status" | "worker" | "notes";
  booking?: any;
  onSubmit: (data: any) => void;
  workers?: any[];
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  type,
  booking,
  onSubmit,
  workers = [],
}) => {
  const [formData, setFormData] = React.useState({
    status: booking?.status || "",
    worker: booking?.assignedWorker || "",
    notes: booking?.notes || "",
  });

  React.useEffect(() => {
    if (booking) {
      setFormData({
        status: booking.status || "",
        worker: booking.assignedWorker || "",
        notes: booking.notes || "",
      });
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case "status":
        return "Update Booking Status";
      case "worker":
        return "Assign Worker";
      case "notes":
        return "Add Notes";
      default:
        return "Admin Action";
    }
  };

  const renderForm = () => {
    switch (type) {
      case "status":
        return (
          <FormGroup>
            <Label>New Status</Label>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </FormGroup>
        );

      case "worker":
        return (
          <FormGroup>
            <Label>Assign Worker</Label>
            <input
              type="text"
              value={formData.worker}
              onChange={(e) =>
                setFormData({ ...formData, worker: e.target.value })
              }
              placeholder="Enter worker name"
              required
              style={{
                padding: "0.8rem",
                border: "2px solid #ddd",
                borderRadius: "12px",
                fontSize: "1rem",
              }}
            />
          </FormGroup>
        );

      case "notes":
        return (
          <FormGroup>
            <Label>Notes</Label>
            <TextArea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add notes about this booking..."
            />
          </FormGroup>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Title>{getTitle()}</Title>
            {booking && (
              <div
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "#f9f9f9",
                  borderRadius: "12px",
                }}
              >
                <strong>Booking #{booking.id}</strong> - {booking.serviceType}
                <br />
                <small>Customer: {booking.user}</small>
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              {renderForm()}
              <ButtonGroup>
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {type === "status"
                    ? "Update Status"
                    : type === "worker"
                    ? "Assign Worker"
                    : "Save Notes"}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
