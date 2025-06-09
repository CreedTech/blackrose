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

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // components/ForgotPassword.jsx (continued)
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
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative z-[99999999]">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-green-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or
              </p>
              <button
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-500 font-medium text-sm"
              >
                Resend reset link
              </button>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-500 text-sm"
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
    <div className="min-h-screen bg-black flex relative z-[99999999]">
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
        <img
          src={assets.bg_img}
          alt="Reset Password"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Forgot Your Password?</h2>
          <p className="text-lg text-white/80">
            No worries, we&apos;ll help you reset it
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Reset Your Password
            </h2>
            <p className="text-white/70 mb-8">
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
                className="w-full px-4 py-3 bg-white rounded focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white text-black rounded font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-white/60 hover:text-white transition-colors"
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
