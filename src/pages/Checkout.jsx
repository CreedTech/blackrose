// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Checkout = () => {
//   const [editingDelivery, setEditingDelivery] = useState(true);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [couponCode, setCouponCode] = useState('');
//   const [deliveryInfo, setDeliveryInfo] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     mobileNumber: '',
//     email: '',
//   });
//   const [cardInfo, setCardInfo] = useState({
//     cardholderName: 'Alexandra McPherson Grey',
//     cardNumber: '5061 2345 6789 1234',
//   });
//   const [totals, setTotals] = useState({
//     subtotal: 0,
//     tax: 0,
//     shipping: 0,
//     total: 0,
//   });
//   const [createdOrder, setCreatedOrder] = useState(null);

//   const navigate = useNavigate();

//   // Fetch cart items
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/cart');

//         if (response.data.success) {
//           const items = Object.values(response.data.cart);
//           setCartItems(items);

//           // Calculate totals
//           const subtotal = items.reduce(
//             (sum, item) => sum + item.finalPrice * item.quantity,
//             0
//           );
//           const tax = subtotal * 0.1; // 10% tax
//           const shipping = 0; // Free shipping

//           setTotals({
//             subtotal,
//             tax,
//             shipping,
//             total: subtotal + tax + shipping,
//           });
//         } else {
//           throw new Error(response.data.message || 'Failed to fetch cart');
//         }
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//         setError('Failed to load cart items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   const handleDeliveryInfoChange = (e) => {
//     const { name, value } = e.target;
//     setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCardInfoChange = (e) => {
//     const { name, value } = e.target;
//     setCardInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitDelivery = (e) => {
//     e.preventDefault();

//     // Validate delivery info (basic validation)
//     if (
//       !deliveryInfo.firstName ||
//       !deliveryInfo.lastName ||
//       !deliveryInfo.address ||
//       !deliveryInfo.city ||
//       !deliveryInfo.mobileNumber ||
//       !deliveryInfo.email
//     ) {
//       setError('Please fill in all required delivery information');
//       return;
//     }

//     setEditingDelivery(false);
//     setError(null);
//   };

//   // Create order
//   const createOrder = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Format items for the order
//       const orderItems = cartItems.map((item) => ({
//         productId: item.productId,
//         title: item.title,
//         price: item.finalPrice,
//         quantity: item.quantity,
//         image: item.image,
//       }));

//       // Format address from delivery info
//       const orderAddress = {
//         fullName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
//         address: deliveryInfo.address,
//         city: deliveryInfo.city,
//         state: deliveryInfo.state,
//         zipCode: deliveryInfo.zipCode,
//         phone: deliveryInfo.mobileNumber,
//         email: deliveryInfo.email,
//       };

//       // Create order
//       const response = await axios.post('/api/orders', {
//         items: orderItems,
//         amount: totals.total,
//         address: orderAddress,
//         paymentMethod: 'paystack',
//       });

//       if (response.data.success) {
//         setCreatedOrder(response.data.order);
//         return response.data.order._id;
//       } else {
//         throw new Error(response.data.message || 'Failed to create order');
//       }
//     } catch (error) {
//       console.error('Error creating order:', error);
//       setError(error.message || 'Failed to create order');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize Paystack payment
//   const initializePayment = async (orderId) => {
//     try {
//       setLoading(true);

//       const response = await axios.post('/api/payment/initialize', {
//         orderId: orderId,
//         callbackUrl: `${window.location.origin}/payment/callback`,
//       });

//       if (response.data.success) {
//         // Redirect to Paystack payment page
//         window.location.href = response.data.data.authorization_url;
//       } else {
//         throw new Error(
//           response.data.message || 'Failed to initialize payment'
//         );
//       }
//     } catch (error) {
//       console.error('Payment initialization error:', error);
//       setError(error.message || 'Failed to initialize payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle payment
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // If we already have a created order, use it
//       let orderId = createdOrder ? createdOrder._id : await createOrder();

//       if (!orderId) {
//         throw new Error('Failed to create order');
//       }

//       // Initialize payment with Paystack
//       await initializePayment(orderId);
//     } catch (error) {
//       console.error('Payment process error:', error);
//       setError(error.message || 'Payment process failed');
//       setLoading(false);
//     }
//   };

//   // Apply discount coupon
//   const applyDiscount = async () => {
//     if (!couponCode) {
//       setError('Please enter a coupon code');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post('/api/discount/apply', {
//         couponCode: couponCode,
//       });

//       if (response.data.success) {
//         const { discountAmount, newTotal } = response.data;

//         setTotals((prev) => ({
//           ...prev,
//           discount: discountAmount,
//           total: newTotal,
//         }));

//         setError(null);
//       } else {
//         setError(response.data.message || 'Invalid coupon code');
//       }
//     } catch (error) {
//       console.error('Error applying discount:', error);
//       setError(error.message || 'Failed to apply discount');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && cartItems.length === 0) {
//     return (
//       <div className="bg-black text-white min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Header - Same as before */}
//       {/* ... */}

