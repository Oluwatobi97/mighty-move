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
    background: "#0f172a", // deep blue-grey background
    card: "#1e293b", // slate card background
    text: "#f1f5f9", // light text
    secondaryText: "#94a3b8", // muted blue-grey text
    accent: "#f59e0b", // amber gold (consistent with light theme's gold)
    button: "#0f172a", // dark text for contrast on gold buttons
    nav: "#1e293b", // navbar background matching cards
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
