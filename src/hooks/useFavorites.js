import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const favoritesRef = collection(db, "users", user.uid, "favorites");
    const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
      const favList = snapshot.docs.map((doc) => doc.data());
      setFavorites(favList);
    });

    return () => unsubscribe();
  }, [user]);

  const addFavorite = async (movie) => {
    const movieRef = doc(db, "users", user.uid, "favorites", String(movie.id));
    await setDoc(movieRef, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
  };

  const removeFavorite = async (movieId) => {
    const movieRef = doc(db, "users", user.uid, "favorites", String(movieId));
    await deleteDoc(movieRef);
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };
  return { favorites, addFavorite, removeFavorite, isFavorite };
};
export default useFavorites;
