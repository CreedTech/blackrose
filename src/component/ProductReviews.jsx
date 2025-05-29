/* eslint-disable react/prop-types */
// components/ProductReviews.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';


const ProductReviews = ({ product }) => {
  const { addProductReview, user } = useContext(ShopContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    setSubmitting(true);
    const success = await addProductReview(product._id, rating, comment);
    
    if (success) {
      setShowReviewForm(false);
      setRating(5);
      setComment('');
      // Refresh the page to show new review
      window.location.reload();
    }
    setSubmitting(false);
  };

  const renderRatingDistribution = () => {
    const distribution = [5, 4, 3, 2, 1].map(stars => {
      const count = product.reviews.filter(r => r.rating === stars).length;
      const percentage = product.reviews.length > 0 
        ? (count / product.reviews.length) * 100 
        : 0;
      
      return { stars, count, percentage };
    });

    return distribution.map(({ stars, count, percentage }) => (
      <div key={stars} className="flex items-center gap-3">
        <div className="flex items-center gap-1 w-20">
          <span className="text-sm">{stars}</span>
          <FaStar className="text-yellow-400 text-sm" />
        </div>
        <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-yellow-400 h-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-400 w-12 text-right">{count}</span>
      </div>
    ));
  };

  return (
    <div>
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">
            {product.averageRating || '0.0'}
          </div>
          <div className="flex justify-center mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar 
                key={star} 
                className={`text-2xl ${
                  star <= Math.round(product.averageRating || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-400">
            Based on {product.reviewCount || 0} reviews
          </p>
        </div>

        <div className="col-span-2 space-y-2">
          {renderRatingDistribution()}
        </div>
      </div>

      {/* Add Review Button */}
      {user && !showReviewForm && (
        <div className="mb-8">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-3xl transition-colors"
                  >
                    {star <= (hoveredRating || rating) ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white transition relative"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 rounded-lg transition ${
                  submitting
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReviewForm(false);
                  setRating(5);
                  setComment('');
                }}
                className="px-6 py-2 border border-gray-600 rounded-lg hover:border-white transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-800 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium">
                      {review.userId?.name || 'Anonymous'}
                    </h4>
                    {review.verifiedPurchase && (
                      <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          className={`text-sm ${
                            star <= review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;