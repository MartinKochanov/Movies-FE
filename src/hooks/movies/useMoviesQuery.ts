import { useQuery } from "@tanstack/react-query";

import { getMovies } from "../../services/movies/movieService";
import type { Movie } from "../../types/Movie";
import type { Page } from "../../types/Shared";

type MoviesQueryOptions = {
  sortField?: string;
  sortOrder?: "asc" | "desc";
  isSeries?: boolean;
  genres?: string[];
  releaseYear?: number;
};

export const useMoviesQuery = (page: number, size: number, options?: MoviesQueryOptions) => {
  const { sortField, sortOrder, isSeries: isSeries, genres, releaseYear } = options || {};

  return useQuery<Page<Movie>>({
    queryKey: ["movies", page, size, sortField, sortOrder, isSeries, genres, releaseYear],
    queryFn: () => getMovies(page, size, sortField, sortOrder, isSeries, genres, releaseYear),
    placeholderData: (prevDate) => prevDate,
  });
};
