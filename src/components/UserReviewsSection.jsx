import { useState } from "react";
import { toast } from "sonner";
import useUserReviews from "../hooks/useUserReviews";
import UserReviewForm from "./UserReviewForm";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const UserReviewsSection = ({ movieId, movieTitle }) => {
  const { reviews, addReview, updateReview, deleteReview, userReview } =
    useUserReviews(movieId);
  const [editingReview, setEditingReview] = useState(null);

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      toast.success("Review deleted.");
    } catch {
      toast.error("Could not delete review.");
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <h2 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
        User Reviews
      </h2>
      <div className="mb-4">
        <UserReviewForm
          onSubmit={(content, rating) => addReview(content, rating, movieTitle)}
          onUpdate={updateReview}
          existingReview={userReview}
          editingReview={editingReview}
          onCancelEdit={() => setEditingReview(null)}
        />
      </div>
      {reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-logo/5 ring-logo/10 rounded-xl p-4 ring-1"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-logo font-semibold">
                    {review.userName}
                  </span>
                  <span className="flex items-center gap-0.5 text-sm text-yellow-400">
                    <StarRoundedIcon fontSize="inherit" />
                    <span className="text-gray-500">{review.rating}/5</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {review.createdAt && (
                    <span className="text-xs text-gray-400">
                      {review.createdAt.toDate().toLocaleDateString("en-GB")}
                    </span>
                  )}
                  {review.id === userReview?.id && (
                    <>
                      <button
                        onClick={() => setEditingReview(review)}
                        className="text-logo cursor-pointer hover:opacity-70"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-logo cursor-pointer hover:opacity-70"
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviewsSection;
