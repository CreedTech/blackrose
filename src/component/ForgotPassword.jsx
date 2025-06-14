// components/ForgotPassword.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { assets } from '../assets/images/assets';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/user/forgot-password`, {
        email: email.toLowerCase().trim(),
      });

      if (response.data.success) {
        setIsSubmitted(true);
        toast.success('Password reset link sent to your email');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setIsSubmitted(false);
    handleSubmit({ preventDefault: () => {} });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen text-primary flex items-center font-medium justify-center px-4 relative z-[99999999]">
        <div className="max-w-md w-full space-y-8 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-900 mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or
              </p>
              <button
                onClick={handleResend}
                className="text-primary hover:text-primary/60 underline hover:scale-105 font-medium transition-all duration-300 ease-in-out text-sm"
              >
                Resend reset link
              </button>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="text-gray-800 hover:text-primary text-sm hover:scale-105 font-medium transition-all duration-300 ease-in-out"
              >
                ← Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-medium text-primary flex relative z-[99999999]">
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
          <h2 className="text-4xl font-bold mb-4 text-light">
            Forgot Your Password?
          </h2>
          <p className="text-lg text-white/90">
            No worries, we&apos;ll help you reset it
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-primary text-center md:text-start mb-2">
              Reset Your Password
            </h2>
            <p className="text-primary/70 mb-8  text-center md:text-start">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-light border text-primary rounded-lg focus:outline-none focus:border-primary focus:border-2 transition border-primary "
                required
              />
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
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </span>
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-primary/60 hover:text-primary transition-colors"
              >
                ← Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
