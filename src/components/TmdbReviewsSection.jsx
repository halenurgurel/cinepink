import { useEffect, useState } from "react";
import { getReviews } from "../services/movieService";
import ReviewModal from "./ReviewModal";

const TmdbReviewsSection = ({ movieId }) => {
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewData, setReviewData] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(movieId, page);
      setAllReviews((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const newReviews = data.results.filter((r) => !existingIds.has(r.id));
        return [...prev, ...newReviews];
      });
      setReviewData(data);
    };
    fetchReviews();
  }, [movieId, page]);

  if (allReviews.length === 0) return null;

  return (
    <>
      <div className="border-t border-gray-200 pt-4">
        <h2 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
          TMDB Reviews
        </h2>
        <div className="flex flex-col gap-4">
          {allReviews.map((review) => (
            <div
              key={review.id}
              className="bg-logo/5 ring-logo/10 rounded-xl p-4 ring-1"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-logo font-semibold">{review.author}</span>
                <span className="text-xs text-gray-400">
                  {review.created_at
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </span>
              </div>
              <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">
                {review.content}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedReview(review)}
                  className="text-logo mt-2 cursor-pointer text-sm font-semibold hover:font-black"
                >
                  More →
                </button>
              </div>
            </div>
          ))}
        </div>
        {page < reviewData?.total_pages && (
          <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        )}
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </>
  );
};

export default TmdbReviewsSection;
