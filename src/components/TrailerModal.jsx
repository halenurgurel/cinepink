import { useEffect, useState } from "react";
import Loader from "./Loader";
const TrailerModal = ({ trailerKey, onClose }) => {
  //loader
  const [isLoaded, setLoaded] = useState(false);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 cursor-pointer text-white hover:opacity-70"
        >
          ✕
        </button>
        {!isLoaded && <Loader />}
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          className="aspect-video w-[80vh]"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};
export default TrailerModal;
