// // components/ProfileDetails.jsx
// import { useState, useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
// import { toast } from 'react-toastify';

// const ProfileDetails = () => {
//   const { user, updateProfile } = useContext(ShopContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     dateOfBirth: user?.dateOfBirth || '',
//     gender: user?.gender || '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const success = await updateProfile(formData);

//     if (success) {
//       setIsEditing(false);
//       toast.success('Profile updated successfully');
//     }

//     setLoading(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user?.name || '',
//       email: user?.email || '',
//       phone: user?.phone || '',
//       dateOfBirth: user?.dateOfBirth || '',
//       gender: user?.gender || '',
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6 relative">
//         <h3 className="text-xl font-semibold">Personal Information</h3>
//         {!isEditing && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
//           >
//             <FaEdit /> Edit
//           </button>
//         )}
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl relative">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm text-gray-400 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-400 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 disabled
//                 className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Email cannot be changed
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm text-gray-400 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+234 xxx xxx xxxx"
//                 className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-400 mb-2">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-400 mb-2">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//                 <option value="prefer-not-to-say">Prefer not to say</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
//                 loading
//                   ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                   : 'bg-white text-black hover:bg-gray-200'
//               }`}
//             >
//               <FaSave />
//               {loading ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex items-center gap-2 px-6 py-2 border border-gray-600 rounded-lg hover:border-white transition"
//             >
//               <FaTimes />
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-4 max-w-2xl">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <p className="text-sm text-gray-400">Full Name</p>
//               <p className="font-medium">{user?.name || 'Not provided'}</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-400">Email Address</p>
//               <p className="font-medium">{user?.email}</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-400">Phone Number</p>
//               <p className="font-medium">{user?.phone || 'Not provided'}</p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-400">Date of Birth</p>
//               <p className="font-medium">
//                 {user?.dateOfBirth
//                   ? new Date(user.dateOfBirth).toLocaleDateString()
//                   : 'Not provided'}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-400">Gender</p>
//               <p className="font-medium capitalize">
//                 {user?.gender || 'Not provided'}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-400">Member Since</p>
//               <p className="font-medium">
//                 {new Date(user?.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </p>
//             </div>
//           </div>

//           {/* Account Stats */}
//           <div className="mt-8 pt-8 border-t border-gray-800">
//             <h4 className="font-semibold mb-4">Account Statistics</h4>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="bg-black p-4 rounded-lg text-center">
//                 <p className="text-2xl font-bold">{user?.orderCount || 0}</p>
//                 <p className="text-sm text-gray-400">Total Orders</p>
//               </div>
//               <div className="bg-black p-4 rounded-lg text-center">
//                 <p className="text-2xl font-bold">{user?.totalViews || 0}</p>
//                 <p className="text-sm text-gray-400">Photo Views</p>
//               </div>
//               <div className="bg-black p-4 rounded-lg text-center">
//                 <p className="text-2xl font-bold">{user?.totalLikes || 0}</p>
//                 <p className="text-sm text-gray-400">Photo Likes</p>
//               </div>
//               <div className="bg-black p-4 rounded-lg text-center">
//                 <p className="text-2xl font-bold">{user?.wishlist?.length || 0}</p>
//                 <p className="text-sm text-gray-400">Wishlist Items</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDetails;

