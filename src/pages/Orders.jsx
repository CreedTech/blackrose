

// pages/Orders.jsx
import { useEffect, useContext, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaDownload, FaEye, FaTimes, FaCheck } from 'react-icons/fa';
import OrderCancellationModal from '../component/OrderCancellationModal';
import StatusFilters from './StatusFilters';

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
    selectedOrders,
    toggleOrderSelection,
    selectAllOrders,
    exportSelectedOrders,
    token,
  } = useContext(ShopContext);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    if (token) {
      const status = filterStatus === 'all' ? null : filterStatus;
      fetchOrders(status);
    }
  }, [token, filterStatus]);

  const handleCancelOrder = (order) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };
  const handleCancelOrderSuccess = () => {
    setShowCancelModal(false);
    setOrderToCancel(null);
    const status = filterStatus === 'all' ? null : filterStatus;
    fetchOrders(status);
  };

  const canCancelOrder = (order) => {
    return (
      ['pending', 'confirmed'].includes(order.status) &&
      order.paymentStatus !== 'refunded'
    );
  };

  const getEstimatedDelivery = (order) => {
    if (order.fulfillmentMethod === 'preorder') {
      return '7-14 days';
    }
    if (order.estimatedDeliveryDate) {
      return new Date(order.estimatedDeliveryDate).toLocaleDateString();
    }
    return '3-5 days';
  };
  function OrdersList({ statusFilter }) {
    // const allOrders = [
    //   /* … */
    // ];
    const filtered = orders?.filter((o) =>
      statusFilter === 'all' ? true : o.status === statusFilter
    );
    console.log(filtered);

    return (
      <ul>
        {filtered.map((o) => (
          <li key={o.id}>
            {o.id} – {o.status}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="min-h-screen  text-primary relative font-medium">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between flex-col md:flex-row items-center mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>

          {orders.length > 0 && (
            <div className="flex gap-4 mt-4 md:mt-0 ">
              <button
                onClick={selectAllOrders}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-primary hover:text-light text-primary transition"
              >
                {selectedOrders.length === orders.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
              <button
                onClick={exportSelectedOrders}
                disabled={selectedOrders.length === 0}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  selectedOrders.length > 0
                    ? 'bg-primary text-light hover:bg-gray-800'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaDownload />
                Export Selected ({selectedOrders.length})
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {/* <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            'all',
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled',
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize transition whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-primary text-light'
                  : 'bg-light hover:bg-gray-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div> */}
        <StatusFilters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        {/* <OrdersList statusFilter={filterStatus} /> */}

        {orders.length === 0 && !ordersLoading ? (
          <div className="text-center py-12 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-4 lg:p-6 mb-8 border border-gray-200  shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-900 mb-4"
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
            <p className="text-gray-700 mb-6">
              {filterStatus === 'all'
                ? "You haven't placed any orders yet."
                : `No ${filterStatus} orders found.`}
            </p>
            <Link
              to="/shop"
              className="bg-primary text-light px-6 py-3 rounded-lg inline-block hover:bg-gray-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-4 lg:p-6 mb-8 border border-gray-200 shadow-md overflow-hidden">
                <div className="p-4 ">
                  <h2 className="font-medium">Your Orders ({orders.length})</h2>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {ordersLoading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-gray-900">Loading orders...</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-300">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className={`p-4  hover:bg-gray-200 transition ${
                            selectedOrder?._id === order._id
                              ? 'bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 shadow-md rounded-lg '
                              : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(order._id)}
                              onChange={() => toggleOrderSelection(order._id)}
                              className="mt-1 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div
                              className="flex-1"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-sm text-gray-600">
                                    {order.orderNumber ||
                                      `#${order._id.substring(0, 8)}`}
                                  </div>
                                  <div className="font-medium mt-1">
                                    {formatOrderDate(order.date)}
                                  </div>
                                  <div className="text-sm mt-1">
                                    ₦{Number(order.amount).toLocaleString()}
                                  </div>
                                  {order.fulfillmentMethod === 'preorder' && (
                                    <div className="text-xs text-yellow-700 mt-1">
                                      Pre-order
                                    </div>
                                  )}
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
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2 font-medium">
              {selectedOrder ? (
                <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-4 lg:p-6 mb-8 border border-gray-200 shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-300 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center sm:gap-0">
                    <h2 className="font-medium text-lg text-center sm:text-left">
                      Order Details –{' '}
                      {selectedOrder.orderNumber || `#${selectedOrder._id}`}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`px-3 py-1 rounded-full text-xs text-white ${getOrderStatusColor(
                            selectedOrder.status
                          )}`}
                        >
                          {selectedOrder.status}
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs text-white ${getPaymentStatusColor(
                            selectedOrder.paymentStatus
                          )}`}
                        >
                          {selectedOrder.paymentStatus}
                        </div>
                      </div>
                      {canCancelOrder(selectedOrder) && (
                        <button
                          onClick={() => handleCancelOrder(selectedOrder)}
                          className="text-red-400 hover:text-red-300 text-sm self-end sm:self-auto"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <span className="text-primary font-bold">
                          Order Date:{' '}
                        </span>
                        <span>{formatOrderDate(selectedOrder.date)}</span>
                      </div>
                      <div>
                        <span className="text-primary font-bold">
                          Estimated Delivery:{' '}
                        </span>
                        <span>{getEstimatedDelivery(selectedOrder)}</span>
                      </div>
                      {/* {selectedOrder.tracking?.trackingNumber && (
                        <>
                          <div>
                            <span className="text-primary font-bold">Carrier: </span>
                            <span>{selectedOrder.tracking.carrier}</span>
                          </div>
                          <div>
                            <span className="text-primary font-bold">Tracking: </span>
                            <a
                              href={selectedOrder.tracking.trackingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {selectedOrder.tracking.trackingNumber}
                            </a>
                          </div>
                        </>
                      )} */}
                    </div>

                    {/* Status Timeline */}
                    {selectedOrder.statusHistory &&
                      selectedOrder.statusHistory.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-sm text-primary font-bold mb-4">
                            Order Timeline
                          </h3>
                          <div className="space-y-3">
                            {selectedOrder.statusHistory.map(
                              (history, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <span className="font-medium capitalize">
                                        {history.status}
                                      </span>
                                      <span className="text-sm text-primary ">
                                        {new Date(
                                          history.timestamp
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                    {history.note && (
                                      <p className="text-sm text-gray-800 mt-1">
                                        {history.note}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Addresses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-sm text-gray-700 mb-2">
                          Shipping Address
                        </h3>
                        <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200  bg-light p-4 ">
                          <p className="font-medium">
                            {selectedOrder.shippingAddress?.fullName}
                          </p>
                          <p className="text-sm mt-1">
                            {selectedOrder.shippingAddress?.address}
                          </p>
                          <p className="text-sm">
                            {selectedOrder.shippingAddress?.city},{' '}
                            {selectedOrder.shippingAddress?.state}{' '}
                            {selectedOrder.shippingAddress?.zipCode}
                          </p>
                          <p className="text-sm mt-2">
                            {selectedOrder.shippingAddress?.phone}
                          </p>
                          <p className="text-sm">
                            {selectedOrder.shippingAddress?.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm text-gray-700 mb-2">
                          Payment Information
                        </h3>
                        <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200  bg-light p-4 ">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Method:</span>
                              <span className="capitalize">
                                {selectedOrder.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Status:</span>
                              <span className="capitalize">
                                {selectedOrder.paymentStatus}
                              </span>
                            </div>
                            {selectedOrder.paymentReference && (
                              <div className="flex justify-between">
                                <span className="text-gray-700">
                                  Reference:
                                </span>
                                <span className="text-xs">
                                  {selectedOrder.paymentReference}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="text-sm text-gray-700 mb-4">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200  p-4 "
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-base">
                                {item.title}
                              </h4>
                              {item.selectedAttributes &&
                                Object.keys(item.selectedAttributes).length >
                                  0 && (
                                  <div className="text-sm text-gray-800 mt-1">
                                    {Object.entries(item.selectedAttributes)
                                      .filter(([value]) => value)
                                      .map(([key, value]) => (
                                        <span key={key} className="mr-3">
                                          {key}: {value}
                                        </span>
                                      ))}
                                  </div>
                                )}
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm">
                                  Qty: {item.quantity}
                                </span>
                                <div className="text-right">
                                  <div className="font-medium">
                                    ₦
                                    {Number(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </div>
                                  {item.discount > 0 && (
                                    <div className="text-xs text-gray-700 line-through">
                                      ₦
                                      {Number(
                                        item.price * item.quantity
                                      ).toLocaleString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {item.itemStatus &&
                                item.itemStatus !== 'pending' && (
                                  <div className="mt-2">
                                    <span
                                      className={`text-xs px-3 py-1.5 rounded-full ${
                                        item.itemStatus === 'delivered'
                                          ? 'bg-green-900 text-green-300'
                                          : item.itemStatus === 'shipped'
                                          ? 'bg-blue-900 text-blue-300'
                                          : 'bg-primary text-light'
                                      }`}
                                    >
                                      {item.itemStatus}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 pt-6 border-t border-gray-830">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-800">Subtotal</span>
                          <span>
                            ₦{Number(selectedOrder?.subtotal).toLocaleString()}
                          </span>
                        </div>
                        {selectedOrder.discount?.appliedAmount > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span>
                              Discount ({selectedOrder.discount.code})
                            </span>
                            <span>
                              -₦
                              {Number(
                                selectedOrder.discount.appliedAmount
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {selectedOrder.shipping?.cost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-800">Shipping</span>
                            <span>
                              ₦
                              {Number(
                                selectedOrder.shipping.cost
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {selectedOrder.tax?.amount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-800">Tax</span>
                            <span>
                              ₦
                              {Number(
                                selectedOrder.tax.amount
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300">
                          <span>Total</span>
                          <span>
                            ₦{Number(selectedOrder.amount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Notes */}
                    {selectedOrder.customerNotes && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl lg:p-6 mb-8 border border-gray-200">
                        <h4 className="text-md text-primary mb-2">
                          Order Notes
                        </h4>
                        <p className="text-sm">{selectedOrder.customerNotes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      <button
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-primary rounded-lg hover:bg-gray-800 text-light transition"
                      >
                        Print Receipt
                      </button>
                      {selectedOrder.status === 'delivered' && (
                        <Link
                          to={`/orders/${selectedOrder._id}/review`}
                          className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
                        >
                          Review Items
                        </Link>
                      )}
                      <Link
                        to="/contact"
                        className="px-6 py-2 border border-gray-600 rounded-lg hover:border-white transition"
                      >
                        Need Help?
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl  lg:p-6 mb-8 border border-gray-200 shadow-md p-10 text-center">
                  <FaEye className="text-4xl text-gray-900 mx-auto mb-4" />
                  <p className="text-gray-800">
                    Select an order to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cancel Order Modal */}
        {/* {showCancelModal && (
          <OrderCancellationModal
            order={orderToCancel}
            onClose={() => {
              setShowCancelModal(false);
              setOrderToCancel(null);
            }}
            onSuccess={() => {
              setShowCancelModal(false);
              setOrderToCancel(null);
              loadOrders();
            }}
          />
        )} */}
        {showCancelModal && (
          <OrderCancellationModal
            order={orderToCancel}
            onClose={() => {
              setShowCancelModal(false);
              setOrderToCancel(null);
            }}
            onSuccess={handleCancelOrderSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
