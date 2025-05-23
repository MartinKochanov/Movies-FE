import { FiberManualRecord } from "@mui/icons-material";
import { Box, Button, Typography, alpha, styled } from "@mui/material";

import { useState } from "react";

import type { Movie } from "../../types/Movie";
import { SeriesChip } from "../shared/components/Styled";
import TrailerModal from "../shared/components/TrailerModal";

type MovieSlideProps = {
  movie: Movie;
  onTrailerPlay?: (isPlaying: boolean) => void;
};

const BackgroundImage = styled(Box)<{ image: string }>(({ image }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${image})`,
  backgroundPosition: "top",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -1,
}));

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.65)",
  zIndex: 1,
  pointerEvents: "none",
});

const SlideContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "left",
  color: "#fff",
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(8),
  },
}));

const MovieTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: theme.spacing(2),
  letterSpacing: 2,
  fontSize: "2.2rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
}));

const MovieDescription = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "0.9rem",
  backgroundColor: "rgba(255,255,255,0.1)",
  padding: theme.spacing(1, 2),
  borderRadius: "999px",
  display: "inline-block",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

const MovieDetails = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
}));

const ButtonGroup = styled(Box)({
  display: "flex",
  gap: 16,
});

const WatchButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "12px 32px",
  boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.5)}`,
}));

const InfoButton = styled(Button)({
  borderRadius: "30px",
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "12px 32px",
  borderColor: "rgba(255,255,255,0.5)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});

const GenreContainer = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  marginRight: "8px",
});

const GenreDot = styled(FiberManualRecord)({
  fontSize: "0.8rem",
  margin: "0 8px",
  color: "white",
});

export default function MovieSlide({ movie, onTrailerPlay }: MovieSlideProps) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  return (
    <>
      <BackgroundImage image={movie.imageUrl} />
      <Overlay />
      <SlideContent>
        {movie.series && <SeriesChip label="Series" />}
        <MovieTitle variant="h2">{movie.title}</MovieTitle>
        <MovieDescription variant="subtitle1">{movie.tagline}</MovieDescription>
        <MovieDetails variant="body1">
          {movie.genres.map((g, index) => (
            <GenreContainer key={index}>
              {index < movie.genres.length && <GenreDot />}
              {g.replace(/_/g, "-")}
            </GenreContainer>
          ))}
        </MovieDetails>
        <ButtonGroup>
          <WatchButton variant="contained" color="primary" size="large" onClick={toggleModal}>
            ▶ Watch Trailer
          </WatchButton>
          <InfoButton variant="outlined" color="inherit">
            ⓘ More Info
          </InfoButton>
        </ButtonGroup>
      </SlideContent>

      <TrailerModal
        open={open}
        onClose={toggleModal}
        trailerUrl={movie.trailerUrl}
        onPlay={(isPlaying) => onTrailerPlay?.(isPlaying)}
      />
    </>
  );
}
