import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { Mountain, Map, User, LogOut, Search, Menu, Images } from "lucide-react";
import Button from "./button";
import { useResorts } from "../context/resortContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [_, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { resorts } = useResorts();

  // Debounced search

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSearching(true);
      const filtered = resorts.filter(resort => 
        resort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resort.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(searchTerm.trim() ? filtered : resorts);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, resorts]);

  const handleResortSelect = (resort) => {
    navigate('/');
    // Using a more specific event name
    const event = new CustomEvent('map:centerOnResort', { 
      detail: { 
        position: resort.position,
        resortId: resort.id 
      }
    });
    window.dispatchEvent(event);
    setSearchTerm("");
    setShowResults(false);
  };

  const navLinkClass = ({ isActive }) => {
    const baseClass = "flex items-center gap-3 transition";
    return isActive 
      ? `${baseClass} text-blue-600 font-medium`
      : `${baseClass} text-gray-700 hover:text-blue-600`;
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[3] p-2 bg-white rounded-md shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <aside className={`
        w-48 lg:w-64 bg-white h-screen shadow-lg fixed top-0 z-[2] flex flex-col p-4
        lg:pt-4 pt-16 transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Resort Tracker</h2>

        <div className="relative mb-4" ref={searchRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowResults(true)}
            placeholder="Search resorts..."
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
          
          {showResults && searchResults.length > 0 && (
            <div className="absolute w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-10">
              {searchResults.map((resort) => (
                <button
                  key={resort.id}
                  onClick={() => handleResortSelect(resort)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Mountain className="w-4 h-4" />
                  {resort.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        

        <nav className="flex-1 space-y-4">
          <NavLink to="/" className={navLinkClass}>
            <Map className="w-5 h-5" />
            Map Overview
          </NavLink>

          <NavLink to="/visited" className={navLinkClass}>
            <Mountain className="w-5 h-5" />
            Visited Resorts
          </NavLink>

          <NavLink to="/gallery" className={navLinkClass}>
            <Images className="w-5 h-5" />
            Gallery
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            <User className="w-5 h-5" />
            Profile
          </NavLink>
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