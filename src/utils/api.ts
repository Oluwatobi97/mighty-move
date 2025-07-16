import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Use backend port 5000
  withCredentials: true,
});

// --- REAL API FUNCTIONS ---
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/users/register", data);
  // For now, return a mock token and the user
  return {
    token: "mock-token",
    user: res.data.user,
  };
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/users/login", data);
  return {
    token: res.data.token,
    user: res.data.user,
  };
};

// --- MOCK API FUNCTIONS ---
export const mockLogin = async (data: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "user@example.com" && data.password === "password") {
        resolve({
          token: "mock-token",
          user: { name: "John Doe", email: data.email },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 800);
  });
};

export const mockRegister = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "mock-token",
        user: { name: data.name, email: data.email },
      });
    }, 900);
  });
};

// --- MOCK NOTIFICATION SYSTEM ---
let mockNotifications: { message: string; timestamp: number; booking?: any }[] =
  [];
export const mockGetNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockNotifications]);
    }, 200);
  });
};
export const mockClearNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockNotifications = [];
      resolve(true);
    }, 200);
  });
};

export const mockBookService = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const booking = {
        bookingId: Math.floor(Math.random() * 1000000),
        status: "Pending",
        ...data,
        price:
          typeof data.price === "string"
            ? Number(data.price.replace(/[^\d.]/g, ""))
            : data.price,
      };
      // Add notification for admin with booking data
      mockNotifications.push({
        message: `${data.user || "A user"} has made a new booking!`,
        timestamp: Date.now(),
        booking,
      });
      resolve(booking);
    }, 1000);
  });
};

function generateTrackingNumber() {
  return (
    "TRK-" +
    Math.random().toString(36).substr(2, 4).toUpperCase() +
    "-" +
    Math.floor(1000 + Math.random() * 9000)
  );
}

export const mockApproveBooking = async (booking: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...booking,
        status: "In Progress",
        trackingNumber: generateTrackingNumber(),
      });
    }, 700);
  });
};

export const mockGetBookings = async (userId?: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allBookings = [
        {
          id: 1,
          serviceType: "Moving",
          status: "In Progress",
          date: "2024-07-10 10:00",
          user: "John Doe",
          address: "123 Main St, City",
          phone: "+1-555-0123",
          assignedWorker: "Mike Johnson",
          price: 150,
          notes: "Fragile items included",
          trackingNumber: "TRK-ABCD-1234",
        },
        {
          id: 2,
          serviceType: "Waste",
          status: "Pending",
          date: "2024-07-12 09:00",
          user: "Jane Smith",
          address: "456 Oak Ave, Town",
          phone: "+1-555-0456",
          assignedWorker: null,
          price: 80,
          notes: "Large furniture disposal",
          trackingNumber: "TRK-EFGH-5678",
        },
        {
          id: 3,
          serviceType: "Logistics",
          status: "Completed",
          date: "2024-07-05 15:30",
          user: "Alex Lee",
          address: "789 Pine Rd, Village",
          phone: "+1-555-0789",
          assignedWorker: "Sarah Wilson",
          price: 200,
          notes: "Express delivery requested",
          trackingNumber: "TRK-IJKL-9012",
        },
        {
          id: 4,
          serviceType: "Moving",
          status: "Cancelled",
          date: "2024-07-15 14:00",
          user: "Maria Garcia",
          address: "321 Elm St, Borough",
          phone: "+1-555-0321",
          assignedWorker: null,
          price: 180,
          notes: "Customer cancelled",
          trackingNumber: "TRK-MNOP-3456",
        },
        {
          id: 5,
          serviceType: "Waste",
          status: "In Progress",
          date: "2024-07-11 11:30",
          user: "David Brown",
          address: "654 Maple Dr, County",
          phone: "+1-555-0654",
          assignedWorker: "Tom Davis",
          price: 95,
          notes: "Construction waste",
          trackingNumber: "TRK-QRST-7890",
        },
        {
          id: 6,
          serviceType: "Logistics",
          status: "Pending",
          date: "2024-07-13 16:00",
          user: "Lisa Chen",
          address: "987 Cedar Ln, District",
          phone: "+1-555-0987",
          assignedWorker: null,
          price: 250,
          notes: "International shipping",
          trackingNumber: "TRK-UVWX-2345",
        },
      ];
      // If userId is provided, filter for that user only
      if (userId) {
        resolve(allBookings.filter((booking) => booking.user === userId));
      } else {
        resolve(allBookings);
      }
    }, 700);
  });
};

// Admin API functions
export const mockUpdateBookingStatus = async (
  bookingId: number,
  status: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookingId, status });
    }, 500);
  });
};

export const mockAssignWorker = async (
  bookingId: number,
  workerName: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookingId, assignedWorker: workerName });
    }, 500);
  });
};

export const mockGetBookingStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 6,
        pending: 2,
        inProgress: 2,
        completed: 1,
        cancelled: 1,
        revenue: 955,
        thisMonth: 4,
        lastMonth: 2,
      });
    }, 300);
  });
};

export const mockGetWorkers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Mike Johnson", specialty: "Moving", available: true },
        {
          id: 2,
          name: "Sarah Wilson",
          specialty: "Logistics",
          available: true,
        },
        { id: 3, name: "Tom Davis", specialty: "Waste", available: false },
        { id: 4, name: "Emma Rodriguez", specialty: "Moving", available: true },
        { id: 5, name: "James Kim", specialty: "Logistics", available: true },
      ]);
    }, 200);
  });
};

export default api;