// components/ProfileDetails.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const ProfileDetails = () => {
  const { user, updateProfile, changePassword } = useContext(ShopContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    gender: user?.gender || '',
    bio: user?.bio || '',
    preferences: {
      emailNotifications: user?.preferences?.emailNotifications ?? true,
      smsNotifications: user?.preferences?.smsNotifications ?? false,
      marketingEmails: user?.preferences?.marketingEmails ?? true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await updateProfile(formData);

    if (success) {
      setIsEditing(false);
    }

    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword) {
      toast.error('Current password is required');
      return false;
    }

    if (!passwordData.newPassword) {
      toast.error('New password is required');
      return false;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setPasswordLoading(true);

    const success = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    });

    if (success) {
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }

    setPasswordLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      gender: user?.gender || '',
      bio: user?.bio || '',
      preferences: {
        emailNotifications: user?.preferences?.emailNotifications ?? true,
        smsNotifications: user?.preferences?.smsNotifications ?? false,
        marketingEmails: user?.preferences?.marketingEmails ?? true,
      },
    });
    setIsEditing(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="">
      {/* Profile Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <div className="flex gap-3">
            {!isEditing && (
              <>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-light bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  <FaLock />
                  Change Password
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-primary hover:text-blue-300 transition-colors"
                >
                  <FaEdit /> Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6 max-w-4xl relative font-medium"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-light border border-gray-400 text-primary rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-700 mt-1">
                  Email cannot be changed for security reasons
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 xxx xxx xxxx"
                  className="w-full px-4 py-3 bg-light border border-gray-400 text-primary rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light border border-gray-400 text-primary rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light border border-gray-400 text-primary rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 bg-light border border-gray-400 rounded-lg focus:outline-none focus:border-primary text-primary transition-colors resize-none"
              />
              <p className="text-xs text-gray-800 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Preferences */}
            {/* <div>
              <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
              <div className="space-y-3">
                              <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="preferences.emailNotifications"
                    checked={formData.preferences.emailNotifications}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Email notifications for orders and updates</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="preferences.smsNotifications"
                    checked={formData.preferences.smsNotifications}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">SMS notifications for order updates</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="preferences.marketingEmails"
                    checked={formData.preferences.marketingEmails}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">Marketing emails and promotions</span>
                </label>
              </div>
            </div> */}

            <div className="flex gap-4 pt-6 border-t border-gray-300">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  loading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-light hover:bg-gray-900 shadow-lg hover:shadow-xl'
                }`}
              >
                <FaSave />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:border-white text-primary transition-colors"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 max-w-4xl"
          >
            {/* Personal Information Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </p>
                  <p className="text-lg">{user?.name || 'Not provided'}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </p>
                  <p className="text-lg">{user?.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </p>
                  <p className="text-lg">{user?.phone || 'Not provided'}</p>
                  {user?.phone && (
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          user?.isPhoneVerified
                            ? 'bg-green-900 text-green-400'
                            : 'bg-yellow-900 text-yellow-400'
                        }`}
                      >
                        {user?.isPhoneVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Date of Birth
                  </p>
                  <p className="text-lg">
                    {user?.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Not provided'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Gender
                  </p>
                  <p className="text-lg capitalize">
                    {user?.gender?.replace('-', ' ') || 'Not provided'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </p>
                  <p className="text-lg">
                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            {user?.bio && (
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">Bio</p>
                <p className="text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-lg">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Preferences Section */}
            {/* <div>
              <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user?.preferences?.emailNotifications 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-red-900 text-red-400'
                    }`}>
                      {user?.preferences?.emailNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user?.preferences?.smsNotifications 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-red-900 text-red-400'
                    }`}>
                      {user?.preferences?.smsNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marketing Emails</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user?.preferences?.marketingEmails 
                        ? 'bg-green-900 text-green-400' 
                        : 'bg-red-900 text-red-400'
                    }`}>
                      {user?.preferences?.marketingEmails ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Account Statistics */}
            <div className="border-t border-gray-700 pt-8">
              <h4 className="text-lg font-medium mb-6">Account Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-800/30 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {user?.orderCount || 0}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">Total Orders</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-800/30 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-400">
                    {user?.totalViews || 0}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">Photo Views</p>
                </div>
                <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-800/30 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-red-400">
                    {user?.likedPhotos.length || 0}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">Photo Likes</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-800/30 p-6 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {user?.wishlist?.length || 0}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">Wishlist Items</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center "
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-light border border-primary/50 rounded-xl p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Change Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 pr-12 bg-light border border-gray-400 rounded-lg focus:outline-none focus:border-primary text-primary transition-colors"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-primary transition-colors"
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 pr-12 bg-light border border-gray-400 rounded-lg focus:outline-none focus:border-primary text-primary transition-colors"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-primary transition-colors"
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 pr-12 bg-light border border-gray-400 rounded-lg focus:outline-none focus:border-primary text-primary transition-colors"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-primary transition-colors"
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Password strength indicator */}
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-800 mb-1">
                      Password strength:
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => {
                        const strength =
                          passwordData.newPassword.length >= 6
                            ? passwordData.newPassword.length >= 8
                              ? passwordData.newPassword.match(
                                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
                                )
                                ? 4
                                : 3
                              : 2
                            : 1;
                        return (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded ${
                              i < strength
                                ? strength === 1
                                  ? 'bg-red-500'
                                  : strength === 2
                                  ? 'bg-yellow-500'
                                  : strength === 3
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                                : 'bg-gray-800'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                {passwordData.newPassword && (
                  <PasswordStrengthMeter password={passwordData.newPassword} />
                )}
                {/* <div className="text-gray-600 text-sm space-y-1">
                  <p className="font-medium">Password must contain:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                  </ul>
                </div> */}

                <div className="flex gap-3 pt-6">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      passwordLoading
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-light hover:bg-gray-800'
                    }`}
                  >
                    <FaLock />
                    {passwordLoading ? 'Changing...' : 'Change Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    disabled={passwordLoading}
                    className="px-6 py-3 border border-gray-600 rounded-lg text-primary hover:border-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDetails;
