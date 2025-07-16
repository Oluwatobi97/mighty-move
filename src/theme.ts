export const theme = {
  colors: {
    background: "#FFFFFF",
    accent: "#FFF9C4", // light yellow
    text: "#111111", // black
    card: "#FFFDE7", // slightly off-white for cards
    shadow: "rgba(0,0,0,0.10)",
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

export type ThemeType = typeof theme;
