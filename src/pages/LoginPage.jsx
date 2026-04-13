import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { auth } from "../services/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "sonner";
import Button from "../components/Button";
import PasswordToggle from "../components/PasswordToggle";
import FormInput from "../components/FormInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (!auth.currentUser.emailVerified) {
        toast.error("Please verify your email before logging in.");
        navigate("/verify-email");
        return;
      }
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
          toast.error("Email or password is wrong.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid e-mail address");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again.");
          break;
        default:
          toast.error("Login failed. Please try again");
      }
    }
  };

  //forgot password handler
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-100 flex-col gap-4 p-10 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold">Login</h2>

        {/*Email input*/}
        <FormInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/*Forgot Password*/}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-logo hover:text-darkPink -mt-3 cursor-pointer text-xs"
          >
            Forgot Password?
          </button>
        </div>

        {/*Password input*/}
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
          Login
        </Button>
        <p className="text-center text-sm text-gray-400">
          Don't have an account? {""}{" "}
          <Link to="/register" className="text-logo hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
