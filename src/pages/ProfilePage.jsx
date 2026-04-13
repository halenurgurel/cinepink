import { useState } from "react";
import { updateProfile, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import ChangePassword from "../components/ChangePassword";
import EditIcon from "../components/EditIcon";
import UserAvatar from "../components/UserAvatar";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const ProfilePage = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [firstName, lastName] = user?.displayName?.split(" ") ?? ["", ""];
  const [name, setName] = useState(firstName);
  const [surname, setSurname] = useState(lastName);

  //EditIcon state
  const [isEditing, setIsEditing] = useState(false);

  const originalName = firstName;
  const originalSurname = lastName;

  //check whether there is a change or not
  const isDirty = name !== originalName || surname !== originalSurname;

  //edit handler
  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      setName(originalName);
      setSurname(originalSurname);
    } else {
      setIsEditing(true);
    }
  };

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: `${name} ${surname}`,
      });
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //logout handler
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-90 flex-col gap-4 p-10 shadow-md"
      >
        {/*Avatar*/}
        <div className="mx-auto">
          <UserAvatar displayName={user?.displayName} size="lg" />
        </div>

        <h2 className="text-logo text-center text-2xl font-bold">Profile</h2>
        <p className="text-center text-sm text-gray-400">{user?.email}</p>

        {/*Name input*/}
        <label htmlFor="name" className="text-sm font-medium text-gray-600">
          Name
        </label>
        <div className="relative">
          <FormInput
            id="name"
            type="text"
            placeholder={firstName || "Enter your name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!isEditing}
            className="w-full disabled:text-gray-500"
          />
          <EditIcon isEditing={isEditing} onEdit={handleEditToggle} />
        </div>

        {/*Surname input*/}
        <label htmlFor="surname" className="text-sm font-medium text-gray-600">
          Surname
        </label>
        <div className="relative">
          <FormInput
            id="surname"
            type="text"
            placeholder={lastName || "Enter your surname"}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            disabled={!isEditing}
            className="w-full disabled:text-gray-500"
          />
          <EditIcon isEditing={isEditing} onEdit={handleEditToggle} />
        </div>

        {/*Save changes Button*/}
        <Button
          type="submit"
          variant="primary"
          disabled={!isDirty || isLoading || !isEditing}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>

        {/*Reset password*/}
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Change Password
        </Button>

        {/*Logout*/}
        <Button type="button" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </form>

      {/*Change Password Modal*/}
      {isPasswordModalOpen && (
        <ChangePassword
          onClose={() => setIsPasswordModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};
export default ProfilePage;
