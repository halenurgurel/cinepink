import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

const UserReviewForm = ({ onSubmit, onUpdate, editingReview, existingReview, onCancelEdit }) => {
  const { user } = useAuth();
  const isEditing = Boolean(editingReview);
  const [rating, setRating] = useState(editingReview?.rating ?? 0);
  const [hovered, setHovered] = useState(0);
  const [content, setContent] = useState(editingReview?.content ?? "");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        Please{" "}
        <Link to="/login" className="text-logo font-semibold underline">
          log in
        </Link>{" "}
        to write a review.
      </p>
    );
  }

  if (existingReview && !isEditing) {
    return (
      <p className="text-sm text-gray-500">
        You have already reviewed this movie.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating.");
    if (!content.trim()) return toast.error("Review cannot be empty.");
    setSubmitting(true);
    try {
      if (isEditing) {
        await onUpdate(editingReview.id, content.trim(), rating);
        toast.success("Review updated!");
        onCancelEdit();
      } else {
        await onSubmit(content.trim(), rating);
        setContent("");
        setRating(0);
        toast.success("Review posted!");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="cursor-pointer text-2xl text-yellow-400 transition-transform hover:scale-110"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          >
            {star <= (hovered || rating) ? (
              <StarRoundedIcon fontSize="inherit" />
            ) : (
              <StarBorderRoundedIcon fontSize="inherit" />
            )}
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 self-center text-sm text-gray-400">
            {rating}/5
          </span>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What did you think about this movie?"
        rows={3}
        className="border-logo focus:border-darkPink w-full resize-none rounded border-2 px-3 py-2 text-sm outline-none"
      />
      <div className="flex justify-end gap-2">
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-logo hover:bg-darkPink cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : isEditing ? "Save Changes" : "Post Review"}
        </button>
      </div>
    </form>
  );
};

export default UserReviewForm;
