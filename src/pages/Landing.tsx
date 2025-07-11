import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Fit with GymBuddy</h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
        Your personal fitness companion. Track workouts, monitor progress, and stay motivated.
      </p>
      <Link to="/login">
        <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
}
