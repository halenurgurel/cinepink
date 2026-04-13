import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="relative w-full p-8">
      <h1 className="text-logo mb-8 text-3xl font-black">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">
          You haven't added any movie to your favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
