import { RouterProvider } from "react-router-dom";

import "./App.css";
import { CustomThemeProvider } from "./context/ThemeContext";
import { appRouter } from "./routes/Router";

function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={appRouter} />;
    </CustomThemeProvider>
  );
}

export default App;
