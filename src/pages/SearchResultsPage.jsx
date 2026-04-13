import { useSearchParams } from "react-router";
import { searchMovies } from "../services/movieService.js";
import useMovies from "../hooks/useData.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import MovieCard from "../components/MovieCard.jsx";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { data, loading, error } = useMovies(searchMovies, query);

  const movies = [...data].sort((a, b) => {
    const yearA = a.release_date?.split("-")[0] || "0";
    const yearB = b.release_date?.split("-")[0] || "0";
    return yearB.localeCompare(yearA);
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className="p-8">
      {!query ? (
        <p className="text-center text-gray-500 italic">
          There are no movies that matched your query.
        </p>
      ) : (
        <div className="flex flex-row flex-wrap items-start justify-center gap-10">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResultsPage;
