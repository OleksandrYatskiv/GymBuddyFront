import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants/constants";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Button from "../components/ui/Button";

export default function EmailConfirmed() {
  useEffect(() => {
    toast.success('Email confirmed successfully!');
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Email confirmed!
        </h1>
        <p className="text-gray-700 mb-6">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link
          to={APP_ROUTES.LOGIN}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
        <Link
          to={APP_ROUTES.LOGIN}
        >
          <Button>Go to Login</Button>
        </Link>
        <Button variant="secondary">Go to Login</Button>
        <Button variant="danger">Go to Login</Button>
      </div>
    </div>
  );
}
