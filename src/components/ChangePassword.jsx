import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { auth } from "../services/firebase";
import PasswordToggle from "./PasswordToggle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FormInput from "./FormInput";
import Button from "./Button";

const ChangePassword = ({ onClose, user }) => {
  //states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleField, setVisibleField] = useState(null);

  //mismatch
  const passwordMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMismatch) {
      toast.error("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated!");
      onClose();
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        toast.error("Current password is wrong");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Visibility icon
  const toggleVisibility = (field) => {
    setVisibleField((prev) => (prev === field ? null : field));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background relative w-full max-w-sm rounded-2xl p-6"
      >
        {/*Close button*/}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-logo mb-2 cursor-pointer text-sm font-semibold hover:font-black"
          >
            <CloseRoundedIcon />
          </button>
        </div>

        <h2 className="text-logo mb-4 text-center text-xl font-bold">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/*Current Password*/}
          <div className="relative">
            <FormInput
              type={visibleField === "current" ? "text" : "password"}
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full"
            />
            <PasswordToggle
              isVisible={visibleField === "current"}
              onToggle={() => toggleVisibility("current")}
            />
          </div>

          {/*New Password*/}
          <div className="relative">
            <FormInput
              type={visibleField === "new" ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full"
            />
            <PasswordToggle
              isVisible={visibleField === "new"}
              onToggle={() => toggleVisibility("new")}
            />
          </div>

          {/*Confirm Password*/}
          <div className="relative">
            <FormInput
              type={visibleField === "confirm" ? "text" : "password"}
              placeholder="Confirm new Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
            <PasswordToggle
              isVisible={visibleField === "confirm"}
              onToggle={() => toggleVisibility("confirm")}
            />
          </div>

          {/*If the passwords do not match */}
          {passwordMismatch && (
            <p className="text-darkPink -mt-2 text-xs">
              Passwords do not match.
            </p>
          )}

          {/*Submit button */}
          <Button
            type="submit"
            variant="primary"
            disabled={
              isLoading ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              passwordMismatch
            }
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
