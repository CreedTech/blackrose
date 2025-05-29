// import { useState, useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const Checkout = () => {
//   const {
//     cartItems,
//     getCartAmount,
//     delivery_fee,
//     checkout,
//     loading,
//     orderProcessing,
//   } = useContext(ShopContext);

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
//   const [couponCode, setCouponCode] = useState('');
//   const [editingDelivery, setEditingDelivery] = useState(true);
//   const [error, setError] = useState(null);

//   // Calculate totals
//   const subtotal = getCartAmount();
//   const tax = subtotal * 0.1; // 10% tax
//   const shipping = delivery_fee;
//   const total = subtotal + tax + shipping;

//   const handleDeliveryInfoChange = (e) => {
//     const { name, value } = e.target;
//     setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitDelivery = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (
//       !deliveryInfo.firstName ||
//       !deliveryInfo.lastName ||
//       !deliveryInfo.address ||
//       !deliveryInfo.city ||
//       !deliveryInfo.mobileNumber ||
//       !deliveryInfo.email
//     ) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setEditingDelivery(false);
//     setError(null);
//   };

//   const handlePayment = async () => {
//     if (editingDelivery) {
//       setError('Please complete delivery information first');
//       return;
//     }

//     // Format address for API
//     const addressData = {
//       fullName: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
//       address: deliveryInfo.address,
//       city: deliveryInfo.city,
//       state: deliveryInfo.state,
//       zipCode: deliveryInfo.zipCode,
//       phone: deliveryInfo.mobileNumber,
//       email: deliveryInfo.email,
//     };

//     // Start checkout process
//     await checkout(addressData);
//   };

//   // Component rendering with your existing design
//   return (
//     <div className="container">
//       {/* Header - Same as your design */}

//       {/* Main content */}
//       <div className='z-[99999]'>
//         <main className="relative md:mt-10 mt-0 pb-0">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Order Summary */}
//             <div className="space-y-8">
//               <div className="border border-gray-800 rounded-md p-6">
//                 <div className="flex items-center mb-4">
//                   <h2 className="text-xl font-bold">Order Summary</h2>
//                   <span className="ml-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center text-sm">
//                     {Object.keys(cartItems).length}
//                   </span>
//                 </div>

//                 {error && (
//                   <div className="bg-red-900 bg-opacity-50 text-white p-3 rounded mb-4">
//                     {error}
//                   </div>
//                 )}

//                 {/* Cart items */}
//                 <div className="space-y-6">
//                   {Object.entries(cartItems).map(([productId, item]) => (
//                     <div
//                       key={productId}
//                       className="flex space-x-4 pb-6 border-b border-gray-800"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-28 h-28 object-cover"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-medium text-lg">
//                           {item.title} X {item.quantity}
//                         </h3>
//                         <p className="text-gray-400">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                       <p className="font-medium">
//                         ₦
//                         {Number(
//                           item.finalPrice * item.quantity
//                         ).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Delivery Information */}
//               <div className="border border-gray-800 rounded-md p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold">Delivery Information</h2>
//                   {!editingDelivery && (
//                     <button
//                       onClick={() => setEditingDelivery(true)}
//                       className="flex items-center text-sm text-gray-400 hover:text-white"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                         />
//                       </svg>
//                       Edit
//                     </button>
//                   )}
//                 </div>

