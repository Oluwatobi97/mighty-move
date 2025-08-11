import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoveBooking from "./pages/MoveBooking";
import WasteBooking from "./pages/WasteBooking";
import LogisticsBooking from "./components/BookingForm/LogisticsBooking";
import TrackBooking from "./pages/TrackBooking";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Marketing from "./pages/Marketing";
import ProtectedRoute from "./routes/ProtectedRoute";
import About from "./pages/About";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Marketing />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/move" element={<MoveBooking />} />
          <Route path="/waste" element={<WasteBooking />} />
          <Route path="/logistics" element={<LogisticsBooking />} />
          <Route path="/track" element={<TrackBooking />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  </ThemeProvider>
);

export default App;
