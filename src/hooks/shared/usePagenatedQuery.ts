import type { UseQueryResult } from "@tanstack/react-query";

import { type ChangeEvent, type MouseEvent, useCallback, useState } from "react";

import type { Page } from "../../types/Shared";

export type PaginatedQueryOptions = {
  sortField?: string;
  sortOrder?: "asc" | "desc";
  isSeries?: boolean;
  searchTerm?: string;
  genres?: string[];
  releaseYear?: number;
};

const usePaginatedQuery = <T>(
  queryHook: (page: number, size: number, options?: PaginatedQueryOptions) => UseQueryResult<Page<T>>,
  initialPage: number = 0,
  initialRowsPerPage: number = 10,
  initialOptions: PaginatedQueryOptions = {}
) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortField, setSortField] = useState(() => initialOptions.sortField || "");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [options, setOptions] = useState(initialOptions);

  const { data, isLoading, error } = queryHook(page, rowsPerPage, {
    ...options,
    sortField,
    sortOrder,
  });

  const handlePageChange = useCallback((_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
  }, []);

  const handleSortChange = useCallback(
    (field: string) => {
      if (field === sortField) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
      setPage(0);
    },
    [sortField]
  );

  const handleGenreFilter = useCallback((genre: string) => {
    setOptions((prev) => {
      const genres = prev.genres || [];
      const updatedGenres = genres.includes(genre) ? genres.filter((g) => g !== genre) : [...genres, genre];
      return { ...prev, genres: updatedGenres };
    });
    setPage(0); // Reset to the first page when filters change
  }, []);

  const handleSearchTermChange = useCallback((searchTerm: string) => {
    setOptions((prev) => ({ ...prev, searchTerm }));
    setPage(0); // Reset to the first page when filters change
  }, []);

  const handleReleaseYearFilter = useCallback((releaseYear: number) => {
    setOptions((prev) => ({ ...prev, releaseYear }));
    setPage(0); // Reset to the first page when filters change
  }, []);

  const clearFilters = useCallback(() => {
    setOptions(initialOptions);
    setPage(0);
  }, [initialOptions]);

  return {
    data,
    isLoading,
    error,
    rowsPerPage,
    page,
    sortField,
    sortOrder,
    options,
    handlePageChange,
    handleChangeRowsPerPage,
    handleSortChange,
    handleGenreFilter,
    handleSearchTermChange,
    handleReleaseYearFilter,
    clearFilters,
    setOptions,
  };
};

export default usePaginatedQuery;