//       {/* Main Content */}
//       <main className="px-10 pb-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left Column */}
//           <div className="space-y-8">
//             {/* Order Summary */}
//             <div className="border border-gray-800 rounded-md p-6">
//               <div className="flex items-center mb-4">
//                 <h2 className="text-xl font-bold">Order Summary</h2>
//                 <span className="ml-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center text-sm">
//                   {cartItems.length}
//                 </span>
//               </div>

//               {/* Error message */}
//               {error && (
//                 <div className="bg-red-900 bg-opacity-50 text-white p-3 rounded mb-4">
//                   {error}
//                 </div>
//               )}

//               {/* Order Items */}
//               <div className="space-y-6">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex space-x-4 pb-6 border-b border-gray-800"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-28 h-28 object-cover"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium text-lg">
//                         {item.title} X {item.quantity}
//                       </h3>
//                       <p className="text-gray-400">
//                         Color: {item.color || 'Black'}
//                       </p>
//                       <p className="text-gray-400">Size: {item.size || '41'}</p>
//                     </div>
//                     <p className="font-medium">
//                       ${(item.finalPrice * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Delivery Information - Form or Display */}
//             <div className="border border-gray-800 rounded-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Delivery Information</h2>
//                 {!editingDelivery && (
//                   <button
//                     onClick={() => setEditingDelivery(true)}
//                     className="flex items-center text-sm text-gray-400 hover:text-white"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                       />
//                     </svg>
//                     Edit
//                   </button>
//                 )}
//               </div>

//               {editingDelivery ? (
//                 <form onSubmit={handleSubmitDelivery}>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.firstName}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.lastName}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-400 mb-1">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       name="address"
//                       placeholder="Placeholder"
//                       value={deliveryInfo.address}
//                       onChange={handleDeliveryInfoChange}
//                       className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         City/Town
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.city}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         Zip Code
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.zipCode}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         Mobile Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="mobileNumber"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.mobileNumber}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         Email address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Placeholder"
//                         value={deliveryInfo.email}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="mt-2 bg-white text-black px-6 py-2 rounded-md"
//                   >
//                     Save Delivery Information
//                   </button>
//                 </form>
//               ) : (
//                 <div>
//                   <h3 className="font-medium">
//                     {deliveryInfo.firstName} {deliveryInfo.lastName}
//                   </h3>
//                   <p className="text-gray-400 mt-2">
//                     {deliveryInfo.address}, {deliveryInfo.city},{' '}
//                     {deliveryInfo.state} {deliveryInfo.zipCode}
//                   </p>
//                   <p className="text-gray-400 mt-1">
//                     {deliveryInfo.mobileNumber}
//                   </p>
//                   <p className="text-gray-400 mt-1 flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                     {deliveryInfo.email}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div>
//             <div className="border border-gray-800 rounded-md p-6">
//               <h2 className="text-xl font-bold mb-6">Payment Information</h2>

//               {/* Apply Discount */}
//               <div className="mb-8">
//                 <h3 className="font-medium mb-2">Apply Discount</h3>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     placeholder="Enter Coupon Code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="flex-1 p-3 bg-white text-black rounded-md"
//                   />
//                   <button
//                     onClick={applyDiscount}
//                     disabled={loading}
//                     className="bg-white text-black px-4 py-2 rounded-md"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>

//               {/* Pay With */}
//               <div className="mb-8">
//                 <h3 className="font-medium mb-2">Pay With</h3>
//                 <div className="h-16 border-b border-gray-800 flex items-center">
//                   <img
//                     src="/paystack-logo.png"
//                     alt="Paystack"
//                     className="h-8"
//                   />
//                 </div>
//               </div>

//               {/* Order Totals */}
//               <div className="space-y-2 pt-4 border-t border-gray-800">
//                 <div className="flex justify-between">
//                   <span>Sub Total</span>
//                   <span>${totals.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax (10%)</span>
//                   <span>${totals.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>${totals.shipping.toFixed(2)}</span>
//                 </div>
//                 {totals.discount > 0 && (
//                   <div className="flex justify-between text-green-500">
//                     <span>Discount</span>
//                     <span>-${totals.discount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between font-bold pt-2">
//                   <span>Total</span>
//                   <span>${totals.total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Pay Button */}
//               <button
//                 onClick={handlePayment}
//                 disabled={loading || editingDelivery}
//                 className={`w-full py-3 rounded-md mt-6 font-medium transition-colors ${
//                   loading || editingDelivery
//                     ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
//                     : 'bg-white text-black hover:bg-gray-100'
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   `Pay $${totals.total.toFixed(2)}`
//                 )}
//               </button>

//               {editingDelivery && (
//                 <p className="text-sm text-gray-400 text-center mt-2">
//                   Please complete delivery information to continue
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="px-10 py-6 border-t border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="flex space-x-4 mb-4 md:mb-0">
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-5 w-5"
//               >
//                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-5 w-5"
//               >
//                 <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-5 w-5"
//               >
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//               </svg>
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
//               </svg>
//             </a>
//           </div>
//           <p className="text-gray-400">© 2024 BlackRose All right reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Checkout;

