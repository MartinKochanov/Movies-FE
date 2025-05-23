import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography, styled } from "@mui/material";

import { useState } from "react";

import type { Movie } from "../../../types/Movie";
import { SeriesChip } from "./Styled";
import TrailerModal from "./TrailerModal";

// Import the TrailerModal component

type MovieCardProps = {
  movie: Movie;
};

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  maxWidth: 320,
  margin: theme.spacing(1.5),
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  transform: "scale(1)",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  position: "relative", // Required for positioning the play button
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

const PlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  zIndex: 10,
  transition: "opacity 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const GenreContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  margin: theme.spacing(2),
  justifyContent: "flex-start",
  alignItems: "flex-end",
}));

const GenreChip = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "4px 8px",
  borderRadius: "16px",
  fontSize: "0.75rem",
}));

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const toggleModal = () => setIsTrailerOpen(!isTrailerOpen);

  return (
    <>
      <StyledCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Box position="relative">
          <ImageCardMedia component="img" image={movie.imageUrl} alt={movie.title} />
          {isHovered && (
            <PlayButton onClick={toggleModal} aria-label="Play trailer">
              <PlayArrowIcon fontSize="large" />
            </PlayButton>
          )}
        </Box>
        <CardContent>
          {movie.series && <SeriesChip label="Series" />}
          <Typography variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.tagline}
          </Typography>
        </CardContent>
        <GenreContainer>
          {movie.genres.slice(0, 3).map((genre, index) => (
            <GenreChip key={index}>{genre.replace(/_/g, "-")}</GenreChip>
          ))}
          {movie.genres.length > 3 && (
            <Tooltip
              title={movie.genres
                .slice(3)
                .map((genre) => genre.replace(/_/g, "-"))
                .join(", ")}
            >
              <GenreChip>+{movie.genres.length - 3}</GenreChip>
            </Tooltip>
          )}
        </GenreContainer>
      </StyledCard>

      {/* Trailer Modal */}
      <TrailerModal open={isTrailerOpen} onClose={toggleModal} trailerUrl={movie.trailerUrl} />
    </>
  );
}
