import {
  getNowPlaying,
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../services/movieService.js";
import useMovies from "../hooks/useData.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

const tabs = [
  { label: "Now Playing", fetchFn: getNowPlaying },
  { label: "Upcoming", fetchFn: getUpcomingMovies },
  { label: "Popular", fetchFn: getPopularMovies },
  { label: "Top Rated", fetchFn: getTopRatedMovies },
];

const MoviesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const {
    data: movies,
    loading,
    error,
    totalPages,
  } = useMovies(tabs[activeTab].fetchFn, page);

  const handleTabChange = (i) => {
    setActiveTab(i);
    setPage(1);
  };

  if (loading && movies.length === 0) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="relative w-full p-8">
      {/*Now Playing, Upcoming section*/}
      <div className="mb-6 flex gap-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={`cursor-pointer text-lg font-bold ${activeTab === i ? "text-logo border-logo border-b-2" : "text-gray-400"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/*Movie Cards*/}
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
    </div>
  );
};
export default MoviesPage;
