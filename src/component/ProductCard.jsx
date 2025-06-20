/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaEye,
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    currency,
    token,
  } = useContext(ShopContext);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product._id, 1);
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xs transition-colors ${
              i < Math.floor(rating)
                ? 'text-amber-400'
                : i < rating
                ? 'text-amber-300'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div
        className="group relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:bg-white/80 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-purple-50/30 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative flex flex-col sm:flex-row gap-6 p-6">
          {/* Image Section */}
          <Link
            to={`/shop/${product._id}`}
            className="flex-shrink-0 relative group/image"
          >
            <div className="relative overflow-hidden rounded-lg">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse rounded-lg"></div>
              )}

              <img
                src={product.images?.[0] || product.image}
                alt={product.title}
                className={`w-full sm:w-32 md:w-48 h-40 sm:h-32 md:h-48 object-cover rounded-lg transition-all duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Shimmer effect on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-1000 ${
                  isHovered ? 'translate-x-full' : ''
                }`}
                style={{ transform: 'skewX(-20deg)' }}
              ></div>

              {/* Floating badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.bestseller && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                    <span className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                      <HiSparkles className="text-xs animate-spin" />
                      Bestseller
                    </span>
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-md opacity-75"></div>
                    <span className="relative bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Content Section */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0 pr-4">
                <Link
                  to={`/shop/${product._id}`}
                  className="block text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent hover:from-primary/60 hover:to-primary/80 transition-all duration-500 line-clamp-2 leading-tight mb-2"
                >
                  {product.title}
                </Link>
                {product.brand && (
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {product.brand}
                  </p>
                )}
              </div>

              <button
                onClick={handleWishlistToggle}
                className="group/heart relative p-3 rounded-2xl hover:bg-red-50 transition-all duration-300 hover:scale-110"
              >
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isInWishlist(product._id)
                      ? 'bg-red-100 scale-100'
                      : 'bg-transparent scale-0 group-hover/heart:scale-100 group-hover/heart:bg-red-50'
                  }`}
                ></div>
                {isInWishlist(product._id) ? (
                  <FaHeart className="relative text-red-500 text-lg animate-pulse" />
                ) : (
                  <FaRegHeart className="relative text-gray-400 group-hover/heart:text-red-500 text-lg transition-colors" />
                )}
              </button>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-auto">
              <div className="space-y-3">
                <div className="flex items-baseline gap-3 flex-col">
                  {product.discount > 0 && (
                    <span className="text-lg text-gray-400 line-through font-medium">
                      {currency}
                      {product.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-black text-primary">
                    {currency}
                    {product.finalPrice.toLocaleString()}
                  </span>
                </div>

                {product.averageRating > 0 && (
                  <div className="flex items-center gap-3">
                    {renderStarRating(product.averageRating)}
                    <span className="text-sm text-gray-600 font-semibold">
                      {product.averageRating.toFixed(1)} ({product.reviewCount}{' '}
                      reviews)
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`group relative px-8 py-2  rounded-lg font-bold text-base transition-all duration-500 overflow-hidden ${
                  product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:shadow-2xl hover:shadow-indigo-500/40 border border-transparent hover:border-black '
                }`}
              >
                {/* Animated white background that slides in from left to right */}
                {product.stock !== 0 && (
                  <div className="absolute left-0 top-0 h-full w-0 group-hover:w-full transition-all duration-500 bg-white z-0"></div>
                )}

                {/* Text that changes color on hover */}
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black flex items-center gap-3">
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View - Premium Design
  return (
    <div
      className="group relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden hover:bg-white/90 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/10 to-gray-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <Link to={`/shop/${product._id}`} className="block relative">
        <div className="aspect-square overflow-hidden relative">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 animate-pulse"></div>
          )}

          <img
            src={product.images?.[0] || product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>

          {/* Shimmer effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ${
              isHovered ? 'translate-x-full' : '-translate-x-full'
            }`}
            style={{ transform: 'skewX(-20deg)' }}
          ></div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestseller && (
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 group-hover/badge:opacity-100 transition-opacity animate-pulse"></div>
              <span className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-1.5 border border-white/30">
                <HiSparkles className="text-xs animate-spin" />
                Best
              </span>
            </div>
          )}
          {product.discount > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-75"></div>
              <span className="relative bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/30">
                <HiLightningBolt className="inline text-xs mr-1" />
                {product.discount}%
              </span>
            </div>
          )}
          {product.stock === 0 && (
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/20">
              Sold Out
            </span>
          )}
        </div>

        {/* Floating Action Buttons */}
        <div
          className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <button
            onClick={handleWishlistToggle}
            className="group/heart relative p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                isInWishlist(product._id)
                  ? 'bg-red-100 scale-100'
                  : 'bg-transparent scale-0 group-hover/heart:scale-100 group-hover/heart:bg-red-50'
              }`}
            ></div>
            {isInWishlist(product._id) ? (
              <FaHeart className="relative text-red-500 text-sm animate-pulse" />
            ) : (
              <FaRegHeart className="relative text-gray-600 group-hover/heart:text-red-500 text-sm transition-colors" />
            )}
          </button>

          <button className="group/eye relative p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl hover:bg-white hover:scale-110 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-transparent group-hover/eye:bg-indigo-50 group-hover/eye:scale-100 scale-0 transition-all duration-300"></div>
            <FaEye className="relative text-gray-600 group-hover/eye:text-primary text-sm transition-colors" />
          </button>
        </div>
      </Link>

      {/* Content Section */}
      <div className="relative p-5 md:p-6">
        <div className="mb-4">
          <Link
            to={`/shop/${product._id}`}
            className="block text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent hover:from-primary/60 hover:to-primary/80 transition-all duration-500 line-clamp-2 leading-tight mb-2"
          >
            {product.title}
          </Link>

          {product.brand && (
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {product.brand}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl md:text-2xl font-black text-primary">
                {currency}
                {product.finalPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  {currency}
                  {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {product.averageRating > 0 && (
              <div className="flex items-center gap-2 mb-1">
                {renderStarRating(product.averageRating)}
                <span className="text-xs text-gray-600 font-medium">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`group/cart relative p-4 rounded-lg transition-all duration-500 overflow-hidden ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:shadow-2xl hover:shadow-indigo-500/50 border border-transparent hover:border-black'
            }`}
            title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          >
            {/* Width-growing white background animation */}
            {product.stock !== 0 && (
              <div className="absolute top-0 left-0 h-full w-0 group-hover/cart:w-full transition-all duration-500 bg-white z-0 rounded-lg"></div>
            )}

            {/* Optional pulsing shimmer layer */}
            {product.stock !== 0 && (
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover/cart:scale-150 group-hover/cart:opacity-0 transition-all duration-500 rounded-full z-0"></div>
            )}

            {/* Icon with color transition */}
            <FaShoppingCart className="relative z-10 text-base transition-colors duration-500 group-hover/cart:text-black" />
          </button>
        </div>

        {/* Additional Product Info */}
        {/* {product?.variants?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                {[...Array(Math.min(3, product.variants.length))].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-400"
                    ></div>
                  )
                )}
                {product.variants.length > 3 && (
                  <span className="text-xs text-gray-500 font-medium ml-1">
                    +{product.variants.length - 3}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {product.variants.length} option
                {product.variants.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )} */}

        {/* {product?.variants && (
          <div className="mt-4 pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                {[...Array(Math.min(3, product.variants))].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-400"
                  ></div>
                ))}
                {product.variantCount > 3 && (
                  <span className="text-xs text-gray-500 font-medium ml-1">
                    +{product.variantCount - 3}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {product.variantCount} options
              </span>
            </div>
          </div>
        )} */}

        {/* Stock indicator */}
        {/* {product.stock > 0 && product.stock <= 5 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-orange-600 font-semibold">
              Only {product.stock} left in stock
            </span>
          </div>
        )} */}
      </div>

      {/* Bottom shine effect */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-primary transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};

export default ProductCard;
