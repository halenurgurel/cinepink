import UserAvatar from "./UserAvatar";

const UserGreeting = ({ user, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hover:text-logo flex cursor-pointer items-center gap-2 text-gray-500"
    >
      <UserAvatar displayName={user.displayName} />
      <span className="text-sm font-semibold">
        Hello, {user.displayName?.split(" ")[0] || user.email}
      </span>
    </button>
  );
};

export default UserGreeting;
