import { useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const {
    fetchOrders,
    orders,
    selectedOrder,
    setSelectedOrder,
    ordersLoading,
    formatOrderDate,
    getOrderStatusColor,
    getPaymentStatusColor,
    resetOrdersLoading,
    token,
  } = useContext(ShopContext);

  // Use useCallback to prevent dependency issues
  const loadOrders = useCallback(async () => {
    if (token) {
      await fetchOrders();
    }
  }, [token, fetchOrders]);

  useEffect(() => {
    loadOrders();
    // Cleanup function to reset loading state on unmount
    return () => {
      resetOrdersLoading();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Only depend on token to avoid refetching loop

  return (
    <div className="container">
      <main className="relative md:mt-10 mt-0 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 && !ordersLoading ? (
          <div className="text-center py-12 border border-gray-800 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
            <p className="text-gray-400 mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="bg-white text-black px-6 py-3 rounded inline-block hover:bg-gray-200 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="md:col-span-1">
              <div className="border border-gray-800 rounded-md overflow-hidden">
                <div className="bg-gray-900 p-4 border-b border-gray-800">
                  <h2 className="font-medium">Your Orders</h2>
                </div>
                <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
                  {ordersLoading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto"></div>
                      <p className="mt-2 text-gray-400">Loading orders...</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className={`p-4 cursor-pointer hover:bg-gray-900 transition ${
                          selectedOrder?._id === order._id ? 'bg-gray-900' : ''
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-gray-400">
                              Order #{order._id.substring(0, 8)}
                            </div>
                            <div className="font-medium mt-1">
                              {formatOrderDate(order.date)}
                            </div>
                            <div className="text-sm mt-1">
                              ₦{Number(order.amount).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div
                              className={`px-2 py-1 rounded-full text-xs text-center text-white ${getOrderStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-center text-xs text-white ${getPaymentStatusColor(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="md:col-span-2">
              {selectedOrder ? (
                <div className="border border-gray-800 rounded-md">
                  <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="font-medium">Order Details</h2>
                    <div className="flex space-x-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs text-white ${getOrderStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs text-white ${getPaymentStatusColor(
                          selectedOrder.paymentStatus
                        )}`}
                      >
                        {selectedOrder.paymentStatus}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Order ID: </span>
                        <span>#{selectedOrder._id}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Date: </span>
                        <span>{formatOrderDate(selectedOrder.date)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm text-gray-400 mb-2">
                          Shipping Address
                        </h3>
                        <div className="space-y-1">
                          <p className="font-medium">
                            {selectedOrder.address.fullName}
                          </p>
                          <p>{selectedOrder.address.address}</p>
                          <p>
                            {selectedOrder.address.city},{' '}
                            {selectedOrder.address.state}{' '}
                            {selectedOrder.address.zipCode}
                          </p>
                          <p className="mt-2">{selectedOrder.address.phone}</p>
                          <p>{selectedOrder.address.email}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm text-gray-400 mb-2">
                          Payment Information
                        </h3>
                        <div className="space-y-1">
                          <p>
                            <span className="text-gray-400">Method: </span>
                            {selectedOrder.paymentMethod}
                          </p>
                          <p>
                            <span className="text-gray-400">Reference: </span>
                            {selectedOrder.paymentReference || 'N/A'}
                          </p>

                          {selectedOrder.paymentDetails && (
                            <>
                              <p>
                                <span className="text-gray-400">Card: </span>
                                {
                                  selectedOrder.paymentDetails.authorization
                                    ?.brand
                                }{' '}
                                ****
                                {
                                  selectedOrder.paymentDetails.authorization
                                    ?.last4
                                }
                              </p>
                              <p>
                                <span className="text-gray-400">Bank: </span>
                                {selectedOrder.paymentDetails.authorization
                                  ?.bank || 'N/A'}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-sm text-gray-400 mb-4">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex space-x-4 pb-4 border-b border-gray-800"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-gray-400 text-sm mt-1">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ₦{Number(item.price).toLocaleString()}
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                ₦
                                {Number(
                                  item.price * item.quantity
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span>
                            ₦
                            {Number(
                              selectedOrder.amount - selectedOrder.amount * 0.1
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax (10%)</span>
                          <span>
                            ₦
                            {Number(
                              selectedOrder.amount * 0.1
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping</span>
                          <span>₦0</span>
                        </div>
                        {selectedOrder.discount && (
                          <div className="flex justify-between text-green-500">
                            <span>
                              Discount ({selectedOrder.discount.code})
                            </span>
                            <span>
                              -₦
                              {Number(
                                selectedOrder.discount.amount
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold pt-2 border-t border-gray-800 mt-2">
                          <span>Total</span>
                          <span>
                            ₦{Number(selectedOrder.amount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">
                      <button
                        onClick={() => window.print()}
                        className="bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
                      >
                        Print Receipt
                      </button>
                      <Link
                        to="/contact"
                        className="bg-white text-black px-6 py-2 rounded text-center hover:bg-gray-200 transition"
                      >
                        Need Help?
                      </Link>
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className="border border-gray-800 rounded-md p-10 text-center">
                  <p className="text-gray-400">
                    Select an order to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
