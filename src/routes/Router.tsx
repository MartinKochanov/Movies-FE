import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/movies/HomePage";
import MoviesPage from "../features/movies/MoviesPage";
import SeriesPage from "../features/series/SeriesPage";
import LoginPage from "../features/users/login/LoginPage";
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
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/series",
        element: <SeriesPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
