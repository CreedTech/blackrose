/* eslint-disable react/prop-types */
// pages/Profile.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import {
  FaUser,
  FaHeart,
  FaMapMarkerAlt,
  FaBox,
  FaEye,
  FaSignOutAlt,
  FaCalendar,
  FaEnvelope,
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import ProfileDetails from '../component/ProfileDetails';
import Wishlist from '../component/Wishlist';
import AddressBook from '../component/AddressBook';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('details');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabs = [
    { id: 'details', label: 'Profile Details', icon: FaUser, color: 'blue' },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart, color: 'red' },
    {
      id: 'addresses',
      label: 'Address Book',
      icon: FaMapMarkerAlt,
      color: 'green',
    },
    // { id: 'preferences', label: 'Preferences', icon: FaCog, color: 'purple' },
  ];

  const quickStats = [
    {
      icon: FaBox,
      value: user?.orderCount || 0,
      label: 'Total Orders',
      color: 'blue',
      link: '/orders',
    },
    {
      icon: FaHeart,
      value: user?.wishlist?.length || 0,
      label: 'Wishlist Items',
      color: 'red',
    },
    {
      icon: FaMapMarkerAlt,
      value: user?.addresses?.length || 0,
      label: 'Saved Addresses',
      color: 'green',
    },
    {
      icon: FaEye,
      value: user?.totalViews || 0,
      label: 'Photo Views',
      color: 'yellow',
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      red: 'text-red-400 bg-red-400/10 border-red-400/20',
      green: 'text-green-400 bg-green-400/10 border-green-400/20',
      purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!user) {
    return (
      <div className="min-h-screen  text-primary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="text-3xl text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h2>
          <p className="text-gray-700 mb-6">
            Access your orders, wishlist, and account settings
          </p>
          <Link
            to="/login"
            className="bg-primary text-light px-8 py-3 rounded-lg inline-block hover:bg-gray-200 transition-colors font-medium"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    );
  }

  const TabButton = ({ tab, isActive, onClick, mobile = false }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-all duration-200 text-left w-full
          ${mobile ? 'justify-start' : 'justify-center md:justify-start'}
          ${
            isActive
              ? 'bg-gray-800 text-white shadow-lg'
              : 'text-gray-600 hover:text-white hover:bg-gray-800/50'
          }
        `}
      >
        <Icon
          className={`${
            isActive ? getColorClasses(tab.color).split(' ')[0] : ''
          }`}
        />
        <span className={mobile ? 'block' : 'hidden md:block'}>
          {tab.label}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen  text-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center ring-4 ring-white shadow-inner">
                  <FaUser className="text-2xl lg:text-3xl text-gray-700" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-sm" />
                  <span className="text-sm lg:text-base">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaCalendar className="text-sm" />
                  <span className="text-xs lg:text-sm">
                    Member since{' '}
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all text-sm"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 font-medium"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color);

            // bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`
                  bg-gradient-to-r from-white via-gray-50 to-white border shadow-md ${
                    colorClasses.split(' ')[2]
                  } rounded-xl p-4 lg:p-6 
                  ${stat.link ? 'cursor-pointer hover:bg-gray-800' : ''}
                  transition-all duration-200
                `}
                {...(stat.link && {
                  onClick: () => (window.location.href = stat.link),
                })}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center mb-3`}
                >
                  <Icon className="text-xl" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-900">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block lg:col-span-1"
          >
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200 shadow-md sticky top-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Account Menu
              </h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <div className="lg:hidden md:mb-6">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 md:mb-8 border border-gray-200 shadow-sm w-full hover:text-primary font-medium"
            >
              <HiMenu />
              <span>Menu</span>
            </button>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm shadow-lg z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed left-0 top-0 h-full w-80 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 md:mb-8 border border-gray-200 shadow-sm  z-50 lg:hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Account Menu</h3>
                      <button
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <HiX />
                      </button>
                    </div>
                    <nav className="space-y-2">
                      {tabs.map((tab) => (
                        <TabButton
                          key={tab.id}
                          tab={tab}
                          isActive={activeTab === tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileSidebarOpen(false);
                          }}
                          mobile={true}
                        />
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200 shadow-md min-h-[600px]">
              {/* Content Header */}
              <div className="p-6 border-b border-gray-300">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentTab = tabs.find((tab) => tab.id === activeTab);
                    const Icon = currentTab?.icon || FaUser;
                    return (
                      <>
                        <div
                          className={`w-10 h-10 rounded-lg ${getColorClasses(
                            currentTab?.color || 'blue'
                          )} flex items-center justify-center`}
                        >
                          <Icon />
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold">
                          {currentTab?.label || 'Profile Details'}
                        </h2>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'details' && <ProfileDetails />}
                    {activeTab === 'wishlist' && <Wishlist />}
                    {activeTab === 'addresses' && <AddressBook />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
