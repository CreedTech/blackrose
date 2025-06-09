/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product, viewMode = 'grid' }) => {
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
    await addToCart(product._id, 1);
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
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

  if (viewMode === 'list') {
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4">
          <Link
            to={`/shop/${product._id}`}
            className="flex-shrink-0 self-start"
          >
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 object-cover rounded-lg"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Link
                to={`/shop/${product._id}`}
                className="text-base md:text-lg font-medium hover:text-gray-300 transition line-clamp-2 pr-2"
              >
                {product.title}
              </Link>
              <button
                onClick={handleWishlistToggle}
                className="text-gray-400 hover:text-white transition flex-shrink-0 p-1"
              >
                {isInWishlist(product._id) ? (
                  <FaHeart className="text-red-500 text-sm md:text-base" />
                ) : (
                  <FaRegHeart className="text-sm md:text-base" />
                )}
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-400 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg md:text-xl font-bold">
                    {currency}
                    {product.finalPrice.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xs md:text-sm text-gray-400 line-through">
                        {currency}
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs md:text-sm text-green-400">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                {product.averageRating > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-yellow-400 text-xs md:text-sm" />
                    <span className="text-xs md:text-sm text-gray-400">
                      {product.averageRating} ({product.reviewCount})
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`px-3 md:px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm md:text-base justify-center ${
                  product.stock === 0
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                <FaShoppingCart className="text-sm" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all group">
      <Link to={`/shop/${product._id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images?.[0] || product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 md:gap-2">
          {product.bestseller && (
            <span className="bg-red-500 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
              Bestseller
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-green-500 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-700 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className="bg-black bg-opacity-50 p-1.5 md:p-2 rounded-full hover:bg-opacity-75 transition"
          >
            {isInWishlist(product._id) ? (
              <FaHeart className="text-red-500 text-sm md:text-base" />
            ) : (
              <FaRegHeart className="text-white text-sm md:text-base" />
            )}
          </button>
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:text-gray-300 transition line-clamp-2 text-sm md:text-base mb-1"
        >
          {product.title}
        </Link>

        {product.brand && (
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            {product.brand}
          </p>
        )}

        <div className="flex items-center justify-between mt-2 md:mt-3">
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
              <span className="text-sm md:text-lg font-bold">
                {currency}
                {product.finalPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-xs md:text-sm text-gray-400 line-through">
                  {currency}
                  {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {product.averageRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-xs text-gray-400">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-1.5 md:p-2 rounded-lg transition flex-shrink-0 ${
              product.stock === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
            title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          >
            <FaShoppingCart className="text-sm md:text-base" />
          </button>
        </div>

        {/* Variant Options Preview */}
        {product.hasVariants && product.variantCount > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            {product.variantCount} options available
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
