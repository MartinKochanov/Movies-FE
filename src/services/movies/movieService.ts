import type { Movie } from "../../types/Movie";
import type { Page } from "../../types/Shared";
import instance from "../config/axiosConfig";
import { moviesEndpoints } from "./moviesEndpoints";

export const getMovies = async (
  page: number,
  size: number,
  sortField?: string,
  sortOrder?: "asc" | "desc",
  isSeries?: boolean,
  genres?: string[],
  releaseYear?: number
) => {
  const response = await instance.get<Page<Movie>>(moviesEndpoints.getAll(), {
    params: {
      page,
      size,
      sort: `${sortField},${sortOrder}`,
      isSeries,
      genres: genres && genres.length > 0 ? genres : undefined,
      releaseYear,
    },
    paramsSerializer: (params) => {
      // genres as repeated params: genres=Action&genres=Comedy
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });

  return response.data;
};
