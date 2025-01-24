import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/images/assets';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadModal = ({ isOpen, onClose }) => {
  const [billingType, setBillingType] = useState('yearly'); // 'yearly' or 'monthly'

  const modalRef = useRef();

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Wrap modal content
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <div className="fixed inset-0 bg-black/80 flex  items-center justify-center z-50 p-4">
            <div className="bg-black border border-white/10 rounded-lg max-w-[1250px] w-full md:h-[800px] overflow-hidden]">
              {/* Modal Content */}
              <div className="md:flex block md:h-full">
                {/* Left side - Image */}
                <div className="md:w-1/2 w-full md:h-full">
                  <img
                    src={assets.blogEight}
                    alt="Premium Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right side - Content */}
                <div className="md:w-1/2 w-full py-12 flex flex-col items-start justify-center space-y-6 md:h-full  align-middle px-12">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Premium, ready to use images.
                    </h2>
                    <h3 className="text-xl text-white">
                      Get unlimited access.
                    </h3>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 text-white">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Members-only content added monthly
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Unlimited royalty-free downloads
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Illustrations{' '}
                      <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded">
                        New
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Enhanced legal protections
                    </li>
                  </ul>

                  {/* Billing Toggle */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-black/40 p-1 rounded">
                      <button
                        onClick={() => setBillingType('yearly')}
                        className={`px-4 py-1 rounded text-sm ${
                          billingType === 'yearly'
                            ? 'bg-green-500 text-white'
                            : 'text-white/60'
                        }`}
                      >
                        Yearly
                      </button>
                      <button
                        onClick={() => setBillingType('monthly')}
                        className={`px-4 py-1 rounded text-sm ${
                          billingType === 'monthly'
                            ? 'bg-green-500 text-white'
                            : 'text-white/60'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl text-white/90">$</span>
                      <span className="text-4xl font-medium text-white/90">
                        {billingType === 'yearly' ? '7' : '20'}
                      </span>
                      <span className="text-white/60 ml-1">/mo</span>
                    </div>
                    {billingType === 'yearly' && (
                      <div className="text-sm text-white/60">per month*</div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-white text-black font-medium py-3 rounded hover:bg-white/90 transition-colors">
                    Get THE BlackRose+
                  </button>

                  {/* Terms */}
                  <p className="text-xs text-white/60 text-center">
                    * Billed yearly. Cancel anytime. View our terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
DownloadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DownloadModal;
