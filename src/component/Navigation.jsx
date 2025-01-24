import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/images/assets';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      {/* <div className="bg-black text-white text-center py-2 text-sm">
        Cyber Weekend is Here! Shop $9 Botox and $3.50 Dysport Now!
      </div> */}

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center relative">
              <img src={assets.logo} alt="The Black Rose" className="h-8" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/photography"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              Photography
            </NavLink>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              Lifestyle
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-white hover:text-white transition-colors duration-200 cursor-pointer relative'
                  : 'text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer relative'
              }
            >
              Contacts
            </NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <NavLink to="/cart" className="p-2 relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </NavLink>

            {/* Account */}
            <NavLink to="/account" className="p-2 relative">
              <svg
                className="w-5 h-5"
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
            </NavLink>

            {/* Shop Now Button */}
            <NavLink
              to="/shop"
              className="hidden md:block bg-white text-black px-6 py-2  hover:bg-gray-200 transition-colors relative"
            >
              Shop now
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
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
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2  space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/photography"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              Photography
            </NavLink>
            <NavLink
              to="/lifestyle"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              Lifestyle
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                  : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
              }
            >
              Contacts
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

// Add these styles to your CSS or Tailwind config
// const styles = `
//   .nav-NavLink {
//     @apply text-gray-600 hover:text-black transition-colors duration-200;
//   }

//   .mobile-nav-NavLink {
//     @apply block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50;
//   }
// `;

export default Navigation;
