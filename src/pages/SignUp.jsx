import { useContext, useEffect, useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/images/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  //   const [name, setName] = useState('');
  //   const [password, setPasword] = useState('');
  //   const [confirmPassword, setConfirmPasword] = useState('');
  //     const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //   const [errors, setErrors] = useState({});

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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (currentState === 'Sign Up') {
  //       if (!formData.name.trim()) {
  //         toast.error('Full name is required');
  //       }
  //       if (!formData.email.trim()) {
  //         toast.error('Email is required');
  //       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //         toast.error('Email is invalid');
  //       }
  //       if (!formData.password) {
  //         toast.error('Password is required');
  //       } else if (formData.password.length < 6) {
  //         toast.error('Password must be at least 6 characters');
  //       }

  //       if (formData.password !== formData.confirmPassword) {
  //         toast.error('Passwords do not match');
  //       }
  //     } else if (currentState === 'Login') {
  //       if (!formData.email.trim()) {
  //         toast.error('Email is required');
  //       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //         toast.error('Email is invalid');
  //       }
  //       if (!formData.password) {
  //         toast.error('Password is required');
  //       }
  //     } else {
  //       return;
  //     }

  //     try {
  //       if (currentState === 'Sign Up') {
  //         const response = await axios.post(
  //           backendUrl + '/api/user/register',
  //           JSON.stringify(formData)
  //         );
  //         if (response.data.success) {
  //           setToken(response.data.token);
  //           localStorage.setItem('token', response.data.token);
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       } else {
  //         const response = await axios.post(
  //           backendUrl + '/api/user/login',
  //           JSON.stringify(formData)
  //         );
  //         if (response.data.success) {
  //           setToken(response.data.token);
  //           localStorage.setItem('token', response.data.token);
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   };

  return (
    <div className="min-h-screen bg-black flex z-[999999] mt-10">
      {isLoading && (
        <div
          id="Lfa-page-loading"
          className="blackrose-pageloading z-[999999999]"
        >
          <div className="blackrose-pageloading-inner">
            <img src={assets.logo} className="logo" alt="" />
          </div>
        </div>
      )}
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
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Optional text overlay */}
        <div className="absolute bottom-10 left-0 right-0 txt-center text-white">
          <h2 className="text-4xl font-bold mb-4">Discover Amazing Photos</h2>
          <p className="text-lg text-white/80">
            Join our community of photographers
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-[999999]">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="">
            <h2 className="text-4xl font-bold text-white mb-2">
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
                  className="w-full px-4 py-3 bg-white rounded focus:outline-none"
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
                className="w-full px-4 py-3 bg-white rounded focus:outline-none"
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
                className="w-full px-4 py-3 bg-white rounded focus:outline-none"
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
                  className="w-full px-4 py-3 bg-white rounded focus:outline-none"
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
            {/* Confirm Password */}

            {/* Create Account Button */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white text-black rounded font-medium hover:bg-white/90 transition-colors"
            >
              {isLoading
                ? 'Loading...'
                : currentState === 'Login'
                ? 'Sign In'
                : 'Create Account'}
              {/* {currentState === 'Login' ? 'Sign In' : 'Create Account'} */}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-white/60">Or</span>
              </div>
            </div>

            {/* Social Buttons */}

            {/* Login Link */}
            {currentState === 'Login' ? (
              <p
                className="text-center text-white/60"
                onClick={() => setCurrentState('Sign Up')}
              >
                Don&apos;t have an account?{' '}
                <strong className="cursor-pointer"> Create Account</strong>
              </p>
            ) : (
              <p
                onClick={() => setCurrentState('Login')}
                className="text-center text-white/60"
              >
                {' '}
                Already have an account?{' '}
                <strong className="cursor-pointer"> Login Here</strong>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
