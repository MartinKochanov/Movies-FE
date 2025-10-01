import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/movies/HomePage";
import MoviesDetails from "../features/movies/MoviesDetails";
import MoviesPage from "../features/movies/MoviesPage";
import MoviesTable from "../features/movies/MoviesTable";
import SeriesPage from "../features/series/SeriesPage";
import { Dashboard } from "../features/users/admin/Dashboard";
import LoginPage from "../features/users/login/LoginPage";
import RegisterPage from "../features/users/register/RegisterPage";
import AdminLayout from "../layouts/AdminLayout";
import BaseLayout from "../layouts/BaseLayout";
import AdminRoute from "./guards/AdminRoute";
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
  {
    element: <AdminLayout />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/movies",
            element: <MoviesTable />,
          },
        ],
      },
    ],
  },
]);
