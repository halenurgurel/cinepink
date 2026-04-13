import HeroSection from "../components/HeroSection";
import MovieSlider from "../components/MovieSlider";
import {
  getTrendingMoviesToday,
  getNowPlaying,
} from "../services/movieService";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <HeroSection />
      <MovieSlider title="Now Playing" fetchFn={getNowPlaying} />
      <MovieSlider title="Trending Today" fetchFn={getTrendingMoviesToday} />
    </div>
  );
};
export default HomePage;
