import type { Movie } from "../../types/Movie";
import type { Page } from "../../types/Shared";
import instance from "../config/axiosConfig";
import { moviesEndpoints } from "./moviesEndpoints";

export const getMovies = async (page: number, size: number, sortField?: string, sortOrder?: "asc" | "desc") => {
  const response = await instance.get<Page<Movie>>(moviesEndpoints.getAll(), {
    params: {
      page,
      size,
      sort: `${sortField},${sortOrder}`,
    },
  });

  return response.data;
};
