import { tmdbApi } from "./axiosConfig";

//get trending movies for today
export const getTrendingMoviesToday = async () => {
  const response = await tmdbApi.get(`/trending/movie/day`);
  return response.data.results;
};

//get now playing
export const getNowPlaying = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/now_playing`, {
    params: { page },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

//get upcoming
export const getUpcomingMovies = async (page = 1) => {
  const today = new Date().toISOString().split("T")[0];
  const threeMonths = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const response = await tmdbApi.get(`/discover/movie`, {
    params: {
      sort_by: "popularity.desc",
      "primary_release_date.gte": today,
      "primary_release_date.lte": threeMonths,
      page,
    },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

//get popular movies
export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/popular`, { params: { page } });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

//get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  const response = await tmdbApi.get(`/movie/top_rated`, { params: { page } });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

//get random trending movie
export const getRandomTrendingMovie = async () => {
  const movies = await getTrendingMoviesToday();
  return movies[Math.floor(Math.random() * movies.length)];
};

//get movie details
export const getMovieTitle = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data.title;
};

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
export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get(`/search/movie`, {
    params: { query, page },
  });
  return { results: response.data.results, totalPages: response.data.total_pages };
};
