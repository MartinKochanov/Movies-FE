import { AccessTime, Business, CalendarToday, MenuBook, MovieFilter } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, CardContent, CardMedia, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import { useState } from "react";

import { useMovieQuery } from "../../hooks/movies/useMovieQuery";
import Spinner from "../shared/components/Spinner";
import TrailerModal from "../shared/components/TrailerModal";

// Styled Components
const DetailsContainer = styled(Paper)(({ theme }) => ({
  margin: `${theme.spacing(10)} auto`,
  maxWidth: 1200,
  padding: theme.spacing(4),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[4],
}));

const PosterBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  cursor: "pointer",
}));

const Poster = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: theme.spacing(2),
  objectFit: "cover",
  aspectRatio: "16/9",
  boxShadow: theme.shadows[3],
  transition: "box-shadow 0.2s",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 300,
    marginBottom: theme.spacing(2),
  },
}));

const MoviePoster = Poster as typeof CardMedia;

const Overlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.2s",
  zIndex: 2,
}));

const OverlayVisible = styled(Overlay)({
  opacity: 1,
  pointerEvents: "auto",
});

const PlayButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.primary.main,
  borderRadius: "50%",
  width: 64,
  height: 64,
  color: theme.palette.common.white,
  boxShadow: theme.shadows[4],
  cursor: "pointer",
  transition: "background 0.2s",
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

const GenreChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  letterSpacing: 1,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontWeight: "bold",
  color: theme.palette.primary.main,
  letterSpacing: 1,
}));

const BoldTitle = styled(Typography)(() => ({
  fontWeight: 700,
  width: "100%",
  textAlign: "center",
}));

const BodyText = styled(Typography)(() => ({
  marginBottom: 8,
  display: "flex",
  alignItems: "center",
  gap: 6,
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

const DurationIcon = styled(AccessTime)(({ theme }) => ({
  fontSize: 20,
  marginRight: 4,
  verticalAlign: "middle",
  color: theme.palette.primary.main,
}));

const YearIcon = styled(CalendarToday)(({ theme }) => ({
  fontSize: 20,
  marginRight: 4,
  color: theme.palette.primary.main,
}));

const PlotIcon = styled(MovieFilter)(({ theme }) => ({
  fontSize: 20,
  marginRight: 4,
  verticalAlign: "middle",
  color: theme.palette.primary.main,
}));

const FilmStudioIcon = styled(Business)(({ theme }) => ({
  fontSize: 20,
  marginRight: 4,
  verticalAlign: "middle",
  color: theme.palette.primary.main,
}));

const BasedOnIcon = styled(MenuBook)(({ theme }) => ({
  fontSize: 20,
  marginRight: 4,
  verticalAlign: "middle",
  color: theme.palette.primary.main,
}));
const MemberList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const MemberCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 360,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: theme.palette.action.hover,
  boxShadow: theme.shadows[1],
}));

const MemberImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 320,
  borderRadius: "50%",
  objectFit: "cover",
  aspectRatio: "16/9",
  background: theme.palette.primary.light,
  marginBottom: theme.spacing(1),
  border: `2px solid ${theme.palette.primary.light}`,
}));

const MemberName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  marginTop: theme.spacing(1),
  fontSize: 16,
}));

const MemberRole = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: 14,
}));

export default function MoviesDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovieQuery(id!);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) return <Spinner />;
  if (isError || !movie) return <Typography color="error">Movie not found.</Typography>;

  const handlePosterClick = () => {
    if (movie.trailerUrl) setOpenTrailer(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePosterClick();
  };

  return (
    <DetailsContainer elevation={3}>
      <Grid container spacing={4}>
        <BoldTitle variant="h3" gutterBottom>
          {movie.title}
        </BoldTitle>
        <Grid>
          <PosterBox
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePosterClick}
          >
            <MoviePoster component="img" image={movie.imageUrl} alt={movie.title} />
            {movie.trailerUrl &&
              (isHovered ? (
                <OverlayVisible onClick={handleOverlayClick}>
                  <PlayButton>
                    <PlayArrowIcon fontSize="large" />
                  </PlayButton>
                </OverlayVisible>
              ) : (
                <Overlay />
              ))}
          </PosterBox>
        </Grid>
        <Grid>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {movie.tagline}
            </Typography>
            <Box mb={2}>
              {(movie.genres ?? []).map((genre) => (
                <GenreChip key={genre} label={genre} color="primary" />
              ))}
            </Box>
            <BodyText variant="body1">
              <DurationIcon fontSize="small" />
              <b>Duration:</b> {movie.duration} min
            </BodyText>
            <BodyText variant="body1">
              <YearIcon fontSize="small" />
              <b>Release Year:</b> {movie.releaseYear}
            </BodyText>
            <BodyText variant="body1">
              <PlotIcon fontSize="small" />
              <b>Plot:</b> {movie.plot}
            </BodyText>
            <BodyText variant="body1">
              <FilmStudioIcon fontSize="small" />
              <b>Film Studio:</b> {movie.filmStudio}
            </BodyText>
            {movie.basedOn && (
              <BodyText variant="body1">
                <BasedOnIcon fontSize="small" />
                <b>Based On:</b> {movie.basedOn}
              </BodyText>
            )}
            <DividerStyled />
            <SectionTitle variant="h6">Cast</SectionTitle>
            <MemberList>
              {(movie.cast ?? []).map((member) => (
                <MemberCard key={member.id}>
                  <MemberImage src={member.imageUrl} alt={`${member.firstName} ${member.lastName}`} />
                  <MemberName>
                    {member.firstName} {member.lastName}
                  </MemberName>
                  {member.role?.name && <MemberRole>as {member.role.name}</MemberRole>}
                </MemberCard>
              ))}
            </MemberList>
            <SectionTitle variant="h6">Directed By</SectionTitle>
            <MemberList>
              {(movie.directedBy ?? []).map((member) => (
                <MemberCard key={member.id}>
                  <MemberImage src={member.imageUrl} alt={`${member.firstName} ${member.lastName}`} />
                  <MemberName>
                    {member.firstName} {member.lastName}
                  </MemberName>
                </MemberCard>
              ))}
            </MemberList>
            <SectionTitle variant="h6">Producers</SectionTitle>
            <MemberList>
              {(movie.producers ?? []).map((member) => (
                <MemberCard key={member.id}>
                  <MemberImage src={member.imageUrl} alt={`${member.firstName} ${member.lastName}`} />
                  <MemberName>
                    {member.firstName} {member.lastName}
                  </MemberName>
                </MemberCard>
              ))}
            </MemberList>
            <SectionTitle variant="h6">Writers</SectionTitle>
            <MemberList>
              {(movie.writers ?? []).map((member) => (
                <MemberCard key={member.id}>
                  <MemberImage src={member.imageUrl} alt={`${member.firstName} ${member.lastName}`} />
                  <MemberName>
                    {member.firstName} {member.lastName}
                  </MemberName>
                </MemberCard>
              ))}
            </MemberList>
          </CardContent>
        </Grid>
      </Grid>
      <TrailerModal open={openTrailer} onClose={() => setOpenTrailer(false)} trailerUrl={movie.trailerUrl} />
    </DetailsContainer>
  );
}
