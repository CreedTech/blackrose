import { useContext, useEffect, useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/images/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [imageLoaded, setImageLoaded] = useState(false);
  const from = location.state?.from || '/';
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      validateForm(formData, currentState);
      //   setFormErrors(errors);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, currentState]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (formData, formType) => {
    const errors = {};

    if (formType === 'Sign Up') {
      // Name validation
      if (!formData.name?.trim()) {
        errors.name = 'Full name is required';
      }

      // Password confirmation
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    // Common validations for both Login and Sign Up
    // Email validation
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formType === 'Sign Up' && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData, currentState);

    // If there are errors, show them and stop
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    setIsLoading(true);
    try {
      const endpoint =
        currentState === 'Sign Up' ? '/user/register' : '/user/login';

      const response = await axios.post(
        `${backendUrl}${endpoint}`,
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(
          `Successfully ${
            currentState === 'Sign Up' ? 'registered' : 'logged in'
          }!`
        );
        // Redirect or update UI
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [token]);

  return (
    <div className="min-h-screen  flex z-[99999] font-medium mb-5">
      {/* {isLoading && (
        <div
          id="Lfa-page-loading"
          className="blackrose-pageloading z-[999999999]"
        >
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
          alt="Inspiration"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/40 "></div>

        {/* Optional text overlay */}
        <div className="relative h-full flex flex-col items-center justify-center text-light px-4 !rounded-md">
          <h2 className="text-4xl font-bold mb-4 text-light">
            Discover Amazing Photos
          </h2>
          <p className="text-lg text-white/90">
            Join our community of photographers
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-[999999]">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="">
            <h2 className="text-4xl font-bold text-primary text-center md:text-start mb-2">
              Join the Community of Inspiration
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            {currentState === 'Login' ? (
              ''
            ) : (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-gray-400 "
                />
              </div>
            )}

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-gray-400 "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-gray-400 "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {currentState === 'Login' ? (
              ''
            ) : (
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-gray-400 "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            )}
            {currentState === 'Login' && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-primary/80 hover:text-primary text-sm transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
            {/* Confirm Password */}

            {/* Create Account Button */}

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
                {isLoading
                  ? 'Loading...'
                  : currentState === 'Login'
                  ? 'Sign In'
                  : 'Create Account'}
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-primary/20" />
              <span className="mx-4 text-sm text-primary">Or</span>
              <div className="flex-1 border-t border-primary/20" />
            </div>

            {/* Social Buttons */}

            {/* Login Link */}
            {currentState === 'Login' ? (
              <p
                className="text-center text-primary/80"
                onClick={() => setCurrentState('Sign Up')}
              >
                Don&apos;t have an account?{' '}
                <strong className="cursor-pointer text-primary">
                  {' '}
                  Create Account
                </strong>
              </p>
            ) : (
              <p
                onClick={() => setCurrentState('Login')}
                className="text-center text-primary/80"
              >
                {' '}
                Already have an account?{' '}
                <strong className="cursor-pointer text-primary">
                  {' '}
                  Login Here
                </strong>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
