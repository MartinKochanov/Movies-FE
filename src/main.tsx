import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";

import { StrictMode } from "react";

import App from "./App";
import myTheme from "./theme/MyTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
