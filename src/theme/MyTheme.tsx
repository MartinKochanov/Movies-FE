import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#ff5722", // Orange
    },
    secondary: {
      main: "#4caf50", // Green
    },

    background: {
      default: "#1c1c1c", // Dark gray background
      paper: "#212121", // Slightly lighter gray for cards or surfaces
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0b0b0", // Light gray text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
  spacing: 8,
});

export default myTheme;
