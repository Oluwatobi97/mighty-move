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

    root.style.setProperty("--bg-color", theme.colors.background);
    root.style.setProperty("--text-primary", theme.colors.text);
    root.style.setProperty("--card-bg", theme.colors.card);
    root.style.setProperty("--text-secondary", theme.colors.secondaryText);
    root.style.setProperty("--highlight-color", theme.colors.accent);
    root.style.setProperty("--btn-text", theme.colors.button);
    root.style.setProperty("--nav-bg", theme.colors.nav);
    root.style.setProperty("--shadow", theme.colors.shadow);
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
