import { Box, Card, CardContent, CardMedia, Typography, styled } from "@mui/material";

import type { Movie } from "../../types/Movie";

type MovieCardProps = {
  movie: Movie;
};

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  maxWidth: 345,
  margin: theme.spacing(2),
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  transform: "scale(1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.06)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  aspectRatio: "16/9",
});

const ImageCardMedia = StyledCardMedia as typeof CardMedia;

const GenreContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "8px",
});

const GenreChip = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "4px 8px",
  borderRadius: "16px",
  fontSize: "0.75rem",
}));

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <StyledCard>
      <ImageCardMedia component="img" image={movie.imageUrl} alt={movie.title} />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.tagline}
        </Typography>
        <GenreContainer>
          {movie.genres.map((genre, index) => (
            <GenreChip key={index}>{genre.replace(/_/g, "-")}</GenreChip>
          ))}
        </GenreContainer>
      </CardContent>
    </StyledCard>
  );
}
