

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
