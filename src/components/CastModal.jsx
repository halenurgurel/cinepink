import { useEffect } from "react";
import { TMDB_IMG_BASE_URL_W300, DEFAULT_AVATAR } from "../constants/tmdb";
import { Link } from "react-router";

const CastModal = ({ cast, onClose }) => {
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
        className="bg-background ring-logo/20 relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-5 ring-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-logo text-sm font-black tracking-widest uppercase">
            Full Cast <span className="text-logo/50 ml-2">({cast.length})</span>
          </h1>
          <button
            className="text-logo cursor-pointer hover:opacity-70"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {cast?.length > 0 && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6">
            {cast.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <Link to={`/person/${c.id}`}>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <img
                      src={
                        c.profile_path
                          ? `${TMDB_IMG_BASE_URL_W300}${c.profile_path}`
                          : DEFAULT_AVATAR
                      }
                      alt={c.name}
                      className="ring-logo/30 h-20 w-20 rounded-full object-cover ring-2"
                    />
                    <span className="w-20 text-xs font-medium">{c.name}</span>
                    <span className="w-20 text-xs font-medium text-gray-400">
                      {c.character}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastModal;
