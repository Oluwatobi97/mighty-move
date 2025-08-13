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
    background: "#121212", // deep charcoal
    card: "#1e1e1e", // slightly lighter for contrast
    text: "#eaeaea", // off-white for readability
    secondaryText: "#b3b3b3", // for descriptions/subheadings
    accent: "#ffd369", // warm accent color
    button: "#121212", // dark text on light button
    nav: "#1c1c1c", // nav bar background
    shadow: "0px 4px 12px rgba(0, 0, 0, 0.5)", // card shadows
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
