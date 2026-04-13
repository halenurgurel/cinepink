import { getNowPlaying, getUpcomingMovies } from "../services/movieService.js";
import useMovies from "../hooks/useData.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

const tabs = [
  { label: "Now Playing", fetchFn: getNowPlaying },
  { label: "Upcoming", fetchFn: getUpcomingMovies },
];

const MoviesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: movies, loading, error } = useMovies(tabs[activeTab].fetchFn);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="relative w-full p-8">
      {/*Now Playing, Upcoming section*/}
      <div className="mb-6 flex gap-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
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
    </div>
  );
};
export default MoviesPage;
