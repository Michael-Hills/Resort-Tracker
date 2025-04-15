function Navbar() {
  return (
    <nav className="bg-sky-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-sky-900 text-xl font-bold">Resort Tracker</h1>
        <div className="flex items-center space-x-4">
          <a href="/" className="text-sky-700 hover:text-gray-900">Map</a>
          <a href="/resorts" className="text-sky-700 hover:text-gray-900">Resorts</a>
          <button 
            className="w-10 h-10 rounded-full bg-sky-200 hover:bg-gray-300 flex items-center justify-center"
            aria-label="Profile"
          >
            <svg 
              className="w-6 h-6 text-sky-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar