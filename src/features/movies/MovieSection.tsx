import { Box, Button, Grid, Typography, styled } from "@mui/material";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import MovieCard from "./MovieCard";

const MovieGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
}));

const CenteredText = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: theme.spacing(4),
}));

export default function MovieSection() {
  const { data: movies } = useMoviesQuery(0, 10, {
    sortField: "title",
    sortOrder: "asc",
  });

  return (
    <Box>
      <CenteredText>
        <Typography variant="h3">Movies</Typography>
      </CenteredText>
      <MovieGrid container>
        {movies?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        <ButtonContainer>
          <Button variant="outlined" color="primary" size="large">
            View More
          </Button>
        </ButtonContainer>
      </MovieGrid>
    </Box>
  );
}
