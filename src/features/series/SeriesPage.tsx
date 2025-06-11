import FilterListIcon from "@mui/icons-material/FilterList";
import { Drawer, Pagination, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useState } from "react";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import usePaginatedQuery from "../../hooks/shared/usePagenatedQuery";
import GenreFilter from "../shared/GenreFilter";
import MovieCard from "../shared/components/Card";
import SelectedGenres from "../shared/components/SelectedGenres";
import Spinner from "../shared/components/Spinner";
import {
  CardGrid,
  CenteredText,
  ChipsContainer,
  DrawerClearButton,
  GenreListContainer,
  MainContent,
  MobileFilterButton,
  Sidebar,
} from "../shared/components/Styled";

// Styled Components
const SeriesFlex = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export default function SeriesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    data: series,
    isLoading,
    page,
    handlePageChange,
    handleGenreFilter,
    clearFilters,
    options,
  } = usePaginatedQuery(useMoviesQuery, 0, 20, {
    sortField: "title",
    sortOrder: "asc",
    isSeries: true,
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
        <GenreFilter selectedGenres={options.genres ?? []} onGenreClick={handleGenreClick} />
      </GenreListContainer>
      <DrawerClearButton variant="outlined" color="primary" onClick={handleClear}>
        Clear
      </DrawerClearButton>
      <ChipsContainer>
        <SelectedGenres genres={options.genres ?? []} />
      </ChipsContainer>
    </>
  );

  return (
    <SeriesFlex>
      {/* Filter toggle icon for mobile */}
      {isMobile && (
        <MobileFilterButton color="primary" onClick={() => setSidebarOpen(true)}>
          <FilterListIcon />
        </MobileFilterButton>
      )}

      {/* Sidebar: Drawer on mobile, fixed on desktop */}
      {isMobile ? (
        <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          {sidebarContent}
        </Drawer>
      ) : (
        <Sidebar>{sidebarContent}</Sidebar>
      )}

      {/* Movies Section */}
      <MainContent>
        <CenteredText>
          <Typography variant="h3">Series</Typography>
        </CenteredText>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CardGrid container>{series?.content.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</CardGrid>
            <CenteredText>
              <Pagination
                count={series?.totalPages || 1}
                page={page + 1}
                onChange={(_, value) => handlePageChange(null, value - 1)}
                color="primary"
              />
            </CenteredText>
          </>
        )}
      </MainContent>
    </SeriesFlex>
  );
}
