import { RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { CustomThemeProvider } from "./context/ThemeContext";
import ToastNotification from "./features/shared/toast/ToastNotification";
import { appRouter } from "./routes/Router";

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <ToastNotification />
        <RouterProvider router={appRouter} />;
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
