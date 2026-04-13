import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import Search from "../components/SearchBar";
import NavLinks from "../components/NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import UserDropdown from "../components/UserDropdown";
import MobileDrawer from "../components/MobileDrawer";
import UserGreeting from "../components/UserGreeting";

const Navigation = () => {
  //Mobile drawer open/closed status
  const [isOpen, setIsOpen] = useState(false);
  //Desktop user menu card on/off status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // User information from Firebase (if null, it means no one is logged in)
  const { user } = useAuth();
  const navigate = useNavigate();

  // Firebase logout process → redirect to login page
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="relative flex w-full items-center justify-between px-12 py-2">
      {/*Logo*/}
      <Link
        to="/"
        className="cursor-pointer text-[1.8rem] font-black tracking-tighter no-underline transition-opacity duration-200 select-none hover:opacity-70"
      >
        Cine<span className="text-logo">Pink</span>
      </Link>

      {/*Search Bar*/}
      <div>
        <Search />
      </div>

      {/*Navigation Links*/}
      <NavLinks className="hidden items-center gap-8 md:flex" />

      {/*Login and user buttons desktop */}
      <div className="relative z-50 hidden md:block">
        {user ? (
          <UserGreeting
            user={user}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        ) : (
          <Link
            to="/login"
            className="hover:text-logo cursor-pointer text-sm font-semibold text-gray-500"
          >
            Login
          </Link>
        )}
      </div>

      {/*Hamburger Menu  */}
      <button
        className="cursor-pointer md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="text-logo hover:text-darkPink" />
      </button>

      {/*Mobile Drawer*/}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Dropdown Menu */}
      {user && (
        <UserDropdown
          user={user}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navigation;
