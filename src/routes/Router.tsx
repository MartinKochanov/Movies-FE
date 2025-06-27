import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/movies/HomePage";
import MoviesDetails from "../features/movies/MoviesDetails";
import MoviesPage from "../features/movies/MoviesPage";
import SeriesPage from "../features/series/SeriesPage";
import LoginPage from "../features/users/login/LoginPage";
import RegisterPage from "../features/users/register/RegisterPage";
import BaseLayout from "../layouts/BaseLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/sign-in",
            element: <LoginPage />,
          },
          {
            path: "/sign-up",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/movies/:id",
            element: <MoviesDetails />,
          },
        ],
      },
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
    ],
  },
]);
