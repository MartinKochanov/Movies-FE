import { useQuery } from "@tanstack/react-query";

import { getMovieById } from "../../services/movies/movieService";

export const useMovieQuery = (id: string) => {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieById(id),
    placeholderData: (prevData) => prevData,
  });
};
