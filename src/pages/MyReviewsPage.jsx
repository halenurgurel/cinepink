import { Link } from "react-router";
import useMyReviews from "../hooks/useMyReviews";
import Loader from "../components/Loader";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const MyReviewsPage = () => {
  const { reviews, loading } = useMyReviews();

  if (loading) return <Loader />;

  return (
    <div className="relative w-full p-8">
      <h1 className="text-logo mb-8 text-3xl font-black">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-400">You haven't reviewed any movie yet.</p>
      ) : (
        <div className="flex max-w-2xl flex-col gap-4">
          {reviews.map((review) => (
            <Link
              key={review.id}
              to={`/movies/${review.movieId}`}
              className="bg-logo/5 ring-logo/10 hover:ring-logo/30 rounded-xl p-4 ring-1 transition-shadow"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-logo font-semibold">
                  {review.movieTitle || `Movie #${review.movieId}`}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-0.5 text-sm text-yellow-400">
                    <StarRoundedIcon fontSize="inherit" />
                    <span className="text-gray-500">{review.rating}/5</span>
                  </span>
                  {review.createdAt && (
                    <span className="text-xs text-gray-400">
                      {review.createdAt.toDate().toLocaleDateString("en-GB")}
                    </span>
                  )}
                </div>
              </div>
              <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                {review.content}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviewsPage;
