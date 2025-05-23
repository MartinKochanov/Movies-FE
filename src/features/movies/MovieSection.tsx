import { Box, Button, Typography } from "@mui/material";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import MovieCard from "../shared/components/Card";
import { ButtonContainer, CardGrid, CenteredText } from "../shared/components/Styled";

export default function MovieSection() {
  const { data: movies } = useMoviesQuery(0, 10, {
    sortField: "title",
    sortOrder: "asc",
    isSeries: false,
  });

  return (
    <Box>
      <CenteredText>
        <Typography variant="h3">Movies</Typography>
      </CenteredText>
      <CardGrid container>{movies?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</CardGrid>
      <ButtonContainer>
        <Button variant="outlined" color="primary" size="large">
          View More
        </Button>
      </ButtonContainer>
    </Box>
  );
}
