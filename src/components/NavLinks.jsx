import clsx from "clsx";
import { NavLink } from "react-router";

const navLink =
  "text-[1.1rem] font-medium tracking-wide no-underline transition-all duration-200";
const activeClass = "text-logo font-bold hover:text-darkPink";
const inactiveClass = "text-gray-500 hover:text-gray-900";
const links = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies", end: true },
];

const NavLinks = ({ onNavigate, className }) => {
  //Since we are using this component in two different view, we need to add className as property to use two different way of styles.
  return (
    <div className={className}>
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            clsx(navLink, isActive ? activeClass : inactiveClass)
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
