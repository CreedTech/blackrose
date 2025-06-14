// components/ResetPassword.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { assets } from '../assets/images/assets';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/user/verify-reset-token/${token}`
      );

      if (response.data.success) {
        setTokenValid(true);
        setUserInfo(response.data.user);
      } else {
        setTokenValid(false);
        toast.error('Invalid or expired reset link');
      }
    } catch (error) {
      console.error('Token verification error:', error);
      setTokenValid(false);
      toast.error('Invalid or expired reset link');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      toast.error('New password is required');
      return false;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(formData.newPassword);
    const hasLowerCase = /[a-z]/.test(formData.newPassword);
    const hasNumbers = /\d/.test(formData.newPassword);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/user/reset-password`, {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.success) {
        toast.success(
          'Password reset successfully! You can now login with your new password.'
        );
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while verifying token
  if (isVerifying) {
    return (
      <div className="flex items-center justify-center h-screen bg-light">
        <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
      //   <div className="min-h-screen bg-black flex items-center justify-center">
      //     <div className="blackrose-pageloading z-[999999999]">
      //       <div className="blackrose-pageloading-inner">
      //         <img src={assets.logo} className="logo" alt="" />
      //       </div>
      //     </div>
      //   </div>
    );
  }

  // Invalid token state
  if (tokenValid) {
    return (
      <div className="min-h-screen text-primary flex font-medium items-center justify-center px-4 relative z-[99999999]">
        <div className="max-w-md w-full space-y-8 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-gray-800 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Request New Reset Link
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-light transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-primary font-medium flex relative z-[99999999]">
      {/* Loading Overlay */}
      {/* {isLoading && (
        <div className="blackrose-pageloading z-[999999999]">
          <div className="blackrose-pageloading-inner">
            <img src={assets.logo} className="logo" alt="" />
          </div>
        </div>
      )} */}

      {/* Left Side Image - Hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse"></div>
        )}
        <img
          src={assets.bg_img}
          alt="Reset Password"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/40 "></div>

        {/* Optional text overlay */}
        <div className="relative h-full flex flex-col items-center justify-center text-light px-4 !rounded-md">
          <h2 className="text-4xl font-bold mb-4 text-light">Almost There!</h2>
          <p className="text-lg text-white/90">
            Choose a strong password for your account
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-primary text-center md:text-start mb-2">
              Create New Password
            </h2>
            {userInfo && (
              <p className="text-primary mb-8">
                Hi {userInfo.name}, please enter your new password below.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-primary "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-primary "
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="text-primary/70 text-sm space-y-1">
              <p className="font-medium">Password must contain:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`relative group/button w-full px-4 py-3 rounded-md font-medium overflow-hidden border transition-all duration-500
    ${
      isLoading
        ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
        : 'bg-black text-white border-primary border-2'
    }
  `}
            >
              {/* Sliding white overlay on hover */}
              {!isLoading && (
                <div className="absolute inset-0 w-0 group-hover/button:w-full transition-all duration-500 ease-in-out bg-white"></div>
              )}

              {/* Text stays on top and transitions color */}
              <span className="relative z-10 group-hover/button:text-black transition-colors duration-500">
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </span>
            </button>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
