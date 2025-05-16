import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../../services/movies/movieService";
import type { Movie } from "../../types/Movie";
import type { Page } from "../../types/Shared";

type MoviesQueryOptions = {
  sortField?: string;
  sortOrder?: "asc" | "desc";
};

export const useMoviesQuery = (page: number, size: number, options?: MoviesQueryOptions) => {
  const { sortField, sortOrder } = options || {};

  return useQuery<Page<Movie>>({
    queryKey: ["movies", page, size, sortField, sortOrder],
    queryFn: () => getMovies(page, size, sortField, sortOrder),
    placeholderData: (prevDate) => prevDate,
  });
};
