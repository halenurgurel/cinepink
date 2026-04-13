import { useRef } from "react";
import useMovies from "../hooks/useData";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import MovieCard from "./MovieCard";

const MovieSlider = ({ title, fetchFn }) => {
  const { data: movies, loading, error } = useMovies(fetchFn);
  const swiperRef = useRef(null);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="relative w-full px-8 py-2">
      <h1 className="text-logo mb-6 text-3xl font-bold">{title}</h1>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} variant="slider" />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="text-logo absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer p-3 text-5xl hover:opacity-80"
      >
        ‹
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="text-logo absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer p-3 text-5xl hover:opacity-80"
      >
        ›
      </button>
    </div>
  );
};
export default MovieSlider;
