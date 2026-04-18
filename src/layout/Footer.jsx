import { Link } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
];

const Footer = () => {
  return (
    <footer className="bg-background mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="cursor-pointer text-[1.8rem] font-black tracking-tighter no-underline transition-opacity duration-200 select-none hover:opacity-70"
        >
          Cine<span className="text-logo">Pink</span>
        </Link>

        <nav className="flex gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm hover:text-logo transition-colors no-underline"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:text-logo transition-colors no-underline"
          >
            TMDB
          </a>
        </nav>

        <p className="text-xs text-center">
          Made with{" "}
          <FavoriteIcon className="text-logo" style={{ fontSize: "0.9rem" }} />{" "}
          by <span className="text-logo font-medium">Halenur Gürel</span>
        </p>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} CinePink — Powered by{" "}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className="hover:text-logo transition-colors no-underline"
        >
          TMDB
        </a>
      </div>
    </footer>
  );
};

export default Footer;
