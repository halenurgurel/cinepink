import { tmdbApi } from "./axiosConfig";

//get trending movies for today
export const getTrendingMoviesToday = async () => {
  const response = await tmdbApi.get(`/trending/movie/day`);
  return response.data.results;
};

//get now playing
export const getNowPlaying = async () => {
  const response = await tmdbApi.get(`/movie/now_playing`);
  return response.data.results.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date),
  );
};

//get upcoming
export const getUpcomingMovies = async () => {
  const response = await tmdbApi.get(`/movie/upcoming`, {
    params: { region: "US" },
  });
  const today = new Date().toISOString().split("T")[0];
  return response.data.results
    .filter((movie) => movie.release_date > today)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
};

//get popular
export const getPopular = async () => {
  const response = await tmdbApi.get(`/movie/popular`);
  return response.data.results;
};

//get random trending movie
export const getRandomTrendingMovie = async () => {
  const movies = await getTrendingMoviesToday();
  return movies[Math.floor(Math.random() * movies.length)];
};

//get movie details
export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,videos",
    },
  });
  return response.data;
};

//get reviews
export const getReviews = async (movieId, page = 1) => {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`, {
    params: { page },
  });
  return response.data;
};

//get person details
export const getPersonDetails = async (personId) => {
  const response = await tmdbApi.get(`/person/${personId}`, {
    params: {
      append_to_response: "movie_credits",
    },
  });
  return response.data;
};

//search movies
export const searchMovies = async (query) => {
  const response = await tmdbApi.get(`/search/movie`, {
    params: { query },
  });
  return response.data.results;
};
