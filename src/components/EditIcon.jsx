import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const EditIcon = ({ onEdit, isEditing }) => {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-500"
    >
      {isEditing ? (
        <CloseRoundedIcon fontSize="small" />
      ) : (
        <EditRoundedIcon fontSize="small" />
      )}
    </button>
  );
};
export default EditIcon;
