/* eslint-disable react/prop-types */

import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTimes } from 'react-icons/fa';

const OrderCancellationModal = ({ order, onClose, onSuccess }) => {
  const { cancelOrder } = useContext(ShopContext);
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reasons = [
    'Changed my mind',
    'Found a better price',
    'Ordered by mistake',
    'Shipping time too long',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalReason = reason === 'Other' ? otherReason : reason;
    if (!finalReason.trim()) {
      return;
    }

    setSubmitting(true);
    const success = await cancelOrder(order._id, finalReason);

    if (success) {
      onSuccess();
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-4 lg:p-6 mb-8 border border-gray-200 shadow-md max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Cancel Order</h2>
            <button
              onClick={onClose}
              className="text-gray-800 hover:text-primary"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-800 mb-2">
              Are you sure you want to cancel this order?
            </p>
            <p className="text-sm text-gray-900">
              Order: {order.orderNumber || `#${order._id.substring(0, 8)}`}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Reason for cancellation
              </label>
              <div className="space-y-2">
                {reasons.map((r) => (
                  <label key={r} className="flex items-center">
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                      className="mr-2"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {reason === 'Other' && (
              <div className="mb-4">
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Please specify..."
                  rows={3}
                  className="w-full px-4 py-2 bg-light border border-gray-400 rounded-lg text-primary focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!reason || submitting}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  !reason || submitting
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {submitting ? 'Cancelling...' : 'Cancel Order'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-600 text-primary rounded-lg hover:border-white transition"
              >
                Keep Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderCancellationModal;
