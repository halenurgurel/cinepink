import { Link } from "react-router";
import clsx from "clsx";
import CloseIcon from "@mui/icons-material/Close";
import NavLinks from "./NavLinks";
import UserAvatar from "./UserAvatar";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const MobileDrawer = ({ isOpen, onClose, user, onLogout }) => {
  return (
    <>
      {/*Overlay*/}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/*Drawer*/}
      <div
        className={clsx(
          "bg-background fixed top-0 right-0 z-50 flex h-full w-64 flex-col gap-8 shadow-xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/*Close button*/}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-logo hover:text-darkPink cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/*Nav links*/}
        <NavLinks onNavigate={onClose} className="flex flex-col gap-5 pl-3" />

        {/*User section*/}
        <div className="pl-3">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <UserAvatar displayName={user.displayName} />
                <span className="text-xs font-semibold text-gray-700">
                  Hello, {user.displayName?.split(" ")[0] || user.email}
                </span>
              </div>
              <Link
                to="/profile"
                onClick={onClose}
                className="hover:text-logo pl-4 text-sm text-gray-500"
              >
                <div className="flex items-center gap-4">
                  <Person2RoundedIcon className="text-logo hover:text-darkPink" />
                  My Profile
                </div>
              </Link>
              <Link
                to="/favorites"
                onClick={onClose}
                className="hover:text-logo pl-4 text-sm text-gray-500"
              >
                <div className="flex items-center gap-4">
                  <FavoriteRoundedIcon className="text-logo hover:text-darkPink" />
                  My Favorites
                </div>
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="hover:text-logo cursor-pointer pl-4 text-left text-sm text-gray-500"
              >
                <div className="flex items-center gap-4">
                  <LogoutRoundedIcon className="text-logo hover:text-darkPink" />
                  Logout
                </div>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="hover:text-logo cursor-pointer text-sm font-semibold text-gray-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
