const UserAvatar = ({ displayName, size = "sm" }) => {
  const initials = displayName
    ? displayName
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "?";

  const sizeClass = size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-sm";

  return (
    <div
      className={`bg-logo text-background flex items-center justify-center rounded-full font-bold ${sizeClass}`}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
