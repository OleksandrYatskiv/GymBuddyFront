
import { useState, useEffect } from "react";
import { APP_ROUTES, AppName } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { login, register, resendConfirmation } from "../../api/auth";
import PasswordInput from "../ui/PasswordInput";
import { toast } from 'react-toastify';
import Button from "../ui/Button";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const action = isLogin ? "Login" : "Register";

  useEffect(() => {
    let interval: number;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLogin) {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        navigate(APP_ROUTES.HOME);
        toast.success('Login successful!');
      } else {
        await register(email, password);
        toast.success('Registration successful!');
        setShowConfirmation(true);
      }
    } catch (err) {
      toast.error('Authentication failed.');
      console.error("Authentication error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendConfirmationEmail = (email: string) => {
    try {
      resendConfirmation(email);
      setResendTimer(30);
      toast.success('Email has been sent.');
    } catch (err) {
      toast.error('Failed to resend confirmation email.');
      console.error("Resend confirmation failed:", err);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a confirmation email to{" "}
              <span className="font-medium text-gray-900">{email}</span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please check your inbox and click the confirmation link to activate your account.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the email?
              </p>
              <button
                onClick={() => resendConfirmationEmail(email)}
                disabled={resendTimer > 0}
                className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${resendTimer > 0
                    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                    : "text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend confirmation email"}
              </button>
            </div>

            <div className="text-center">
              <Link
                to={APP_ROUTES.LOGIN}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {action} to {AppName}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Button className="w-full" type="submit" isLoading={isSubmitting}>
              {action}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                to={isLogin ? APP_ROUTES.REGISTER : APP_ROUTES.LOGIN}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {isLogin ? "Register" : "Login"}
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}