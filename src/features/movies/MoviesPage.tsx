import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Chip,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useState } from "react";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import usePaginatedQuery from "../../hooks/shared/usePagenatedQuery";
import { Genre } from "../../types/Movie";
import MovieCard from "../shared/components/Card";
import Spinner from "../shared/components/Spinner";
import { CardGrid, CenteredText } from "../shared/components/Styled";

// Styled Components
const MoviesFlex = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const Sidebar = styled("aside")(({ theme }) => ({
  width: 260,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  minHeight: "80vh",
  position: "fixed",
  left: 0,
  top: 130,
  bottom: 0,
  zIndex: 1100,
  boxShadow: theme.shadows[3],
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    position: "static",
    width: "100%",
    minHeight: "unset",
    borderRadius: theme.spacing(1),
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "none",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

const GenreListContainer = styled("div")(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    overflowY: "visible",
    flex: "unset",
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
}));

const GenreList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    padding: 0,
  },
}));

const GenreListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[400],
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: 0,
    marginRight: theme.spacing(1),
    minWidth: 80,
    padding: theme.spacing(0.5, 1),
  },
}));

const ChipsContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
    marginLeft: theme.spacing(2),
  },
}));

const MainContent = styled("main")(({ theme }) => ({
  flex: 1,
  marginLeft: 280,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const MobileFilterButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: 80,
  left: 16,
  zIndex: 1200,
  background: "#fff",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DrawerPaper = styled("div")(({ theme }) => ({
  width: 260,
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}));

const DrawerClearButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: 16,
  [theme.breakpoints.down("md")]: {
    width: "auto",
    marginTop: 0,
    marginLeft: 8,
  },
}));

export default function MoviesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: movies,
    isLoading,
    page,
    handlePageChange,
    handleGenreFilter,
    clearFilters,
    options,
  } = usePaginatedQuery(useMoviesQuery, 0, 20, {
    sortField: "title",
    sortOrder: "asc",
    isSeries: false,
    genres: [],
  });

  const handleGenreClick = (genre: string) => {
    handleGenreFilter(genre);
  };

  const handleClear = () => {
    clearFilters();
  };

  // Sidebar content as a component for reuse
  const sidebarContent = (
    <>
      <GenreListContainer>
        <GenreList>
          {Object.keys(Genre).map((genreKey) => (
            <GenreListItemButton
              key={genreKey}
              onClick={() => handleGenreClick(genreKey)}
              selected={options.genres?.includes(genreKey)}
            >
              <ListItemText primary={Genre[genreKey as keyof typeof Genre].replace(/_/g, " ")} />
            </GenreListItemButton>
          ))}
        </GenreList>
      </GenreListContainer>
      <DrawerClearButton variant="outlined" color="primary" onClick={handleClear}>
        Clear
      </DrawerClearButton>
      <ChipsContainer>
        {options.genres && options.genres.map((g) => <Chip key={g} label={g} color="primary" />)}
      </ChipsContainer>
    </>
  );

  return (
    <MoviesFlex>
      {/* Filter toggle icon for mobile */}
      {isMobile && (
        <MobileFilterButton color="primary" onClick={() => setSidebarOpen(true)}>
          <FilterListIcon />
        </MobileFilterButton>
      )}

      {/* Sidebar: Drawer on mobile, fixed on desktop */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{
            component: DrawerPaper,
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Sidebar>{sidebarContent}</Sidebar>
      )}

      {/* Movies Section */}
      <MainContent>
        <CenteredText>
          <Typography variant="h3">Movies</Typography>
        </CenteredText>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CardGrid container>{movies?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</CardGrid>
            <CenteredText>
              <Pagination
                count={movies?.totalPages || 1}
                page={page + 1}
                onChange={(_, value) => handlePageChange(null, value - 1)}
                color="primary"
              />
            </CenteredText>
          </>
        )}
      </MainContent>
    </MoviesFlex>
  );
}
