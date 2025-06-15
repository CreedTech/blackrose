import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const {
    setShowSearch,
    getCartCount,
    getCartAmount,
    navigate,
    token,
    setToken,
    setCartItems,
    cartItems,
    updateQuantity,
  } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/photography', label: 'Photography' },
    { to: '/lifestyle', label: 'Lifestyle' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contacts' },
  ];

  // const NavLinkComponent = ({ to, label, mobile = false, onClick }) => (
  //   <NavLink
  //     to={to}
  //     onClick={onClick}
  //     className={({ isActive }) =>
  //       mobile
  //         ? `block px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg ${
  //             isActive
  //               ? 'text-primary bg-gray-800 border-l-4 border-white font-bold'
  //               : 'text-gray-300 hover:text-white hover:bg-gray-800'
  //           }`
  //         : `relative transition-colors duration-200 hover:text-white ${
  //             isActive ? 'text-secondary font-bold' : 'text-primary'
  //           }`
  //     }
  //   >
  //     {label}
  //   </NavLink>
  // );
  const NavLinkComponent = ({ to, label, mobile = false, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        mobile
          ? `block px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg ${
              isActive
                ? 'text-light bg-gray-800 border-l-4 border-white font-bold'
                : 'text-primary hover:text-white hover:bg-gray-800 '
            }`
          : `relative  duration-200 hover:text-darker transition-all
           after:content-[''] after:absolute after:left-0 after:bottom-0 
           after:w-0 after:h-[2px] after:bg-white after:transition-all 
           after:duration-300 hover:after:w-full  ${
             isActive
               ? 'text-secondary font-bold'
               : 'text-primary hover:border-b-2 hover:border-black'
           }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <>
      {/* Main Navigation */}
      <nav className="w-full  sticky top-0 z-[999999]  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-8">
          {/* Mobile Header */}
          <div className="flex justify-between items-center h-16 z-[99999] bg-white shadow-md md:hidden ">
            {/* Left: Menu + Search */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-900 hover:text-primary hover:scale-150 transition-all duration-300 ease-out"
                aria-label="Toggle menu"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              {/* <button
                className="p-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => {
                  setShowSearch(true);
                  navigate('/collection');
                }}
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button> */}
            </div>

            {/* Center: Logo */}
            <NavLink to="/" className="flex-shrink-0">
              <img
                src={assets.logo}
                alt="The Black Rose"
                className="w-24 h-8 object-contain bg-black"
              />
            </NavLink>

            {/* Right: Cart + Account */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 text-gray-900 hover:text-primary hover:scale-150 transition-all duration-300 ease-out relative"
                aria-label="Cart"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {getCartCount() > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-light text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {getCartCount()}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => {
                    if (token) {
                      setShowDropdown(!showDropdown);
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="p-2 text-gray-900 hover:text-primary hover:scale-150 transition-all duration-300 ease-out"
                  aria-label="Account"
                >
                  <UserIcon className="w-6 h-6" />
                </button>

                {/* Mobile Account Dropdown */}
                {token && showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-main border border-gray-400 rounded-lg backdrop-blur-sm shadow-lg py-2 z-[999999] font-medium">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-primary  hover:bg-dark hover:text-light transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/orders');
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-primary   hover:bg-dark hover:text-light transition-colors"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-primary  hover:bg-dark hover:text-light transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <img
                  src={assets.logo}
                  alt="The Black Rose"
                  className="w-36 h-16 object-contain text-darker bg-darker"
                />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <NavLinkComponent
                  key={link.to}
                  to={link.to}
                  label={link.label}
                />
              ))}
            </div>

            {/* Desktop Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              {token && (
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="p-2 text-darker hover:text-dark transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute top-1 right-1 bg-darker text-light text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              )}

              {/* Account */}
              {token && (
                <div className="group relative">
                  <button
                    // onClick={() => !token && navigate('/login')}
                    onClick={() => {
                      if (token) {
                        setShowDropdown(!showDropdown);
                      } else {
                        navigate('/login');
                      }
                    }}
                    className="p-2 text-darker hover:text-dark transition-colors"
                    aria-label="Account"
                  >
                    <UserIcon className="w-5 h-5" />
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {token && (
                    <div className="group-hover:block hidden absolute right-0 top-full  w-48 bg-main border border-gray-400 rounded-lg backdrop-blur-sm shadow-lg py-2">
                      <button
                        onClick={() => navigate('/profile')}
                        className="block w-full text-left px-4 py-2 text-darker  hover:bg-dark hover:text-light transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate('/orders')}
                        className="block w-full text-left px-4 py-2 text-darker  hover:bg-dark hover:text-light transition-colors"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => navigate('/cart')}
                        className="block w-full text-left px-4 py-2 text-darker  hover:bg-dark hover:text-light transition-colors"
                      >
                        Cart
                      </button>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-darker  hover:bg-dark hover:text-light transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Shop Now Button */}
              <NavLink
                to="/shop"
                className="relative hidden xl:block px-6 py-2 rounded-lg overflow-hidden group font-medium border border-transparent hover:border-black transition-all duration-300 ease-in-out bg-black"
              >
                {/* Sliding white background */}
                <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0"></span>

                {/* Text content on top */}
                <span className="relative z-[9999] text-white group-hover:text-black transition-colors duration-300">
                  Shop now
                </span>
              </NavLink>
            </div>
          </div>

          {/* Tablet Navigation (md to lg) */}
          <div className="hidden md:flex lg:hidden justify-center py-4 border-t border-gray-800">
            <div className="flex items-center space-x-6">
              {navigationLinks.slice(0, 6).map((link) => (
                <NavLinkComponent
                  key={link.to}
                  to={link.to}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm shadow-lg z-[9999999] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 h-full w-80 bg-light rounded-lg shadow-lg z-[999999999] md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-300">
                  <img
                    src={assets.logo}
                    alt="The Black Rose"
                    className="w-24 h-8 object-contain bg-black"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-900 hover:text-primary hover:scale-150 transition-all duration-300 ease-out"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-6 space-y-2 font-medium">
                  {navigationLinks.map((link) => (
                    <NavLinkComponent
                      key={link.to}
                      to={link.to}
                      label={link.label}
                      mobile={true}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </div>

                {/* User Account Section */}
                {token && (
                  <div className="border-t border-gray-300 p-6 font-medium">
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-gray-900 hover:text-white hover:bg-gray-800 transition-all rounded-lg duration-300 ease-out"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/orders');
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-gray-900 hover:text-white hover:bg-gray-800 transition-all rounded-lg duration-300 ease-out"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all rounded-lg duration-300 ease-out"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}

                {/* Shop Now Button */}
                <div className="p-6 border-t border-gray-800 mb-10">
                  <NavLink
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-primary text-light text-center py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Shop Now
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-light rounded-lg  z-[99999] flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-300">
                <h2 className="text-lg font-bold text-primary">
                  My Cart ({Object.keys(cartItems).length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-900 hover:text-primary transition-colors"
                  aria-label="Close cart"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {Object.keys(cartItems).length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBagIcon className="w-16 h-16 text-gray-900 mx-auto mb-4" />
                    <p className="text-gray-800 text-lg mb-4">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="bg-primary text-light px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(cartItems).map(([productId, item]) => (
                      <div
                        key={productId}
                        className="flex gap-4 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-4 lg:p-6 mb-8 border border-gray-200 "
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-primary font-medium text-sm truncate">
                            {item.title}
                          </h3>
                          <p className="text-gray-900 text-xs mt-1 font-medium">
                            ₦{Number(item.finalPrice).toLocaleString()}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center space-x-2">
                              <button
                                className="w-8 h-8 flex items-center justify-center  border border-primary rounded text-primary hover:bg-primary font-medium hover:text-white transition-colors"
                                onClick={() =>
                                  updateQuantity(productId, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              <span className="text-primary w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 flex items-center justify-center  border border-primary rounded text-primary hover:bg-primary font-medium hover:text-white transition-colors"
                                onClick={() =>
                                  updateQuantity(productId, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                            <span className="text-primary font-semibold text-sm">
                              ₦
                              {Number(
                                item.finalPrice * item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {Object.keys(cartItems).length > 0 && (
                <div className="border-t border-gray-300 p-6">
                  <div className="flex justify-between text-white text-lg font-semibold mb-4">
                    <span>Subtotal:</span>
                    <span>₦{Number(getCartAmount()).toLocaleString()}</span>
                  </div>
                  <button
                    className="w-full bg-primary text-light py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