//                 {editingDelivery ? (
//                   <form onSubmit={handleSubmitDelivery}>
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           name="firstName"
//                           placeholder="Enter your First Name"
//                           value={deliveryInfo.firstName}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           name="lastName"
//                           placeholder="Enter your Last Name"
//                           value={deliveryInfo.lastName}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm text-gray-400 mb-1">
//                         Address
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         placeholder="Enter your Address"
//                         value={deliveryInfo.address}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           City/Town
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           placeholder="Enter your City/Town"
//                           value={deliveryInfo.city}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           Zip Code
//                         </label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           placeholder="Enter your Zip Code"
//                           value={deliveryInfo.zipCode}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           Mobile Number
//                         </label>
//                         <input
//                           type="tel"
//                           name="mobileNumber"
//                           placeholder="Enter your Mobile Number"
//                           value={deliveryInfo.mobileNumber}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-400 mb-1">
//                           Email address
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           placeholder="Enter your Email address"
//                           value={deliveryInfo.email}
//                           onChange={handleDeliveryInfoChange}
//                           className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         placeholder="Enter your State"
//                         value={deliveryInfo.state}
//                         onChange={handleDeliveryInfoChange}
//                         className="w-full p-3 bg-black border border-gray-800 rounded-md focus:border-gray-600 focus:outline-none"
//                         required
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="mt-4 bg-white text-black px-6 py-2 rounded-md"
//                     >
//                       Save Delivery Information
//                     </button>
//                   </form>
//                 ) : (
//                   <div>
//                     <h3 className="font-medium">
//                       {deliveryInfo.firstName} {deliveryInfo.lastName}
//                     </h3>
//                     <p className="text-gray-400 mt-2">
//                       {deliveryInfo.address}, {deliveryInfo.city},{' '}
//                       {deliveryInfo.state} {deliveryInfo.zipCode}
//                     </p>
//                     <p className="text-gray-400 mt-1">
//                       {deliveryInfo.mobileNumber}
//                     </p>
//                     <p className="text-gray-400 mt-1 flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                       {deliveryInfo.email}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Payment Information */}
//             <div>
//               <div className="border border-gray-800 rounded-md p-6">
//                 <h2 className="text-xl font-bold mb-6">Payment Information</h2>

//                 {/* Apply Discount */}
//                 <div className="mb-8">
//                   <h3 className="font-medium mb-2">Apply Discount</h3>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       placeholder="Enter Coupon Code"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value)}
//                       className="flex-1 p-3 bg-white text-black rounded-md"
//                     />
//                     <button className="bg-white text-black px-4 py-2 rounded-md">
//                       Apply
//                     </button>
//                   </div>
//                 </div>

//                 {/* Pay With */}
//                 <div className="mb-8">
//                   <h3 className="font-medium mb-2">Pay With</h3>
//                   <div className="h-16 border-b border-gray-800 flex items-center">
//                     <div className="flex items-center space-x-2">
//                       <img
//                         src="https://assets.paystack.com/assets/img/logos/paystack-standard-white.svg"
//                         alt="Paystack"
//                         className="h-8"
//                       />
//                       <span className="text-sm text-gray-400">
//                         Secured by Paystack
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Totals */}
//                 <div className="space-y-2 pt-4 border-t border-gray-800">
//                   <div className="flex justify-between">
//                     <span>Sub Total</span>
//                     <span>₦{Number(subtotal).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax (10%)</span>
//                     <span>₦{Number(tax).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>₦{Number(shipping).toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between font-bold pt-2">
//                     <span>Total</span>
//                     <span>₦{Number(total).toLocaleString()}</span>
//                   </div>
//                 </div>

//                 {/* Pay Button */}
//                 <button
//                   onClick={handlePayment}
//                   disabled={loading || orderProcessing || editingDelivery}
//                   className={`w-full py-3 rounded-md mt-6 font-medium transition-colors ${
//                     loading || orderProcessing || editingDelivery
//                       ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
//                       : 'bg-white text-black hover:bg-gray-100'
//                   }`}
//                 >
//                   {loading || orderProcessing ? (
//                     <span className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     `Pay     ₦${Number(total).toLocaleString()}`
//                   )}
//                 </button>

//                 {editingDelivery && (
//                   <p className="text-sm text-gray-400 text-center mt-2">
//                     Please complete delivery information to continue
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// pages/Checkout.jsx
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaCheck } from 'react-icons/fa';
import AddressForm from '../component/AddressForm';

