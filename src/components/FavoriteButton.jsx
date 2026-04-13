import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import useFavorites from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

const FavoriteButton = ({ movie, className = "" }) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <button onClick={handleFavorite} className={`cursor-pointer ${className}`}>
      {isFavorite(movie.id) ? (
        <FavoriteRoundedIcon fontSize="small" className="text-logo" />
      ) : (
        <FavoriteBorderRoundedIcon fontSize="small" className="text-logo" />
      )}
    </button>
  );
};

export default FavoriteButton;
