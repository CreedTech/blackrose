// pages/Profile.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaUser, FaHeart, FaMapMarkerAlt, FaCog, FaBox } from 'react-icons/fa';
import ProfileDetails from '../component/ProfileDetails';
import Wishlist from '../component/Wishlist';
import AddressBook from '../component/AddressBook';
// import Preferences from '../components/Preferences';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Profile Details', icon: FaUser },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
    { id: 'addresses', label: 'Address Book', icon: FaMapMarkerAlt },
    { id: 'preferences', label: 'Preferences', icon: FaCog },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h2>
          <Link
            to="/login"
            className="bg-white text-black px-6 py-3 rounded-lg inline-block hover:bg-gray-200 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                <FaUser className="text-3xl text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/orders"
            className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition"
          >
            <FaBox className="text-2xl mb-2 text-blue-400" />
            <div className="text-2xl font-bold">{user.orderCount || 0}</div>
            <div className="text-sm text-gray-400">Total Orders</div>
          </Link>

          <div className="bg-gray-900 p-4 rounded-lg">
            <FaHeart className="text-2xl mb-2 text-red-400" />
            <div className="text-2xl font-bold">
              {user.wishlist?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Wishlist Items</div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <FaMapMarkerAlt className="text-2xl mb-2 text-green-400" />
            <div className="text-2xl font-bold">
              {user.addresses?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Saved Addresses</div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-2xl mb-2">📸</div>
            <div className="text-2xl font-bold">{user.totalViews || 0}</div>
            <div className="text-sm text-gray-400">Photo Views</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'details' && <ProfileDetails />}
            {activeTab === 'wishlist' && <Wishlist />}
            {activeTab === 'addresses' && <AddressBook />}
            {/* {activeTab === 'preferences' && <Preferences />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
