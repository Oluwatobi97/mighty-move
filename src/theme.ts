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
    card: "#f0b90b", // yellow card background for dark mode
    text: "#000000", // black text for better contrast on yellow
    secondaryText: "#333333", // darker grey for secondary text
    accent: "#f0b90b", // Binance gold/yellow
    button: "#000000", // dark button text for contrast
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
