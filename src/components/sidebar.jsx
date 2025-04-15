import { Link } from "react-router-dom";
import { Mountain, Map, User, LogOut, Search } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed top-0 left-0 z-40 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Resort Tracker</h2>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search resorts..."
          className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
      </div>

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
