import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    setShowSearch,
    // getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 mt-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex justify-between items-center"
          >
            <div>
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 "
              >
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
              {/* Search */}
              <button
                className="p-2 md:hidden"
                onClick={() => {
                  setShowSearch(true);
                  navigate('/collection');
                }}
              >
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
            </div>
            <NavLink to="/" className="  md:hidden items-center relative">
              <img
                src={assets.logo}
                alt="The Black Rose"
                className="w-16 h-8"
              />
            </NavLink>
            <div>
              {/* Cart */}
              <NavLink to="/cart" className="p-2 relative  md:hidden">
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
              <NavLink
                to={token ? null : '/login'}
                // onClick={() => (token ? null : navigate('/login'))}
                className="p-2 relative cursor-pointer  md:hidden"
              >
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
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className=" hidden md:flex items-center relative">
              <img
                src={assets.logo}
                alt="The Black Rose"
                className="w-36 h-16"
              />
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
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button
              className="p-2"
              onClick={() => {
                setShowSearch(true);
                navigate('/collection');
              }}
            >
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
            <NavLink to="/cart" className="p-2 relative ">
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
            <div className="group relative">
              <NavLink
                to={token ? null : '/login'}
                // onClick={() => (token ? null : navigate('/login'))}
                className="p-2 relative cursor-pointer  "
              >
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
              {/* Dropdown Menu */}
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 ">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
                    {/* <p className='cursor-pointer hover:text-black'>My Profile</p> */}
                    {/* <p
                      onClick={() => navigate('/orders')}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p> */}
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Shop Now Button */}
            <NavLink
              to="/shop"
              className="hidden md:block bg-white text-black px-6 py-2  hover:bg-gray-200 transition-colors relative"
            >
              Shop now
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black  p-6 z-[9999999999999999]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 mb-5"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="px-2 pt-2  space-y-1 relative mt-10">
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
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 text-base font-medium text-gray-600  bg-gray-50 cursor-pointer relative'
                    : 'block px-3 py-2 text-base font-medium text-gray-600  cursor-pointer relative'
                }
              >
                Contacts
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
