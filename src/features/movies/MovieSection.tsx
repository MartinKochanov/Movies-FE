import { Box, Grid, Pagination, styled } from "@mui/material";

import { useState } from "react";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import MovieCard from "./MovieCard";

const MovieGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
}));

export default function MovieSection() {
  const [page, setPage] = useState(1);
  const { data: movies } = useMoviesQuery(page - 1, 10, {
    sortField: "title",
    sortOrder: "asc",
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <MovieGrid container>{movies?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</MovieGrid>
      <PaginationContainer>
        <Pagination count={movies?.totalPages || 0} page={page} onChange={handlePageChange} color="primary" />
      </PaginationContainer>
    </Box>
  );
}
