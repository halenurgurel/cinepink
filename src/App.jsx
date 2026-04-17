import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/AuthProvider";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyReviewsPage from "./pages/MyReviewsPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="/person/:personId" element={<PersonDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <PrivateRoute>
                <MyReviewsPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default App;
