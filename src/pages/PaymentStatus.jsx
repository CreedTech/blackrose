

import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const PaymentStatus = () => {
  const { getPaymentStatus, token, loading, setToken } =
    useContext(ShopContext);
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract reference from URL query params
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');
  const errorParam = searchParams.get('error');
  // Add this at the top of your PaymentStatus component
  useEffect(() => {
    // Refresh token when component mounts
    if (!token && localStorage.getItem('token')) {
      // This ensures context has the token after redirect from Paystack
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    // Skip if error or no reference
    if (errorParam || !reference) {
      setStatus('error');
      return;
    }

    const checkPayment = async () => {
      try {
        // Force a small delay to ensure token is set
        if (!token && localStorage.getItem('token')) {
          setTimeout(checkPayment, 500);
          return;
        }

        const data = await getPaymentStatus(reference);

        if (data) {
          setPaymentData(data);
          setStatus(data.transactionStatus);

          if (data.transactionStatus === 'pending') {
            setTimeout(checkPayment, 3000);
          }
        } else {
          throw new Error('Failed to get payment status');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    checkPayment();
  }, [reference, errorParam, token]);

  return (
    <div className="container">
      {/* Header - Same as Checkout page */}

      {/* Main Content */}
      <main className="relative px-4 py-10 max-w-2xl mx-auto md:mt-10 mt-0">
        <div className="border border-gray-800 rounded-md p-8">
          <h1 className="text-2xl font-bold mb-8 text-center">
            Payment Status
          </h1>

          {/* Loading State */}
          {(status === 'loading' || loading) && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Verifying your payment...</p>
              <p className="text-gray-400 mt-2">
                Please do not close this page.
              </p>
            </div>
          )}
          {/* Pending State */}
          {status === 'pending' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Processing</h2>
              <p className="text-gray-400 mb-2">
                Your payment is being processed by our payment provider.
              </p>
              <p className="text-gray-400 mb-6">
                This page will automatically update when complete. Please do not
                close this page.
              </p>

              <div className="w-full max-w-md mx-auto bg-gray-800 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-yellow-400 h-full animate-pulse"
                  style={{ width: '60%' }}
                ></div>
              </div>

              <p className="text-sm text-gray-500 italic">
                This may take a few moments to complete
              </p>
            </div>
          )}
          {/* Success State */}
          {status === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
              <p className="text-gray-400 mb-6">
                Your order has been placed successfully.
              </p>

              <div className="bg-gray-800 p-4 rounded mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span>Order ID:</span>
                  <span>{paymentData?.orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Amount:</span>
                  <span>₦{paymentData?.amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span>{paymentData?.reference}</span>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <Link
                  to="/orders"
                  className="bg-white text-black px-6 py-3 rounded"
                >
                  View Order
                </Link>
                <Link
                  to="/shop"
                  className="bg-transparent border border-white text-white px-6 py-3 rounded"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Failed State */}
          {status === 'failed' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
              <p className="text-gray-400 mb-6">
                Your payment could not be processed.
              </p>

              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-white text-black px-6 py-3 rounded"
                >
                  Try Again
                </button>
                <Link
                  to="/shop"
                  className="bg-transparent border border-white text-white px-6 py-3 rounded"
                >
                  Return to Shop
                </Link>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
              <p className="text-gray-400 mb-6">
                We couldn&apos;t verify your payment status. Please contact our
                support team.
              </p>

              <div className="flex space-x-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-black px-6 py-3 rounded"
                >
                  Contact Support
                </Link>
                <Link
                  to="/orders"
                  className="bg-white text-black px-6 py-3 rounded"
                >
                  View Order
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Same as Checkout page */}
    </div>
  );
};

export default PaymentStatus;
