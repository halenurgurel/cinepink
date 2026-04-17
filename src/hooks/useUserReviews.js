import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";

const useUserReviews = (movieId) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const q = query(
      collection(db, "reviews", String(movieId), "userReviews"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, [movieId]);

  const addReview = async (content, rating, movieTitle) => {
    if (!user) throw new Error("Yorum yazmak için giriş yapmalısın.");
    await addDoc(
      collection(db, "reviews", String(movieId), "userReviews"),
      {
        userId: user.uid,
        userName: user.displayName || user.email.split("@")[0],
        movieId: String(movieId),
        movieTitle: movieTitle ?? "",
        content,
        rating,
        createdAt: serverTimestamp(),
      },
    );
  };

  const updateReview = async (reviewId, content, rating) => {
    await updateDoc(
      doc(db, "reviews", String(movieId), "userReviews", reviewId),
      { content, rating, updatedAt: serverTimestamp() },
    );
  };

  const deleteReview = async (reviewId) => {
    await deleteDoc(
      doc(db, "reviews", String(movieId), "userReviews", reviewId),
    );
  };

  const userReview = reviews.find((r) => r.userId === user?.uid);

  return { reviews, loading, addReview, updateReview, deleteReview, userReview };
};

export default useUserReviews;
