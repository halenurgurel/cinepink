import { useSearchParams } from "react-router";
import { useState } from "react";
import { searchMovies } from "../services/movieService.js";
import useMovies from "../hooks/useData.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import MovieCard from "../components/MovieCard.jsx";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setPage(1);
  }

  const { data: movies, loading, error, totalPages } = useMovies(searchMovies, query, page);

  if (loading && movies.length === 0) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="p-8">
      {!query ? (
        <p className="text-center text-gray-500 italic">
          There are no movies that matched your query.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {page < totalPages && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                className="bg-logo hover:bg-darkPink text-background cursor-pointer rounded-lg px-6 py-2 font-semibold transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
