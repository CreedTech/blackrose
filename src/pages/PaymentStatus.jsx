// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentStatus = () => {
//   const [status, setStatus] = useState('loading');
//   const [paymentData, setPaymentData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract reference from URL query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const reference = searchParams.get('reference');
//   const errorParam = searchParams.get('error');

//   useEffect(() => {
//     if (errorParam) {
//       setStatus('error');
//       return;
//     }

//     if (!reference) {
//       setStatus('error');
//       return;
//     }

//     const checkPaymentStatus = async () => {
//       try {
//         const response = await axios.get(`/api/payment/status/${reference}`);

//         if (response.data.success) {
//           setPaymentData(response.data.data);
//           setStatus(response.data.data.transactionStatus);

//           // If still pending, poll again
//           if (response.data.data.transactionStatus === 'pending') {
//             setTimeout(checkPaymentStatus, 3000);
//           }
//         } else {
//           throw new Error(response.data.message);
//         }
//       } catch (error) {
//         console.error('Error checking payment status:', error);
//         setStatus('error');
//       }
//     };

//     checkPaymentStatus();
//   }, [reference, errorParam]);

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Header - Same as Checkout page */}
//       <header className="border-b border-gray-800 py-4 px-10">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-8">
//             <Link to="/">
//               <img src="/logo.png" alt="The Black Rose" className="h-10" />
//             </Link>
//             <nav className="hidden md:flex space-x-6">
//               <Link to="/" className="hover:text-gray-300">Home</Link>
//               <Link to="/photography" className="hover:text-gray-300">Photography</Link>
//               <Link to="/lifestyle" className="hover:text-gray-300">Lifestyle</Link>
//               <Link to="/shop" className="hover:text-gray-300">Shop</Link>
//               <Link to="/about" className="hover:text-gray-300">About</Link>
//               <Link to="/contacts" className="hover:text-gray-300">Contacts</Link>
//             </nav>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="p-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </button>
//             <Link to="/cart" className="p-2 relative">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </Link>
//             <button className="p-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </button>
//             <Link to="/shop" className="bg-white text-black px-4 py-2 rounded flex items-center">
//               Shop now
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="px-4 py-10 max-w-2xl mx-auto">
//         <div className="border border-gray-800 rounded-md p-8">
//           <h1 className="text-2xl font-bold mb-8 text-center">Payment Status</h1>

//           {status === 'loading' && (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
//               <p className="text-lg">Verifying your payment...</p>
//               <p className="text-gray-400 mt-2">Please do not close this page.</p>
//             </div>
//           )}

//           {status === 'success' && (
//             <div className="text-center py-4">
//               <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
//               <p className="text-gray-400 mb-6">Your order has been placed successfully.</p>

//               <div className="bg-gray-800 p-4 rounded mb-6 text-left">
//                 <div className="flex justify-between mb-2">
//                   <span>Order ID:</span>
//                   <span>{paymentData?.orderId}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Amount:</span>
//                   <span>₦{paymentData?.amount?.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Reference:</span>
//                   <span>{paymentData?.reference}</span>
//                 </div>
//               </div>

//               <div className="flex space-x-4 justify-center">
//                 <Link to="/orders" className="bg-white text-black px-6 py-3 rounded">
//                   View Order
//                 </Link>
//                 <Link to="/shop" className="bg-transparent border border-white text-white px-6 py-3 rounded">
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}

//           {status === 'failed' && (
//             <div className="text-center py-4">
//               <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
//               <p className="text-gray-400 mb-6">Your payment could not be processed.</p>

//               <div className="flex space-x-4 justify-center">
//                 <button
//                   onClick={() => navigate('/checkout')}
//                   className="bg-white text-black px-6 py-3 rounded"
//                 >
//                   Try Again
//                 </button>
//                 <Link to="/cart" className="bg-transparent border border-white text-white px-6 py-3 rounded">
//                   Return to Cart
//                 </Link>
//               </div>
//             </div>
//           )}

//           {status === 'error' && (
//             <div className="text-center py-4">
//               <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
//               <p className="text-gray-400 mb-6">We couldn&apos;t verify your payment status. Please contact our support team.</p>

//               <div className="flex space-x-4 justify-center">
//                 <Link to="/contact" className="bg-white text-black px-6 py-3 rounded">
//                   Contact Support
//                 </Link>
//                 <Link to="/orders" className="bg-transparent border border-white text-white px-6 py-3 rounded">
//                   Check Orders
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="px-10 py-6 border-t border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="flex space-x-4 mb-4 md:mb-0">
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//                 <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//                 <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
//               </svg>
//             </a>
//           </div>
//           <p className="text-gray-400">© 2024 BlackRose All right reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PaymentStatus;

import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const PaymentStatus = () => {
  const { getPaymentStatus, token, loading } = useContext(ShopContext);
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract reference from URL query params
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    // Handle error case
    if (errorParam) {
      setStatus('error');
      return;
    }

    // Make sure we have a reference
    if (!reference) {
      setStatus('error');
      return;
    }

    // Check payment status
    const checkPayment = async () => {
      try {
        const data = await getPaymentStatus(reference);

        if (data) {
          setPaymentData(data);
          setStatus(data.transactionStatus);

          // If pending, check again after 3 seconds
          if (data.transactionStatus === 'pending') {
            setTimeout(checkPayment, 30000);
          }
        } else {
          throw new Error('Failed to get payment status');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    if (token) {
      checkPayment();
    } else {
      // If no token yet but it's stored in localStorage, wait a bit for context to load
      const checkToken = () => {
        if (localStorage.getItem('token')) {
          setTimeout(checkPayment, 500);
        } else {
          setStatus('error');
        }
      };
      checkToken();
    }
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
                  to="/cart"
                  className="bg-transparent border border-white text-white px-6 py-3 rounded"
                >
                  Return to Cart
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
                  to="/shop"
                  className="bg-transparent border border-white text-white px-6 py-3 rounded"
                >
                  Continue Shopping
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
