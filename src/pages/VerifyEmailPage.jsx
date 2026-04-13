import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../services/firebase";
import { toast } from "sonner";
import Button from "../components/Button";

const VerifyEmailPage = () => {
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  //resend handler
  const handleResend = async () => {
    setIsResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent!");
    } catch {
      toast.error("Failed to resend. Please try again");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-80 flex-col gap-4 p-10 text-center shadow-md">
        <h2 className="text-logo text-2xl font-bold">Verify your email</h2>
        <p className="text-sm text-gray-400">
          We sent a verification link to your email. Please check your inbox and
          click the link to continue.
        </p>
        <Button
          type="button"
          variant="primary"
          onClick={handleResend}
          disabled={isResending}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend Email"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};
export default VerifyEmailPage;
