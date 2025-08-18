import { useState } from "react";
import { NavLink } from "react-router-dom";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Styles for active links
  const linkClasses = ({ isActive }) =>
    `transition-colors duration-200 hover:scale-105 transform ease-in-out text-lg md:text-xl cursor-pointer 
     ${isActive ? "text-[#62929e] font-semibold" : "text-[#eef6f3] hover:text-[#62929e]"}`;

  return (
    
      <nav className="bg-[#546a7b] shadow-2xl rounded-3xl p-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center ">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-[#eef6f3] text-xl sm:text-2xl font-bold rounded-lg px-2 py-1"
          >
            AlgoHub
          </NavLink>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#eef6f3] focus:outline-none hover:text-[#c6c5b9] transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 text-sm md:text-base ${
                  isActive
                    ? "bg-[#62929e] text-[#eef6f3]"
                    : "bg-[#62929e] hover:bg-[#c6c5b9] text-[#eef6f3]"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `font-medium py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 text-sm md:text-base ${
                  isActive
                    ? "bg-[#c6c5b9] text-[#070109]"
                    : "bg-[#c6c5b9] hover:bg-[#62929e] text-[#070109]"
                }`
              }
            >
              Register
            </NavLink>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-3 p-4 bg-[#546a7b] rounded-xl border border-[#62929e]">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#62929e] text-[#eef6f3]"
                    : "bg-[#62929e] hover:bg-[#c6c5b9] text-[#eef6f3]"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `block font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#c6c5b9] text-[#070109]"
                    : "bg-[#c6c5b9] hover:bg-[#62929e] text-[#070109]"
                }`
              }
            >
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    
  );
}
