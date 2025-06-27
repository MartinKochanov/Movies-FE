import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../types/Shared";

const ToastNotification = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === Theme.DARK ? "dark" : "light"}
    />
  );
};

export default ToastNotification;
