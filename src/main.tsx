import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";

import App from "./App";
import ToastNotification from "./features/shared/toast/ToastNotification";
import { queryClient } from "./services/config/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    <ToastNotification />
  </QueryClientProvider>
);
