import { Box, Button, Typography, styled } from "@mui/material";
import { SwiperSlide } from "swiper/react";

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
  background: "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
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

const WatchButton = styled(Button)(() => ({
  borderRadius: "30px",
  fontWeight: "bold",
  textTransform: "uppercase",
  padding: "12px 32px",
  boxShadow: "0 5px 15px rgba(239,108,0,0.5)",
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

export default function MovieSlide({
  movie,
}: {
  movie: { title: string; description: string; genre: string; image: string; rating: number };
}) {
  return (
    <SwiperSlide key={movie.title}>
      <BackgroundImage image={movie.image} />
      <Overlay />
      <SlideContent>
        <MovieTitle variant="h2">{movie.title}</MovieTitle>
        <MovieDescription variant="subtitle1">{movie.description}</MovieDescription>
        <MovieDetails variant="body1">
          {movie.genre} • Rating: ⭐ {movie.rating}
        </MovieDetails>
        <ButtonGroup>
          <WatchButton variant="contained" color="primary" size="large">
            ▶ Watch Now
          </WatchButton>
          <InfoButton variant="outlined" color="inherit">
            ⓘ More Info
          </InfoButton>
        </ButtonGroup>
      </SlideContent>
    </SwiperSlide>
  );
}
