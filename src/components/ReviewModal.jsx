import { useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ReviewModal = ({ review, onClose }) => {
  //closing modal with esc
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background ring-logo/20 relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 ring-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            className="text-logo mb-2 cursor-pointer text-sm font-semibold hover:font-black"
            onClick={onClose}
          >
            <CloseRoundedIcon />
          </button>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-logo font-semibold">{review.author}</span>
          <span className="text-xs text-gray-400">
            {review.created_at.split("T")[0].split("-").reverse().join("/")}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          {review.content}
        </p>
      </div>
    </div>
  );
};
export default ReviewModal;
