export const lightTheme = {
  colors: {
    background: "#FFFFFF",
    accent: "#FFF9C4", // light yellow
    text: "#111111", // black
    card: "#FFFDE7", // slightly off-white for cards
    shadow: "rgba(0,0,0,0.10)",
    primary: "#111111",
    secondary: "#444444",
    border: "#e0e0e0",
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
  },
  font: {
    family: "Poppins, Inter, Roboto, Arial, sans-serif",
    size: "16px",
    weight: {
      normal: 400,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
  borderRadius: "18px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
};

export const darkTheme = {
  colors: {
    background: "#1a1a1a", // Darker background
    accent: "#FDD835", // Vibrant yellow for better contrast
    text: "#ffffff", // Pure white text
    card: "#2d2d2d", // Darker card background
    shadow: "rgba(0,0,0,0.40)",
    primary: "#ffffff",
    secondary: "#bbbbbb",
    border: "#444444",
    success: "#66bb6a",
    error: "#ef5350",
    warning: "#ffa726",
    info: "#42a5f5",
  },
  font: {
    family: "Poppins, Inter, Roboto, Arial, sans-serif",
    size: "16px",
    weight: {
      normal: 400,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
  borderRadius: "18px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.40)",
};

export type ThemeType = typeof lightTheme;
