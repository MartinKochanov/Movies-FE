import { Box, Collapse, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useState } from "react";

import GenreFilter from "./GenreFilter";

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const CollapsibleSection = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1),
}));

interface FilterPanelProps {
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  releaseYear: number | undefined;
  onReleaseYearChange: (year: number | undefined) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string, order: "asc" | "desc") => void;
  onClearFilters: () => void;
  isSeries?: boolean;
}

export default function FilterPanel({
  selectedGenres,
  onGenreClick,
  searchTerm,
  releaseYear,
  onClearFilters,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    genres: true,
    year: false,
    sort: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters = selectedGenres.length > 0 || searchTerm || releaseYear;

  return (
    <FilterContainer>
      {/* Genres Section */}
      <CollapsibleSection>
        <FilterTitle onClick={() => toggleSection("genres")} sx={{ cursor: "pointer", userSelect: "none" }}>
          🎭 Genres {selectedGenres.length > 0 && `(${selectedGenres.length})`}
        </FilterTitle>
        <Collapse in={expandedSections.genres}>
          <GenreFilter selectedGenres={selectedGenres} onGenreClick={onGenreClick} />
        </Collapse>
      </CollapsibleSection>

      {hasActiveFilters && (
        <>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Typography
              variant="body2"
              color="primary"
              onClick={onClearFilters}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": { textDecoration: "none" },
              }}
            >
              Clear All Filters
            </Typography>
          </Box>
        </>
      )}
    </FilterContainer>
  );
}
