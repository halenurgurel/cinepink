import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

//for fetching movie data (v3)
export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

//interceptors
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB Error: ", error.response?.status, error.message);
    return Promise.reject(error);
  },
);
