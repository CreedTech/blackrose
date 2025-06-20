
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaCheck, FaInfoCircle } from 'react-icons/fa';
import AddressForm from '../component/AddressForm';

const Checkout = () => {
  const {
    cartItems,
    getCartAmount,
    checkout, // Changed from checkout to createOrder to match your backend
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
  const [preorderItems, setPreorderItems] = useState([]);
  const [error, setError] = useState(null);

  // Calculate totals
  const subtotal = getCartAmount();
  const shippingCosts = {
    standard: 0,
    express: 2000,
    pickup: 0,
  };
  const shipping = shippingCosts[shippingMethod];
  const total = subtotal + shipping;

  useEffect(() => {
    // Check for preorder items - updated logic
    const preorderItemsList = Object.values(cartItems).filter(
      (item) => item.isPreorder === true
    );

    setPreorderItems(preorderItemsList);

    // Set default address
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddr =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr);
    }
  }, [cartItems, addresses, selectedAddress]);

  const hasPreorderItems = preorderItems.length > 0;

  const handlePayment = async () => {
    // In your checkout component, add this to debug:
    console.log('Cart items:', cartItems);
    console.log(
      'Items being sent to backend:',
      Object.values(cartItems).map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        selectedAttributes: item.selectedAttributes,
        isPreorder: item.isPreorder || false,
      }))
    );
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      setError('Your cart is empty');
      return;
    }

    setError(null); // Clear any previous errors

    const addressData = {
      fullName: selectedAddress.fullName,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      phone: selectedAddress.phone,
      email: selectedAddress.email || user?.email,
    };

    // Updated to not pass isPreorder as a single flag
    const order = await checkout(addressData, shippingMethod, orderNotes);

    if (order) {
      // Order created successfully, navigate to payment or success page
      navigate('/payment', { state: { order } });
    } else {
      setError('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen  text-primary relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-900 bg-opacity-50 text-white p-4 rounded-lg mb-6 flex items-center gap-3">
            <FaInfoCircle className="text-red-400" />
            {error}
          </div>
        )}

        {/* Preorder Warning */}
        {hasPreorderItems && (
          <div className="bg-yellow-900 bg-opacity-50 text-yellow-200 p-4 rounded-lg mb-6 flex items-start gap-3">
            <FaInfoCircle className="text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Pre-order Items Detected</h3>
              <p className="text-sm">
                Your order contains {preorderItems.length} pre-order item(s)
                which will require additional processing time (7-14 days). These
                items will be shipped when available.
              </p>
              <ul className="text-xs mt-2 space-y-1">
                {preorderItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>•</span>
                    <span>{item.productName || item.title}</span>
                    <span className="text-yellow-300">
                      (Qty: {item.quantity})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delivery Address</h2>
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddress(null);
                  }}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary font-medium"
                >
                  <FaPlus /> Add New
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-900 mb-4">No saved addresses</p>
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
                          ? 'bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="mt-1">
                            {selectedAddress?._id === address._id ? (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <FaCheck className="text-light text-xs" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-900 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 font-medium">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{address.label}</h3>
                              {address.isDefault && (
                                <span className="text-xs bg-gray-900 text-light px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-primary">
                              {address.fullName}
                            </p>
                            <p className="text-sm text-gray-800">
                              {address.address}, {address.city}, {address.state}{' '}
                              {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-800">
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
                          className="text-primary hover:text-gray-700"
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
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 border  rounded-lg cursor-pointer hover:border-gray-600 transition ${
                    shippingMethod === 'standard' ? 'border-gray-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-primary "
                    />
                    <div>
                      <h3 className="font-medium">Standard Shipping</h3>
                      <p className="text-sm text-gray-600">
                        {hasPreorderItems
                          ? '7-14 days (includes preorder processing)'
                          : '3-5 business days'}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">Free</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-lg transition cursor-pointer
  ${
    hasPreorderItems
      ? 'border border-gray-300 opacity-50 cursor-not-allowed'
      : 'border  hover:border-gray-600'
  }
  ${
    shippingMethod === 'express' && !hasPreorderItems
      ? 'border-2 border-black'
      : ''
  }
`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-primary"
                      disabled={hasPreorderItems}
                    />
                    <div>
                      <h3 className="font-medium">Express Shipping</h3>
                      <p className="text-sm text-gray-600">
                        1-2 business days
                        {hasPreorderItems && ' (Not available for pre-orders)'}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">₦2,000</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border  rounded-lg cursor-pointer hover:border-gray-600 transition ${
                    shippingMethod === 'pickup' ? 'border-gray-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingMethod === 'pickup'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-primary"
                    />
                    <div>
                      <h3 className="font-medium">Store Pickup</h3>
                      <p className="text-sm text-gray-600">
                        {hasPreorderItems
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
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Notes (Optional)</h2>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Add any special instructions for your order..."
                rows={3}
                className="w-full px-4 py-3 bg-light border border-gray-400 rounded-lg text-primary focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto font-medium">
                {Object.entries(cartItems).map(([key, item]) => (
                  <div key={key} className="flex gap-3">
                    <img
                      src={item.productImage || item.image}
                      alt={item.productName || item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        {item.productName || item.title}
                      </h4>
                      {item.selectedAttributes &&
                        Object.keys(item.selectedAttributes).length > 0 && (
                          <p className="text-xs text-gray-700">
                            {Object.entries(item.selectedAttributes)
                              .filter(([value]) => value)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')}
                          </p>
                        )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-700">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-medium">
                          ₦
                          {(
                            (item.unitPrice || item.finalPrice) * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                      {!!item.isPreorder && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs bg-yellow-900 text-yellow-200 px-2 py-1 rounded">
                            Pre-order
                          </span>
                          {!!item.estimatedDelivery && (
                            <span className="text-xs text-gray-600">
                              ({item.estimatedDelivery})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 py-4 border-t border-gray-400 font-medium">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800">Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
                {hasPreorderItems && (
                  <div className="text-xs text-yellow-700 py-2 border-t border-gray-400">
                    <FaInfoCircle className="inline mr-1" />
                    This order contains {preorderItems.length} pre-order item(s)
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-400">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="p-4 bg-light border-2 border-primary rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://assets.paystack.com/assets/img/logos/paystack-logo-white.svg"
                      alt="Paystack"
                      className="h-6"
                    />
                  </div>
                  <span className="text-sm text-primary">Secure Payment</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading || orderProcessing || !selectedAddress}
                className={`w-full py-4 rounded-lg font-medium transition ${
                  loading || orderProcessing || !selectedAddress
                    ? 'bg-gray-700 text-gray-900 cursor-not-allowed'
                    : 'bg-primary text-light hover:bg-gray-600'
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
                  `Pay ₦${total.toLocaleString()}`
                )}
              </button>

              {!selectedAddress && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Please select a delivery address
                </p>
              )}

              {/* Security Note */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-800">
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
