import { useParams } from "react-router";
import useMovies from "../hooks/useData.js";
import { getPersonDetails } from "../services/movieService.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { TMDB_IMG_BASE_URL_W500, DEFAULT_AVATAR } from "../constants/tmdb.js";
import MovieCard from "../components/MovieCard";

const PersonDetailsPage = () => {
  const { personId } = useParams();
  const {
    data: person,
    loading,
    error,
  } = useMovies(getPersonDetails, personId);

  //filter 12 movies with posters
  const castMovies = person?.movie_credits?.cast
    ?.filter((p) => p.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="mx-auto px-5 pb-10">
      <div className="flex flex-col gap-10 md:flex-row">
        {/*Poster of person*/}
        <div className="shrink-0">
          <img
            src={
              person.profile_path
                ? `${TMDB_IMG_BASE_URL_W500}${person.profile_path}`
                : DEFAULT_AVATAR
            }
            alt={person.name}
            className="w-64 rounded-2xl shadow-2xl"
          />

          {/*Info*/}
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500">
            {person.known_for_department && (
              <p>
                <span className="font-semibold text-gray-700">Known for: </span>
                {person.known_for_department}
              </p>
            )}
            {person.birthday && (
              <p>
                <span className="font-semibold text-gray-700">Born: </span>
                {person.birthday.split("-").reverse().join("/")}
                {person.place_of_birth ? ` — ${person.place_of_birth}` : ""}
              </p>
            )}
            {person.deathday && (
              <p>
                <span className="font-semibold text-gray-700">Died: </span>
                {person.deathday.split("-").reverse().join("/")}
              </p>
            )}
            {person.also_known_as?.length > 0 && (
              <p>
                <span className="font-semibold text-gray-700">
                  Also known as:{" "}
                </span>
                {person.also_known_as.join(", ")}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-logo text-4xl font-black">{person.name}</h1>
          {/*Biography*/}
          {person.biography && (
            <div className="border-t border-gray-200 pt-4">
              <h2 className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Biography
              </h2>
              <p className="max-w-2xl leading-relaxed text-gray-700">
                {person.biography}
              </p>
            </div>
          )}
        </div>
      </div>

      {/*known for*/}
      {castMovies?.length > 0 && (
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Known For
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {castMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PersonDetailsPage;
