import { useSearchParams } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";

interface FilterState {
  searchTerm: string;
  genres: string[];
  releaseYear: number | undefined;
  sortField: string;
  sortOrder: "asc" | "desc";
}

const DEFAULT_FILTERS: FilterState = {
  searchTerm: "",
  genres: [],
  releaseYear: undefined,
  sortField: "title",
  sortOrder: "asc",
};

export const useFilterPersistence = (initialFilters: Partial<FilterState> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters: FilterState = {
      searchTerm: searchParams.get("search") || DEFAULT_FILTERS.searchTerm,
      genres: searchParams.get("genres")?.split(",").filter(Boolean) || DEFAULT_FILTERS.genres,
      releaseYear: searchParams.get("year") ? parseInt(searchParams.get("year")!) : DEFAULT_FILTERS.releaseYear,
      sortField: searchParams.get("sortField") || DEFAULT_FILTERS.sortField,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_FILTERS.sortOrder,
    };

    setFilters(urlFilters);
  }, []);

  // Update URL when filters change
  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters };

        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);

        if (updated.searchTerm) {
          newSearchParams.set("search", updated.searchTerm);
        } else {
          newSearchParams.delete("search");
        }

        if (updated.genres.length > 0) {
          newSearchParams.set("genres", updated.genres.join(","));
        } else {
          newSearchParams.delete("genres");
        }

        if (updated.releaseYear) {
          newSearchParams.set("year", updated.releaseYear.toString());
        } else {
          newSearchParams.delete("year");
        }

        if (updated.sortField !== DEFAULT_FILTERS.sortField) {
          newSearchParams.set("sortField", updated.sortField);
        } else {
          newSearchParams.delete("sortField");
        }

        if (updated.sortOrder !== DEFAULT_FILTERS.sortOrder) {
          newSearchParams.set("sortOrder", updated.sortOrder);
        } else {
          newSearchParams.delete("sortOrder");
        }

        setSearchParams(newSearchParams, { replace: true });
        return updated;
      });
    },
    [searchParams, setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    updateFilters,
    clearFilters,
  };
};
