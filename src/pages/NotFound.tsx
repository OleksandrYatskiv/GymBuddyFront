import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
