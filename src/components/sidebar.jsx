import { useState } from "react";
import { Link } from "react-router-dom";
import { Mountain, Map, User, LogOut, Search, Menu } from "lucide-react";
import Button from "./button";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[1000] p-2 bg-white rounded-md shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <aside className={`
        w-48 lg:w-64 bg-white h-screen shadow-lg fixed top-0 z-[999] flex flex-col p-4
        lg:pt-4 pt-16 transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Resort Tracker</h2>

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

        <Button 
          variant="danger"
          className="mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
        </Button>

      </aside>
    </>
  );
}