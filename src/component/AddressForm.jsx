/* eslint-disable react/prop-types */

import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTimes } from 'react-icons/fa';

const AddressForm = ({ address, onClose, onSuccess }) => {
  const { addAddress, updateAddress } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    label: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    isDefault: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        label: address.label || '',
        fullName: address.fullName || '',
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        zipCode: address.zipCode || '',
        phone: address.phone || '',
        email: address.email || '',
        isDefault: address.isDefault || false,
      });
    }
  }, [address]);

  const nigerianStates = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) {
      newErrors.label = 'Address label is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\\+$$$$]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let success;
      if (address) {
        success = await updateAddress(address._id, formData);
      } else {
        success = await addAddress(formData);
      }

      if (success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto font-medium">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {address ? 'Edit Address' : 'Add New Address'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-primary transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-900 mb-2">
                  Address Label *
                </label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="e.g., Home, Office, etc."
                  className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.label ? 'border-red-500' : 'border-gray-400'
                  } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.label && (
                  <p className="text-red-500 text-xs mt-1">{errors.label}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.fullName ? 'border-red-500' : 'border-gray-400'
                  } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-900 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.address ? 'border-red-500' : 'border-gray-400'
                  } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.city ? 'border-red-500' : 'border-gray-400'
                  } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                     className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.state ? 'border-red-500' : 'border-gray-400'
                   } rounded-lg focus:outline-none focus:border-primary transition`}
                >
                  <option value="">Select State</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                     className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-400'
                   } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 xxx xxx xxxx"
                     className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.phone ? 'border-red-500' : 'border-gray-400'
                   } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-900 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                     className={`w-full px-4 py-2 bg-light border text-primary ${
                    errors.email ? 'border-red-500' : 'border-gray-400'
                   } rounded-lg focus:outline-none focus:border-primary transition`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Set as default address</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  loading
                    ? 'bg-gray-900 text-gray-700 cursor-not-allowed'
                    : 'bg-primary text-light hover:bg-gray-800'
                }`}
              >
                {loading
                  ? 'Saving...'
                  : address
                  ? 'Update Address'
                  : 'Add Address'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-600 rounded-lg hover:border-white hover:text-primary transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
