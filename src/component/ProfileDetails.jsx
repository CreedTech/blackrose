// components/ProfileDetails.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileDetails = () => {
  const { user, updateProfile } = useContext(ShopContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await updateProfile(formData);
    
    if (success) {
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
    });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 xxx xxx xxxx"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
                loading
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <FaSave />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 border border-gray-600 rounded-lg hover:border-white transition"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="font-medium">{user?.name || 'Not provided'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="font-medium">{user?.phone || 'Not provided'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Date of Birth</p>
              <p className="font-medium">
                {user?.dateOfBirth 
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : 'Not provided'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Gender</p>
              <p className="font-medium capitalize">
                {user?.gender || 'Not provided'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="font-medium">
                {new Date(user?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <h4 className="font-semibold mb-4">Account Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user?.orderCount || 0}</p>
                <p className="text-sm text-gray-400">Total Orders</p>
              </div>
              <div className="bg-black p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user?.totalViews || 0}</p>
                <p className="text-sm text-gray-400">Photo Views</p>
              </div>
              <div className="bg-black p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user?.totalLikes || 0}</p>
                <p className="text-sm text-gray-400">Photo Likes</p>
              </div>
              <div className="bg-black p-4 rounded-lg text-center">
                <p className="text-2xl font-bold">{user?.wishlist?.length || 0}</p>
                <p className="text-sm text-gray-400">Wishlist Items</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;