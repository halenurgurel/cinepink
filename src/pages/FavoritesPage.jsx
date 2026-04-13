import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="px-5 py-10">
      <h1 className="text-logo mb-8 text-3xl font-black">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">
          You haven't added any movie to your favorites yet.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
