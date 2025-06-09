/* eslint-disable react/prop-types */
// pages/Profile.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { 
  FaUser, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaCog, 
  FaBox, 
  FaEye,
  FaSignOutAlt,
  FaEdit,
  FaCalendar,
  FaEnvelope,
  FaPhone
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
    { id: 'addresses', label: 'Address Book', icon: FaMapMarkerAlt, color: 'green' },
    // { id: 'preferences', label: 'Preferences', icon: FaCog, color: 'purple' },
  ];

  const quickStats = [
    {
      icon: FaBox,
      value: user?.orderCount || 0,
      label: 'Total Orders',
      color: 'blue',
      link: '/orders'
    },
    {
      icon: FaHeart,
      value: user?.wishlist?.length || 0,
      label: 'Wishlist Items',
      color: 'red'
    },
    {
      icon: FaMapMarkerAlt,
      value: user?.addresses?.length || 0,
      label: 'Saved Addresses',
      color: 'green'
    },
    {
      icon: FaEye,
      value: user?.totalViews || 0,
      label: 'Photo Views',
      color: 'yellow'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      red: 'text-red-400 bg-red-400/10 border-red-400/20',
      green: 'text-green-400 bg-green-400/10 border-green-400/20',
      purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="text-3xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h2>
          <p className="text-gray-400 mb-6">
            Access your orders, wishlist, and account settings
          </p>
          <Link
            to="/login"
            className="bg-white text-black px-8 py-3 rounded-lg inline-block hover:bg-gray-200 transition-colors font-medium"
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
          flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left w-full
          ${mobile ? 'justify-start' : 'justify-center md:justify-start'}
          ${isActive 
            ? 'bg-gray-800 text-white shadow-lg' 
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }
        `}
      >
        <Icon className={`${isActive ? getColorClasses(tab.color).split(' ')[0] : ''}`} />
        <span className={mobile ? 'block' : 'hidden md:block'}>{tab.label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 lg:p-8 mb-8 border border-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center ring-4 ring-gray-700">
                  <FaUser className="text-2xl lg:text-3xl text-gray-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaEnvelope className="text-sm" />
                  <span className="text-sm lg:text-base">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaCalendar className="text-sm" />
                  <span className="text-xs lg:text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm">
                <FaEdit />
                <span className="hidden sm:inline">Edit Profile</span>
              </button> */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 hover:border-red-500 transition-all text-sm"
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color);
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`
                  bg-gray-900 border ${colorClasses.split(' ')[2]} rounded-xl p-4 lg:p-6 
                  ${stat.link ? 'cursor-pointer hover:bg-gray-800' : ''}
                  transition-all duration-200
                `}
                {...(stat.link && {
                  onClick: () => window.location.href = stat.link
                })}
              >
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center mb-3`}>
                  <Icon className="text-xl" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
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
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Account Menu</h3>
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
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 w-full"
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
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 z-50 lg:hidden"
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
            <div className="bg-gray-900 rounded-xl border border-gray-700 min-h-[600px]">
              {/* Content Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentTab = tabs.find(tab => tab.id === activeTab);
                    const Icon = currentTab?.icon || FaUser;
                    return (
                      <>
                        <div className={`w-10 h-10 rounded-lg ${getColorClasses(currentTab?.color || 'blue')} flex items-center justify-center`}>
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
                    {activeTab === 'preferences' && (
                      <div className="text-center py-12">
                        <FaCog className="text-4xl text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Preferences</h3>
                        <p className="text-gray-400">Coming soon...</p>
                      </div>
                    )}
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