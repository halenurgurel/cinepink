import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordToggle = ({ isVisible, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-500"
    >
      {isVisible ? (
        <VisibilityOffIcon fontSize="small" />
      ) : (
        <VisibilityIcon fontSize="small" />
      )}
    </button>
  );
};
export default PasswordToggle;
