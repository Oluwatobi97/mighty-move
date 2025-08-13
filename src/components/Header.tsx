import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const HeaderBar = styled(motion.header)`
  background: var(--nav-bg);
  box-shadow: var(--shadow);
  padding: 0.7rem 1.5rem 0.7rem 1.5rem;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 64px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImg = styled.img`
  height: 40px;
  width: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    height: 28px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1rem;
  padding: 0.35em 1em;
  border-radius: 12px;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    color: var(--highlight-color);
    transform: translateY(-2px) scale(1.05);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-left: 1rem;
    width: 36px;
    height: 36px;
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
`;

const Bar = styled.div`
  width: 22px;
  height: 2.5px;
  background: var(--text-primary);
  margin: 2px 0;
  border-radius: 2px;
`;

const SidebarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.18);
  z-index: 1001;
`;

const Sidebar = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  width: 80vw;
  max-width: 320px;
  height: 100vh;
  background: var(--nav-bg);
  box-shadow: -8px 0 32px 0 rgba(31, 38, 135, 0.13);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  @media (min-width: 901px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--text-primary);
  align-self: flex-end;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarNavLink = styled(Link)`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.7em 1.2em;
  border-radius: 12px;
  transition: background 0.2s, transform 0.2s;
  text-decoration: none;

  &:hover {
    color: var(--highlight-color);
    transform: scale(1.04);
  }
`;

const ThemeToggle = styled.button`
  background: var(--highlight-color);
  color: var(--btn-text);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1rem;

  &:hover {
    background: #e6bd50;
  }
`;

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Navigation links for authenticated users
  const navLinks = [
    { to: "/home", label: "Home" },
    // { to: "/move", label: "Book a Move" },
    // { to: "/waste", label: "Waste Pickup" },
    // { to: "/logistics", label: "Send Package" },
    { to: "/track", label: "Track" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/admin", label: "Admin" },
    { to: "/about", label: "About" },
    { to: "/terms", label: "Terms" },
  ];

  // Public links (before login)
  const publicLinks = [
    { to: "/about", label: "About" },
    { to: "/login", label: "Sign In", button: true },
    { to: "/register", label: "Register", button: true },
  ];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (auth?.setUser) auth.setUser(null);
    navigate("/"); // Redirect to marketing page
  };

  return (
    <HeaderBar
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
    >
      <LogoLink to="/">
        <LogoImg src="/logo.png" alt="Mighty Moves Logo" />
      </LogoLink>
      <Nav>
        {auth?.user
          ? navLinks
              .filter(
                (link) => link.label !== "Sign In" && link.label !== "Register"
              )
              .map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))
          : publicLinks.map((link) =>
              link.button ? (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={{
                    background: "var(--highlight-color)",
                    color: "var(--btn-text)",
                    fontWeight: 700,
                    marginLeft: "0.5rem",
                    borderRadius: "18px",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
                    padding: "0.7em 2em",
                    border: "2px solid var(--card-bg)",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                >
                  {link.label}
                </NavLink>
              ) : (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              )
            )}
        {auth?.user && (
          <NavLink
            as="button"
            to="#"
            onClick={handleLogout}
            style={{
              background: "var(--card-bg)",
              color: "#d32f2f",
              fontWeight: 700,
              marginLeft: "1rem",
              borderRadius: "18px",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
              padding: "0.7em 2em",
              border: "2px solid var(--card-bg)",
              cursor: "pointer",
            }}
          >
            Log Out
          </NavLink>
        )}
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? "☀️" : "🌙"}
        </ThemeToggle>
      </Nav>
      <MenuButton aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
        <Hamburger>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
      </MenuButton>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <SidebarOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
              <CloseButton
                aria-label="Close menu"
                onClick={() => setSidebarOpen(false)}
              >
                &times;
              </CloseButton>
              <SidebarNav>
                {auth?.user
                  ? navLinks
                      .filter(
                        (link) =>
                          link.label !== "Sign In" && link.label !== "Register"
                      )
                      .map((link) => (
                        <SidebarNavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {link.label}
                        </SidebarNavLink>
                      ))
                  : publicLinks.map((link) =>
                      link.button ? (
                        <SidebarNavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setSidebarOpen(false)}
                          style={{
                            background: "var(--highlight-color)",
                            color: "var(--btn-text)",
                            fontWeight: 700,
                            marginLeft: "0.5rem",
                            borderRadius: "18px",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
                            padding: "0.7em 2em",
                            border: "2px solid var(--card-bg)",
                            transition: "background 0.2s, transform 0.2s",
                          }}
                        >
                          {link.label}
                        </SidebarNavLink>
                      ) : (
                        <SidebarNavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {link.label}
                        </SidebarNavLink>
                      )
                    )}
                {auth?.user && (
                  <SidebarNavLink
                    as="button"
                    to="#"
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                    style={{
                      background: "var(--card-bg)",
                      color: "#d32f2f",
                      fontWeight: 700,
                      marginLeft: "1rem",
                      borderRadius: "18px",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
                      padding: "0.7em 2em",
                      border: "2px solid var(--card-bg)",
                      cursor: "pointer",
                    }}
                  >
                    Log Out
                  </SidebarNavLink>
                )}
                <SidebarNavLink
                  as="button"
                  to="#"
                  onClick={() => {
                    toggleTheme();
                    setSidebarOpen(false);
                  }}
                  style={{
                    background: "var(--highlight-color)",
                    color: "var(--btn-text)",
                    fontWeight: 700,
                    marginLeft: "1rem",
                    borderRadius: "18px",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
                    padding: "0.7em 2em",
                    border: "2px solid var(--card-bg)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </SidebarNavLink>
              </SidebarNav>
            </Sidebar>
          </>
        )}
      </AnimatePresence>
    </HeaderBar>
  );
};

export default Header;
