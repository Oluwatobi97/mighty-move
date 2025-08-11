import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { lightTheme, darkTheme, ThemeType } from "../theme";

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or OS preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Add or remove dark-mode class from body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Update CSS variables for theme
    const root = document.documentElement;
    const theme = isDarkMode ? darkTheme : lightTheme;

    root.style.setProperty("--background-color", theme.colors.background);
    root.style.setProperty("--text-color", theme.colors.text);
    root.style.setProperty("--card-background", theme.colors.card);
    root.style.setProperty("--accent-color", theme.colors.accent);
    root.style.setProperty("--border-color", theme.colors.border);
    root.style.setProperty("--shadow-color", theme.colors.shadow);
    root.style.setProperty("--primary-color", theme.colors.primary);
    root.style.setProperty("--secondary-color", theme.colors.secondary);
    root.style.setProperty("--success-color", theme.colors.success);
    root.style.setProperty("--error-color", theme.colors.error);
    root.style.setProperty("--warning-color", theme.colors.warning);
    root.style.setProperty("--info-color", theme.colors.info);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
