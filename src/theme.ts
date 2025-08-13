export const lightTheme = {
  colors: {
    background: "#ffffff",
    card: "#fdfdfd",
    text: "#000000",
    secondaryText: "#555555",
    accent: "#ffd369",
    button: "#000000",
    nav: "#fff8dc",
    shadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  colors: {
    background: "#0b0e11", // deep dark background
    card: "#161a1e", // slightly lighter for contrast
    text: "#eaecef", // main white text
    secondaryText: "#8b949e", // muted grey for secondary text
    accent: "#f0b90b", // Binance gold/yellow
    button: "#0b0e11", // dark button text for contrast
    nav: "#0d1117", // navbar background
    shadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
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
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
};

export type ThemeType = typeof lightTheme;
