import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import ContentPage from "../shared/components/ContentPage";

export default function SeriesPage() {
  return (
    <ContentPage
      title="Series"
      isSeries={true}
      useQuery={useMoviesQuery}
      initialFilters={{
        sortField: "title",
        sortOrder: "asc",
        isSeries: true,
        genres: [],
      }}
    />
  );
}
