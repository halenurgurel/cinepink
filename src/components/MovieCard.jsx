import { Link } from "react-router";
import { TMDB_IMG_BASE_URL_W300, DEFAULT_POSTER } from "../constants/tmdb";
import Button from "./Button";
import FavoriteButton from "./FavoriteButton";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

const MovieCard = ({ movie, variant = "default" }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className={`group relative block overflow-hidden rounded-2xl ${variant === "default" ? "" : ""}`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <img
          src={
            movie.poster_path
              ? `${TMDB_IMG_BASE_URL_W300}${movie.poster_path}`
              : DEFAULT_POSTER
          }
          alt={movie.title}
          className="aspect-2/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
        />

        {/*Hover overlay*/}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button to={`/movies/${movie.id}`} variant="card">
            View Details
          </Button>
          {movie.vote_average > 0 && (
            <div className="flex items-center gap-1">
              <span>
                <StarRoundedIcon className="font-medium text-yellow-400" />
              </span>
              <span className="text-background text-sm font-bold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <FavoriteButton
          movie={movie}
          className="absolute top-2 right-2 rounded-full"
        />
      </div>
      <div className="mx-2 mt-2 w-60 px-1">
        <p className="text-sm font-semibold text-gray-500">{movie.title}</p>
        <p className="text-logo text-xs">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};
export default MovieCard;
