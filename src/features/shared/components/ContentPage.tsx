import FilterListIcon from "@mui/icons-material/FilterList";
import { Drawer, Pagination, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDrawer } from "../../../hooks/shared/useDrawer";
import { useFilterPersistence } from "../../../hooks/shared/useFilterPersistence";
import MovieCard from "./Card";
import SelectedGenres from "./SelectedGenres";
import Spinner from "./Spinner";
import {
  CardGrid,
  CenteredText,
  ChipsContainer,
  GenreListContainer,
  MainContent,
  MobileFilterButton,
  Sidebar,
} from "./Styled";
import FilterPanel from "./filters/FilterPanel";

const ContentFlex = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

interface ContentPageProps {
  title: string;
  isSeries?: boolean;
  useQuery: (page: number, size: number, options?: any) => any;
  initialFilters?: any;
}

export default function ContentPage({ title, isSeries = false, useQuery, initialFilters = {} }: ContentPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { open: sidebarOpen, toggleDrawer } = useDrawer();

  const { filters, updateFilters, clearFilters } = useFilterPersistence(initialFilters);

  const {
    data: content,
    isLoading,
    page,
    handlePageChange,
    handleGenreFilter,
    clearFilters: clearQueryFilters,
  } = useQuery(0, 20, {
    sortField: filters.sortField,
    sortOrder: filters.sortOrder,
    isSeries,
    genres: filters.genres,
    releaseYear: filters.releaseYear,
    searchTerm: filters.searchTerm,
  });

  const handleGenreClick = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];

    updateFilters({ genres: newGenres });
    handleGenreFilter(genre);
  };

  const handleSearchChange = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  const handleReleaseYearChange = (releaseYear: number | undefined) => {
    updateFilters({ releaseYear });
  };

  const handleSortChange = (sortField: string, sortOrder: "asc" | "desc") => {
    updateFilters({ sortField, sortOrder });
  };

  const handleClear = () => {
    clearFilters();
    clearQueryFilters();
  };

  // Sidebar content as a component for reuse
  const sidebarContent = (
    <>
      <GenreListContainer>
        <FilterPanel
          selectedGenres={filters.genres}
          onGenreClick={handleGenreClick}
          searchTerm={filters.searchTerm}
          onSearchChange={handleSearchChange}
          releaseYear={filters.releaseYear}
          onReleaseYearChange={handleReleaseYearChange}
          sortField={filters.sortField}
          sortOrder={filters.sortOrder}
          onSortChange={handleSortChange}
          onClearFilters={handleClear}
          isSeries={isSeries}
        />
      </GenreListContainer>
      <ChipsContainer>
        <SelectedGenres genres={filters.genres} />
      </ChipsContainer>
    </>
  );

  return (
    <ContentFlex>
      {/* Filter toggle icon for mobile */}
      {isMobile && (
        <MobileFilterButton color="primary" onClick={toggleDrawer}>
          <FilterListIcon />
        </MobileFilterButton>
      )}

      {/* Sidebar: Drawer on mobile, fixed on desktop */}
      {isMobile ? (
        <Drawer anchor="left" open={sidebarOpen} onClose={toggleDrawer}>
          {sidebarContent}
        </Drawer>
      ) : (
        <Sidebar>{sidebarContent}</Sidebar>
      )}

      {/* Content Section */}
      <MainContent>
        <CenteredText>
          <Typography variant="h3">{title}</Typography>
        </CenteredText>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CardGrid container>
              {content?.content.map((item: any) => <MovieCard key={item.id} movie={item} />)}
            </CardGrid>
            <CenteredText>
              <Pagination
                count={content?.totalPages || 1}
                page={page + 1}
                onChange={(_, value) => handlePageChange(null, value - 1)}
                color="primary"
              />
            </CenteredText>
          </>
        )}
      </MainContent>
    </ContentFlex>
  );
}
