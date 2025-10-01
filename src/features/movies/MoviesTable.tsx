import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

import { useCallback, useState } from "react";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import usePaginatedQuery from "../../hooks/shared/usePagenatedQuery";
import type { Movie } from "../../types/Movie";
import Spinner from "../shared/components/Spinner";
import { type Column, GenericTable } from "../shared/components/Table";

const movieColumns: Column<Movie>[] = [
  { field: "title", headerName: "Title" },
  { field: "releaseYear", headerName: "Year" },
  { field: "duration", headerName: "Duration (min)" },
  {
    field: "genres",
    headerName: "Genres",
    renderCell: (row: Movie) => row.genres.join(", "),
  },
  {
    field: "imageUrl",
    headerName: "image",
    renderCell: (row: Movie) => <img src={row.imageUrl} alt={row.title} style={{ width: "100%", height: "150px" }} />,
  },
];

const MoviesTable = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [modalType, setModalType] = useState<"ADD" | "EDIT" | "DELETE" | "VIEW" | "">("");

  const {
    data,
    isLoading,
    page,
    rowsPerPage,
    handlePageChange,
    handleChangeRowsPerPage,
    handleSortChange,
    sortField,
    sortOrder,
  } = usePaginatedQuery<Movie>(useMoviesQuery, 0, 10, { sortField: "title", sortOrder: "asc", isSeries: false });

  const openModal = useCallback((type: "ADD" | "EDIT" | "DELETE" | "VIEW", id?: string) => {
    setModalType(type);
    if (id) setSelectedMovieId(id);
  }, []);

  // const closeModal = useCallback(() => {
  //   setModalType("");
  //   setSelectedMovieId("");
  // }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ width: "60%" }}>
        <Box mb={2}>
          <Button variant="contained" onClick={() => openModal("ADD")} startIcon={<AddCircleOutlineRounded />}>
            Add Movie
          </Button>
        </Box>

        {isLoading ? (
          <Spinner />
        ) : (
          <GenericTable
            columns={movieColumns}
            rows={data?.content || []}
            count={data?.totalElements || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            sortField={sortField}
            sortOrder={sortOrder}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onSortChange={handleSortChange}
            // onEdit={(movie) => openModal("EDIT", movie.id)}
            // onDelete={(movie) => openModal("DELETE", movie.id)}
          />
        )}

        {/* Modals
      <Modal open={modalType === "ADD"} title="Add Movie" onClose={closeModal}>
        <AddMovieForm onClose={closeModal} />
      </Modal>
      <Modal open={modalType === "EDIT"} title="Edit Movie" onClose={closeModal}>
        <UpdateMovieForm movieId={selectedMovieId} onClose={closeModal} />
      </Modal>
      <Modal open={modalType === "DELETE"} title="Delete Movie" onClose={closeModal}>
        <DeleteMovieForm movieId={selectedMovieId} onClose={closeModal} />
      </Modal>
      <Modal open={modalType === "VIEW"} title="View Movie" onClose={closeModal}>
        <MovieView movieId={selectedMovieId} onClose={closeModal} />
      </Modal>*/}
      </Box>
    </Box>
  );
};

export default MoviesTable;
