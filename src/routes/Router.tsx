import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/movies/HomePage";
import MoviesPage from "../features/movies/MoviesPage";
import SeriesPage from "../features/series/SeriesPage";
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
    ],
  },
]);
