import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown, Menu, X, User } from "lucide-react";
import { Link, Links } from "react-router-dom";
import AuthContext from "../context/AuthContex";
import logo from "../assets/img/bida_logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logoutUser } = useContext(AuthContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt=""
              className="mr-3 mb-2 text-blue-600 h-12 w-12"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-8">
              <Link
                to={"/home-page"}
                className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to={"/payment"}
                className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Make Payment
              </Link>
              <a
                href="/contact"
                className="text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Link
                to={"/profile"}
                className="flex items-center text-slate-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <User size={20} className="mr-1" />
                Profile
              </Link>
            </div>

            {user ? (
              <Link
                onClick={logoutUser}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Log Out
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link
            to={"/home-page"}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
          >
            Home
          </Link>
          <a
            href="/payments"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
          >
            Make Payment
          </a>
          <a
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
          >
            Contact Us
          </a>
          <div className="mt-4">
            <a
              href="/login"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {user ? "Log Out " : "Login"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
