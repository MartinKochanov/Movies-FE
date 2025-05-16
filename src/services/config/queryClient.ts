import { MutationCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import type { BadRequestBody, NotFoundErrorBody } from "../../types/Shared";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 50, // 50 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
    },
  },
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) {
        // If a specific onError handler is defined, do not execute the global handler
        return;
      }
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          const errorBody: BadRequestBody = error.response?.data;
          toast.error(badRequestHandle(errorBody));
        } else if (error.response?.status === 404) {
          const errorBody: NotFoundErrorBody = error.response?.data;
          toast.error(notFoundHandle(errorBody));
        } else {
          toast.error("An error occurred!");
        }
      } else {
        toast.error(error.message);
      }
    },
  }),
});

const badRequestHandle = (errorBody: BadRequestBody) => {
  if (errorBody && errorBody.errors) return errorBody.errors[0];
  else if (errorBody && errorBody.detail) return errorBody.detail;
  else return "Bad request!";
};

const notFoundHandle = (errorBody: NotFoundErrorBody) => {
  if (errorBody && errorBody.detail) return errorBody.detail;
  else return "Resource not found!";
};
