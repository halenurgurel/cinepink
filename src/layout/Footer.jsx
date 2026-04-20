import { Link } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
];

const Footer = () => {
  return (
    <footer className="bg-background mt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
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
              className="hover:text-logo text-sm no-underline transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-logo text-sm no-underline transition-colors"
          >
            TMDB
          </a>
        </nav>

        <p className="text-center text-xs">
          Made with{" "}
          <FavoriteIcon className="text-logo" style={{ fontSize: "0.9rem" }} />{" "}
          by{" "}
          <a
            href="https://www.linkedin.com/in/halenurgurel/"
            target="_blank"
            rel="noreferrer"
            className="text-logo hover:text-darkPink font-medium"
          >
            Halenur Gürel
          </a>
        </p>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CinePink — Powered by{" "}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className="hover:text-logo no-underline transition-colors"
        >
          TMDB
        </a>
      </div>
    </footer>
  );
};

export default Footer;
