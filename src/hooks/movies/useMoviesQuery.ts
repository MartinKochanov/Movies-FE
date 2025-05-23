import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../../services/movies/movieService";
import type { Movie } from "../../types/Movie";
import type { Page } from "../../types/Shared";

type MoviesQueryOptions = {
  sortField?: string;
  sortOrder?: "asc" | "desc";
  isSeries?: boolean;
};

export const useMoviesQuery = (page: number, size: number, options?: MoviesQueryOptions) => {
  const { sortField, sortOrder, isSeries: isSeries } = options || {};

  return useQuery<Page<Movie>>({
    queryKey: ["movies", page, size, sortField, sortOrder, isSeries],
    queryFn: () => getMovies(page, size, sortField, sortOrder, isSeries),
    placeholderData: (prevDate) => prevDate,
  });
};
