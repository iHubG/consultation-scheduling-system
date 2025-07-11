import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; // Icon from lucide-react

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const handleLogout = () => {
    // Clear auth tokens/session here
    navigate('/login');
  };

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0 font-bold text-xl cursor-pointer">
            <Link to="/student/dashboard">ConsultSched</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-8">
            <Link
              to="/student/dashboard"
              className="hover:text-purple-300"
            >
              Dashboard
            </Link>
            <Link
              to="/student/schedule"
              className="hover:text-purple-300"
            >
              Schedule
            </Link>
            <Link
              to="/student/status"
              className="hover:text-purple-300"
            >
              Status
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
              >
                <User className="w-6 h-6" />
                <span className="hidden sm:inline">Profile</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-auto bg-white text-gray-700 rounded-md shadow-lg py-2 px-2 z-20">
                  <Link
                    to="/student/profile"
                    className="block px-4 py-2 hover:bg-purple-100 rounded text-nowrap"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/student/change-password"
                    className="block px-4 py-2 hover:bg-purple-100 rounded text-nowrap"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 rounded cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-600 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/student/dashboard"
            className="block px-3 py-2 rounded hover:bg-purple-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/student/schedule"
            className="block px-3 py-2 rounded hover:bg-purple-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Schedule
          </Link>
          <Link
            to="/student/status"
            className="block px-3 py-2 rounded hover:bg-purple-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Status
          </Link>
          <Link
            to="/student/profile"
            className="block px-3 py-2 rounded hover:bg-purple-500 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
           <Link
            to="/student/change-password"
            className="block px-3 py-2 rounded hover:bg-purple-500 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Change Password
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-3 py-2 rounded hover:bg-purple-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
