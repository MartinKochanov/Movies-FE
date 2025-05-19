import { Box, Grid, styled } from "@mui/material";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import MovieCard from "./MovieCard";

const MovieGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export default function MovieSection() {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMoviesQuery(0, 10, {
    sortField: "releaseYear",
    sortOrder: "desc",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load movies</div>;
  }

  return (
    <Box>
      <MovieGrid container>{movies?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</MovieGrid>
    </Box>
  );
}
