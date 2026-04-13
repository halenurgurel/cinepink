import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "sonner";
import Button from "../components/Button";
import PasswordToggle from "../components/PasswordToggle";
import FormInput from "../components/FormInput";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: `${name} ${surname}`,
      });
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      toast.success("Verification email sent! Please check your inbox.");
      navigate("/verify-email");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("This e-mail address is already in use.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid e-mail address.");
          break;
        case "auth/weak-password":
          toast.error("The password should be 6 digits.");
          break;
        default:
          toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-100 flex-col gap-4 p-10 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold">Register</h2>

        <FormInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <FormInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <FormInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
          <PasswordToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
        </div>
        <Button type="submit" variant="primary">
          Register
        </Button>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-logo hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;