const Checkout = () => {
  const {
    cartItems,
    getCartAmount,
    delivery_fee,
    checkout,
    loading,
    orderProcessing,
    addresses,
    user,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderNotes, setOrderNotes] = useState('');
  const [isPreorder, setIsPreorder] = useState(false);
  const [error, setError] = useState(null);

  // Calculate totals
  const subtotal = getCartAmount();
  const shippingCosts = {
    standard: 0,
    express: 2000,
    pickup: 0,
  };
  const shipping = shippingCosts[shippingMethod];
  // const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping ;

  useEffect(() => {
    // Check if any items are pre-order
    const hasPreorderItems = Object.values(cartItems).some(
      (item) => !item.isAvailable || item.availableStock === 0
    );
    setIsPreorder(hasPreorderItems);

    // Set default address
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [cartItems, addresses, selectedAddress]);

  const handlePayment = async () => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      setError('Your cart is empty');
      return;
    }

    const addressData = {
      fullName: selectedAddress.fullName,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      phone: selectedAddress.phone,
      email: selectedAddress.email || user?.email,
    };

    const success = await checkout(
      addressData,
      shippingMethod,
      orderNotes,
      isPreorder
    );

    if (!success) {
      setError('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-900 bg-opacity-50 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delivery Address</h2>
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddress(null);
                  }}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  <FaPlus /> Add New
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No saved addresses</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedAddress?._id === address._id
                          ? 'border-white bg-gray-800'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="mt-1">
                            {selectedAddress?._id === address._id ? (
                              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                <FaCheck className="text-black text-xs" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{address.label}</h3>
                              {address.isDefault && (
                                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300">
                              {address.fullName}
                            </p>
                            <p className="text-sm text-gray-400">
                              {address.address}, {address.city}, {address.state}{' '}
                              {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-400">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAddress(address);
                            setShowAddressForm(true);
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Method */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-white"
                    />
                    <div>
                      <h3 className="font-medium">Standard Shipping</h3>
                      <p className="text-sm text-gray-400">
                        {isPreorder ? '7-14 days' : '3-5 business days'}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">Free</span>
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-white"
                      disabled={isPreorder}
                    />
                    <div>
                      <h3 className="font-medium">Express Shipping</h3>
                      <p className="text-sm text-gray-400">
                        1-2 business days{' '}
                        {isPreorder && '(Not available for pre-orders)'}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">₦2,000</span>
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600 transition">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingMethod === 'pickup'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-white"
                    />
                    <div>
                      <h3 className="font-medium">Store Pickup</h3>
                      <p className="text-sm text-gray-400">
                        {isPreorder
                          ? 'Ready in 7-14 days'
                          : 'Ready in 24 hours'}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">Free</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Notes (Optional)</h2>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Add any special instructions for your order..."
                rows={3}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {Object.entries(cartItems).map(([key, item]) => (
                  <div key={key} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      {item.selectedAttributes &&
                        Object.keys(item.selectedAttributes).length > 0 && (
                          <p className="text-xs text-gray-400">
                            {Object.entries(item.selectedAttributes)
                              .filter(([key, value]) => value)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')}
                          </p>
                        )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-medium">
                          ₦{(item.finalPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      {!item.isAvailable && (
                        <span className="text-xs text-yellow-400">
                          Pre-order item
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 py-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-gray-400">VAT (7.5%)</span>
                  <span>₦{tax.toFixed(2).toLocaleString()}</span>
                </div> */}
                {isPreorder && (
                  <div className="text-xs text-yellow-400 py-2">
                    * This order contains pre-order items
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span>₦{total.toFixed(2).toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="p-4 bg-black rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://assets.paystack.com/assets/img/logos/paystack-logo-white.svg"
                      alt="Paystack"
                      className="h-6"
                    />
                  </div>
                  <span className="text-sm text-gray-400">Secure Payment</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading || orderProcessing || !selectedAddress}
                className={`w-full py-4 rounded-lg font-medium transition ${
                  loading || orderProcessing || !selectedAddress
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {loading || orderProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                  `Pay ₦${total.toFixed(2).toLocaleString()}`
                )}
              </button>

              {!selectedAddress && (
                <p className="text-sm text-red-400 text-center mt-2">
                  Please select a delivery address
                </p>
              )}

              {/* Security Note */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Form Modal */}
        {showAddressForm && (
          <AddressForm
            address={editingAddress}
            onClose={() => {
              setShowAddressForm(false);
              setEditingAddress(null);
            }}
            onSuccess={() => {
              setShowAddressForm(false);
              setEditingAddress(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
