import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import { appRouter } from "./routes/Router";
import myTheme from "./theme/MyTheme";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}

export default App;
