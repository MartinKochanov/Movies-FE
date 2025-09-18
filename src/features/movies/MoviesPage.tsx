import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import ContentPage from "../shared/components/ContentPage";

export default function MoviesPage() {
  return (
    <ContentPage
      title="Movies"
      isSeries={false}
      useQuery={useMoviesQuery}
      initialFilters={{
        sortField: "title",
        sortOrder: "asc",
        isSeries: false,
        genres: [],
      }}
    />
  );
}
