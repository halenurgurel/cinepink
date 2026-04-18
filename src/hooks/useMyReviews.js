import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";
import { getMovieTitle } from "../services/movieService";
import { useState, useEffect } from "react";

const useMyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(!!user);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collectionGroup(db, "userReviews"),
      where("userId", "==", user.uid),
    );
    const unsub = onSnapshot(q, async (snap) => {
      const parsed = snap.docs.map((d) => ({
        id: d.id,
        movieId: d.ref.parent.parent.id,
        ...d.data(),
      }));
      parsed.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));

      const withTitles = await Promise.all(
        parsed.map(async (r) => {
          if (r.movieTitle) return r;
          try {
            const title = await getMovieTitle(r.movieId);
            return { ...r, movieTitle: title };
          } catch {
            return r;
          }
        }),
      );

      setReviews(withTitles);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  return { reviews, loading };
};

export default useMyReviews;
