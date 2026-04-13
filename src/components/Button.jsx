import { Link } from "react-router";

const variants = {
  hero: "bg-logo text-background rounded-full px-6 py-2.5 text-sm font-bold transition-opacity hover:opacity-80",
  primary:
    "bg-logo text-background hover:bg-darkPink cursor-pointer rounded py-2",
  card: "bg-logo text-background mt-1 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold",
  outline:
    "text-darkPink hover:bg-darkPink/10 rounded border border-current py-2 px-4",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  to,
  ...props
}) => {
  const classes = `cursor-pointer ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
export default Button;
