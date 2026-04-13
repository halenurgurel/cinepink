import { useParams } from "react-router";
import { Link } from "react-router";
import {
  DEFAULT_POSTER,
  TMDB_IMG_BASE_URL_W300,
  TMDB_IMG_BASE_URL_W500,
  TMDB_IMG_BASE_URL_W1280,
  DEFAULT_AVATAR,
} from "../constants/tmdb";
import useMovies from "../hooks/useData";
import { getMovieDetails, getReviews } from "../services/movieService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect, useState } from "react";
import ReviewModal from "../components/ReviewModal";
import CastModal from "../components/CastModal";
import TrailerModal from "../components/TrailerModal";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import useFavorites from "../hooks/useFavorites";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data: movie, loading, error } = useMovies(getMovieDetails, movieId);

  //favorite
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  //reviews state
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewData, setReviewData] = useState(null);

  //cast modal state
  const [showCast, setShowCast] = useState(false);

  //show trailer state
  const [showTrailer, setShowTrailer] = useState(false);
  const trailer = movie?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(movieId, page);
      setAllReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const newReviews = data.results.filter((r) => !existingIds.has(r.id));
        return [...prev, ...newReviews];
      });
      setReviewData(data);
    };
    fetchReviews();
  }, [movieId, page]);

  const director = movie?.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  //modal
  const [selectedReview, setSelectedReview] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className="mx-auto">
      {/*Backdrop hero*/}
      {movie.backdrop_path && (
        <div className="relative mb-8 h-95 w-full overflow-hidden rounded-2xl">
          <img
            src={`${TMDB_IMG_BASE_URL_W1280}${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="from-background via-background/50 absolute inset-0 bg-linear-to-t to-transparent" />
        </div>
      )}

      <div className="px-5 pb-10">
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Poster */}
          <div className="shrink-0">
            <img
              onClick={() => trailer && setShowTrailer(true)}
              src={
                movie.poster_path
                  ? `${TMDB_IMG_BASE_URL_W500}${movie.poster_path}`
                  : DEFAULT_POSTER
              }
              alt={movie.title}
              className="w-64 cursor-pointer rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/*Info*/}
          <div className="flex flex-col gap-5">
            {/*Title + Rating*/}
            <div className="flex flex-wrap items-start justify-start gap-4">
              <div>
                <h1 className="text-logo text-4xl leading-tight font-black">
                  {movie.title}{" "}
                  <span className="ml-2 text-3xl opacity-70">
                    ({movie.release_date?.split("-")[0]})
                  </span>
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {movie.release_date?.split("-").reverse().join("/")}{" "}
                  {movie.runtime ? ` · ${movie.runtime} min` : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {movie.vote_average > 0 && (
                  <div className="bg-logo/10 ring-logo/20 flex items-center gap-1.5 rounded-xl px-4 py-2 ring-1">
                    <span className="text-xl text-yellow-400">★</span>
                    <span className="text-logo text-2xl font-black">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400">/10</span>
                  </div>
                )}
                {/*Favorites button*/}
                <button
                  onClick={() =>
                    isFavorite(movie.id)
                      ? removeFavorite(movie.id)
                      : addFavorite(movie)
                  }
                  className="bg-logo/10 ring-logo/20 hover:bg-logo/20 flex cursor-pointer items-center justify-center rounded-xl px-4 py-3 ring-1 transition-colors"
                >
                  {isFavorite(movie.id) ? (
                    <FavoriteRoundedIcon className="text-logo" />
                  ) : (
                    <FavoriteBorderRoundedIcon className="text-logo" />
                  )}
                </button>
              </div>
            </div>

            {/*Genres*/}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="border-logo/20 bg-logo/10 text-logo rounded-full border px-3 py-1 text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/*Overview*/}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Overview
              </h2>
              <p className="max-w-2xl leading-relaxed text-gray-700">
                {movie.overview}
              </p>
            </div>

            {/*Director*/}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="mb-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                Director
              </h2>
              <p className="font-medium">{director?.name ?? "Unknown"}</p>
            </div>

            {/*Cast*/}
            {movie?.credits?.cast?.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Cast
                </h2>
                <div className="flex flex-wrap gap-4">
                  {movie.credits.cast.slice(0, 6).map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      <Link to={`/person/${c.id}`}>
                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <img
                            src={
                              c.profile_path
                                ? `${TMDB_IMG_BASE_URL_W300}${c.profile_path}`
                                : DEFAULT_AVATAR
                            }
                            alt={c.name}
                            className="ring-logo/30 h-16 w-16 rounded-full object-cover ring-2"
                          />
                          <span className="w-16 text-xs font-medium">
                            {c.name}
                          </span>
                          <span className="w-16 text-xs font-medium text-gray-400">
                            {c.character}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button
                    className="text-logo cursor-pointer text-sm font-medium underline hover:opacity-70"
                    onClick={() => setShowCast(true)}
                  >
                    Full Cast
                  </button>
                </div>
              </div>
            )}

            {/*Reviews*/}
            {allReviews.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Reviews
                </h2>
                <div className="flex flex-col gap-4">
                  {allReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-logo/5 ring-logo/10 rounded-xl p-4 ring-1"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-logo font-semibold">
                          {review.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {review.created_at
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </span>
                      </div>
                      <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">
                        {review.content}
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="text-logo mt-2 cursor-pointer text-sm font-semibold hover:font-black"
                        >
                          More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {page < reviewData?.total_pages && (
                  <button onClick={() => setPage((prev) => prev + 1)}>
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/*Review Modal*/}
      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
      {/*ShowCast Modal*/}
      {showCast && (
        <CastModal
          cast={movie.credits.cast}
          onClose={() => setShowCast(false)}
        />
      )}

      {/*Watch Trailer Modal*/}
      {showTrailer && (
        <TrailerModal
          trailerKey={trailer.key}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};
export default MovieDetailsPage;
