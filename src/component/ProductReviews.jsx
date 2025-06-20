/* eslint-disable react/prop-types */

import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaStar, FaUser, FaQuoteLeft } from 'react-icons/fa';
import { HiCheckCircle, HiSparkles } from 'react-icons/hi';
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
      window.location.reload();
    }
    setSubmitting(false);
  };

  const renderRatingDistribution = () => {
    const distribution = [5, 4, 3, 2, 1].map((stars) => {
      const count =
        product.reviews?.filter((r) => r.rating === stars).length || 0;
      const percentage =
        product.reviews?.length > 0
          ? (count / product.reviews.length) * 100
          : 0;

      return { stars, count, percentage };
    });

    return distribution.map(({ stars, count, percentage }) => (
      <div key={stars} className="flex items-center md:gap-4 group">
        <div className="flex items-center gap-2 w-10">
          <span className="font-bold text-primary">{stars}</span>
          <FaStar className="text-amber-400 text-sm" />
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-700 group-hover:from-amber-500 group-hover:to-orange-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-bold text-primary w-6 text-right">
          {count}
        </span>
      </div>
    ));
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={
              interactive ? () => setHoveredRating(star) : undefined
            }
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
            className={`transition-all duration-200 ${
              interactive ? 'hover:scale-125 cursor-pointer' : ''
            }`}
            disabled={!interactive}
          >
            <FaStar
              className={`text-xl ${
                star <= (interactive ? hoveredRating || rating : rating)
                  ? 'text-amber-400'
                  : 'text-gray-300'
              } ${interactive ? 'hover:text-amber-500' : ''}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Premium Review Summary */}
      <div className="  rounded-lg p-8  ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:border-r border-primary">
            <div className="mb-4">
              <div className="text-6xl font-black text-primary mb-2">
                {product.averageRating || '0.0'}
              </div>
              <div className="flex justify-center mb-3">
                {renderStars(Math.round(product.averageRating || 0))}
              </div>
              <p className="text-primary font-semibold">
                Based on {product.reviewCount || 0} review
                {product.reviewCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Customer satisfaction indicator */}
            <div className=" backdrop-blur-sm rounded-lg p-2 border-2 bg-primary border-primary lg:mr-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HiSparkles className="text-light" />
                <span className="font-bold text-light">
                  Customer Satisfaction
                </span>
              </div>
              <div className="text-2xl font-black text-light">
                {product.averageRating
                  ? Math.round((product.averageRating / 5) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2 lg:pl-8">
            <h4 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <FaStar className="text-amber-500" />
              Rating Breakdown
            </h4>
            <div className="space-y-4">{renderRatingDistribution()}</div>
          </div>
        </div>
      </div>

      {/* Write Review Section */}
      {user && !showReviewForm && (
        <div className="">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6">
              Help others make informed decisions by sharing your honest review.
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="group relative px-8 py-4 border border-transparent hover:border-black transition-all duration-300 ease-in-out bg-black text-white rounded-lg font-bold text-lg  overflow-hidden"
            >
              <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0"></span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-black transition-colors duration-300">
                <FaQuoteLeft />
                Write a Review
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Write Your Review
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Rating Selection */}
              <div className="text-center">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  How would you rate this product?
                </label>
                <div className="flex justify-center mb-4">
                  {renderStars(rating, true)}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {rating === 5 && 'Excellent! ⭐'}
                  {rating === 4 && 'Very Good! 👍'}
                  {rating === 3 && 'Good 👌'}
                  {rating === 2 && 'Fair 😐'}
                  {rating === 1 && 'Poor 👎'}
                </p>
              </div>

              {/* Comment Field */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Tell us about your experience
                </label>
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={6}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-lg text-primary font-medium focus:outline-none focus:border-primary transition-all duration-300 resize-none "
                    placeholder="Share your experience with this product. What did you like? How was the quality? Would you recommend it to others?"
                    required
                    maxLength={500}
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {comment.length}/500
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 flex-col md:flex-row">
                <button
                  type="submit"
                  disabled={submitting || !comment.trim()}
                  className={`group relative flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 overflow-hidden ${
                    submitting || !comment.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {!submitting && comment.trim() && (
                    <>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500 rounded-2xl"></div>
                    </>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <HiCheckCircle />
                        Publish Review
                      </>
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setRating(5);
                    setComment('');
                  }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <FaQuoteLeft className="text-primary" />
          Customer Reviews
        </h3>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="transition-all duration-300">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <FaUser className="text-white text-lg" />
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {review.userId?.name || 'Anonymous Customer'}
                          </h4>
                          {!!review.verifiedPurchase && (
                            <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                              <HiCheckCircle className="text-sm" />
                              <span className="text-xs font-bold">
                                Verified Purchase
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-6 border border-gray-100">
                      <p className="text-primary leading-relaxed text-lg font-medium">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaQuoteLeft className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Be the first to share your experience with this product!
              </p>
              {user && !showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="group relative px-8 py-4 border border-transparent hover:border-black transition-all duration-300 ease-in-out bg-black text-white rounded-lg font-bold text-lg  overflow-hidden"
                >
                  <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0"></span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-black transition-colors duration-300">
                    Write the First Review
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
