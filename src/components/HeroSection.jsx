import { Link } from "react-router";
import useMovies from "../hooks/useData";
import { getRandomTrendingMovie } from "../services/movieService";
import {
  TMDB_IMG_BASE_URL_W1280,
  TMDB_IMG_BASE_URL_W500,
  DEFAULT_POSTER,
} from "../constants/tmdb";
import Loader from "./Loader";
import Button from "./Button";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteButton from "./FavoriteButton";

const HeroSection = () => {
  const { data: featured, loading } = useMovies(getRandomTrendingMovie);

  if (loading) return <Loader />;
  if (!featured) return null;

  return (
    <div className="relative mb-6 h-[70vh] w-full overflow-hidden">
      <img
        src={
          featured.backdrop_path
            ? `${TMDB_IMG_BASE_URL_W1280}${featured.backdrop_path}`
            : DEFAULT_POSTER
        }
        alt={featured.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 p-8">
        <h1 className="mb-2 text-4xl font-black text-white">
          {featured.title}
        </h1>
        <div className="flex items-center gap-3">
          <p className="mb-1 text-sm text-yellow-400">
            <StarRoundedIcon fontSize="small" className="-mt-1" />{" "}
            {featured.vote_average?.toFixed(1)}{" "}
            <span className="text-gray-300">
              · {featured.release_date?.split("-")[0]}
            </span>
          </p>
          <FavoriteButton movie={featured} className="-mt-2" />
        </div>

        <p className="mb-6 line-clamp-2 max-w-lg text-sm text-gray-300">
          {featured.overview}
        </p>
        <Button to={`/movies/${featured.id}`} variant="hero">
          View Details
        </Button>
      </div>
    </div>
  );
};
export default HeroSection;