import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
  const {
    cartItems,
    getCartAmount,
    delivery_fee,
    checkout,
    loading,
    orderProcessing,
  } = useContext(ShopContext);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    mobileNumber: '',
    email: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [editingDelivery, setEditingDelivery] = useState(true);
  const [error, setError] = useState(null);

  // Calculate totals
  const subtotal = getCartAmount();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = delivery_fee;
  const total = subtotal + tax + shipping;

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDelivery = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !deliveryInfo.firstName ||
      !deliveryInfo.lastName ||
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.mobileNumber ||
      !deliveryInfo.email
    ) {
      setError('Please fill in all required fields');
      return;
    }

    setEditingDelivery(false);
    setError(null);
  };

  const handlePayment = async () => {
    if (editingDelivery) {
      setError('Please complete delivery information first');
      return;
    }

    // Format address for API
    const addressData = {
      fullName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
      address: deliveryInfo.address,
      city: deliveryInfo.city,
      state: deliveryInfo.state,
      zipCode: deliveryInfo.zipCode,
      phone: deliveryInfo.mobileNumber,
      email: deliveryInfo.email,
    };

    // Start checkout process
    await checkout(addressData);
  };

  // Component rendering with your existing design
  return (
    <div className="container">
      {/* Header - Same as your design */}

      {/* Main content */}
      <div className='z-[99999]'>
        <main className="relative md:mt-10 mt-0 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-8">
              <div className="border border-gray-800 rounded-md p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <span className="ml-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center text-sm">
                    {Object.keys(cartItems).length}
                  </span>
                </div>

                {error && (
                  <div className="bg-red-900 bg-opacity-50 text-white p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {/* Cart items */}
                <div className="space-y-6">
                  {Object.entries(cartItems).map(([productId, item]) => (
                    <div
                      key={productId}
                      className="flex space-x-4 pb-6 border-b border-gray-800"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-28 h-28 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">
                          {item.title} X {item.quantity}
                        </h3>
                        <p className="text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₦
                        {Number(
                          item.finalPrice * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="border border-gray-800 rounded-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Delivery Information</h2>
                  {!editingDelivery && (
                    <button
                      onClick={() => setEditingDelivery(true)}
                      className="flex items-center text-sm text-gray-400 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>

                {editingDelivery ? (
                  <form onSubmit={handleSubmitDelivery}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Enter your First Name"
                          value={deliveryInfo.firstName}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Enter your Last Name"
                          value={deliveryInfo.lastName}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter your Address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryInfoChange}
                        className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          City/Town
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter your City/Town"
                          value={deliveryInfo.city}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Enter your Zip Code"
                          value={deliveryInfo.zipCode}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          placeholder="Enter your Mobile Number"
                          value={deliveryInfo.mobileNumber}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your Email address"
                          value={deliveryInfo.email}
                          onChange={handleDeliveryInfoChange}
                          className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Enter your State"
                        value={deliveryInfo.state}
                        onChange={handleDeliveryInfoChange}
                        className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 bg-white text-black px-6 py-2 rounded-md"
                    >
                      Save Delivery Information
                    </button>
                  </form>
                ) : (
                  <div>
                    <h3 className="font-medium">
                      {deliveryInfo.firstName} {deliveryInfo.lastName}
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {deliveryInfo.address}, {deliveryInfo.city},{' '}
                      {deliveryInfo.state} {deliveryInfo.zipCode}
                    </p>
                    <p className="text-gray-400 mt-1">
                      {deliveryInfo.mobileNumber}
                    </p>
                    <p className="text-gray-400 mt-1 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {deliveryInfo.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <div className="border border-gray-800 rounded-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>

                {/* Apply Discount */}
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Apply Discount</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 p-3 bg-white text-black rounded-md"
                    />
                    <button className="bg-white text-black px-4 py-2 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Pay With */}
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Pay With</h3>
                  <div className="h-16 border-b border-gray-800 flex items-center">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://assets.paystack.com/assets/img/logos/paystack-standard-white.svg"
                        alt="Paystack"
                        className="h-8"
                      />
                      <span className="text-sm text-gray-400">
                        Secured by Paystack
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="space-y-2 pt-4 border-t border-gray-800">
                  <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>₦{Number(subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>₦{Number(tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₦{Number(shipping).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2">
                    <span>Total</span>
                    <span>₦{Number(total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading || orderProcessing || editingDelivery}
                  className={`w-full py-3 rounded-md mt-6 font-medium transition-colors ${
                    loading || orderProcessing || editingDelivery
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {loading || orderProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay     ₦${Number(total).toLocaleString()}`
                  )}
                </button>

                {editingDelivery && (
                  <p className="text-sm text-gray-400 text-center mt-2">
                    Please complete delivery information to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
