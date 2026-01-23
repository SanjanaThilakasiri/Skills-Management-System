function Navbar() {
  return (
    <nav className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto  py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Skills Management System
              </h1>
              <p className="text-xs text-white text-opacity-80 mt-0.5">
                Smarter skills. Stronger teams.
              </p>
            </div>
          </div>
          
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;