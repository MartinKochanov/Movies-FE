import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/movies/HomePage";
import BaseLayout from "../layouts/BaseLayout";

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
    ],
  },
]);
