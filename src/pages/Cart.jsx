// pages/Cart.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartAmount } =
    useContext(ShopContext);

  const navigate = useNavigate();
  const isCartEmpty = Object.keys(cartItems).length === 0;
  const subtotal = getCartAmount();

  const handleQuantityChange = async (cartKey, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(cartKey);
    } else {
      await updateQuantity(cartKey, newQuantity);
    }
  };

  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
        <div className="text-center">
          <div className="mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v8m0-8L8.5 21.5"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Link
            to="/shop"
            className="bg-white text-black px-8 py-3 rounded-lg inline-block hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-2 lg:p-4 mb-8 border border-gray-200 overflow-hidden shadow">
              <div className="p-4 border-b border-gray-300">
                <h2 className="font-medium">
                  Cart Items ({Object.keys(cartItems).length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {Object.entries(cartItems).map(([cartKey, item]) => (
                  <div key={cartKey} className="p-4 bg-white">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link to={`/shop/${item.productId}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Link
                            to={`/shop/${item.productId}`}
                            className="font-medium text-gray-900 hover:text-gray-700 transition"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(cartKey)}
                            className="text-red-500 hover:text-red-600 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        {/* Variant Details */}
                        {item.selectedAttributes &&
                          Object.keys(item.selectedAttributes).length > 0 && (
                            <div className="text-sm text-gray-500 mb-2">
                              {Object.entries(item.selectedAttributes)
                                .filter(
                                  ([value]) =>
                                    value &&
                                    (typeof value !== 'object' ||
                                      Object.keys(value).length)
                                )
                                .map(([key, value]) => (
                                  <span key={key} className="mr-3">
                                    {key}:{' '}
                                    {typeof value === 'object'
                                      ? JSON.stringify(value)
                                      : String(value)}
                                  </span>
                                ))}
                            </div>
                          )}

                        <div className="flex justify-between items-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(cartKey, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center  border border-primary rounded text-primary hover:bg-primary font-medium hover:text-white transition-colors"
                            >
                              <FaMinus size={12} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  cartKey,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="text-primary w-10 text-center font-medium"
                              min="1"
                              max={item.availableStock || 99}
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(cartKey, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center  border border-primary rounded text-primary hover:bg-primary font-medium hover:text-white transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.availableStock && item.availableStock <= 5 && (
                          <p className="text-xs text-red-500 mt-2">
                            Only {item.availableStock} left in stock
                          </p>
                        )}

                        {/* Pre-order Notice */}
                        {!item.isAvailable && (
                          <p className="text-xs text-primary mt-2">
                            Pre-order item - Ships in 7–14 days
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 lg:p-8 mb-8 border border-gray-200 shadow-sm sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 font-medium">
                <div className="flex justify-between">
                  <span className="text-gray-900">Subtotal</span>
                  <span className="text-gray-900">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Shipping</span>
                  <span className="text-gray-900">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Tax</span>
                  <span className="text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Estimated Total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/70 transition"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="text-sm text-gray-600 hover:text-primary transition font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
