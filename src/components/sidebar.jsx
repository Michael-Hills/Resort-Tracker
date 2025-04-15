import { Link } from "react-router-dom";
import { Mountain, Map, User, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed top-0 left-0 z-40 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Resort Tracker</h2>

      <nav className="flex-1 space-y-4">
        <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
          <Map className="w-5 h-5" />
          Map View
        </Link>

        <Link to="/profile" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
          <User className="w-5 h-5" />
          My Profile
        </Link>

        <Link to="/visited" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
          <Mountain className="w-5 h-5" />
          Visited Resorts
        </Link>
      </nav>

      <button className="flex items-center gap-2 text-red-500 hover:text-red-600 mt-auto">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
}
