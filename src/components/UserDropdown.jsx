import { Link } from "react-router";
import clsx from "clsx";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const UserDropdown = ({ user, isOpen, onClose, onLogout }) => {
  return (
    <>
      {/*Overlay */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 cursor-pointer transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/*Dropdown card*/}
      <div
        className={clsx(
          "bg-background fixed top-16 right-4 z-50 flex w-56 origin-top-right flex-col gap-3 rounded-xl border border-gray-100 p-4 shadow-xl transition-all duration-200",
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {/*User name and email*/}
        <div className="border-b border-gray-100 pb-3">
          <p className="text-sm font-semibold">{user.displayName || "User"}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        {/*Go to profile page*/}
        <Link
          to="/profile"
          onClick={onClose}
          className="hover:text-logo text-sm text-gray-500"
        >
          <div className="flex items-center gap-3">
            <Person2RoundedIcon className="text-logo hover:text-darkPink" />
            My Profile
          </div>
        </Link>

        {/*Favorites*/}
        <Link
          to="/favorites"
          onClick={onClose}
          className="hover:text-logo text-sm text-gray-500"
        >
          <div className="flex items-center gap-3">
            <FavoriteRoundedIcon className="text-logo hover:text-darkPink" />
            My Favorites
          </div>
        </Link>

        {/*My Reviews*/}
        <Link
          to="/reviews"
          onClick={onClose}
          className="hover:text-logo text-sm text-gray-500"
        >
          <div className="flex items-center gap-3">
            <RateReviewRoundedIcon className="text-logo hover:text-darkPink" />
            My Reviews
          </div>
        </Link>

        {/*Logout*/}
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="hover:text-logo cursor-pointer text-left text-sm text-gray-500"
        >
          <div className="flex items-center gap-3">
            <LogoutRoundedIcon className="text-logo hover:text-darkPink" />
            Logout
          </div>
        </button>
      </div>
    </>
  );
};
export default UserDropdown;
