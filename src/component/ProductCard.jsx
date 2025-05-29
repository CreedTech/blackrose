/* eslint-disable react/prop-types */
// components/ProductCard.jsx
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
    token 
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
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow relative">
        <div className="flex gap-4 p-4">
          <Link to={`/shop/${product._id}`} className="flex-shrink-0">
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </Link>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <Link
                to={`/shop/${product._id}`}
                className="text-lg font-medium hover:text-gray-300 transition"
              >
                {product.title}
              </Link>
              <button
                onClick={handleWishlistToggle}
                className="text-gray-400 hover:text-white transition"
              >
                {isInWishlist(product._id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    {currency}{product.finalPrice.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        {currency}{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-green-400">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                {product.averageRating > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm text-gray-400">
                      {product.averageRating} ({product.reviewCount})
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <FaShoppingCart />
                Add to Cart
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
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistToggle}
            className="bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
          >
            {isInWishlist(product._id) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-white" />
            )}
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link
          to={`/shop/${product._id}`}
          className="font-medium hover:text-gray-300 transition line-clamp-1"
        >
          {product.title}
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-400 mt-1">{product.brand}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {currency}{product.finalPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  {currency}{product.price.toLocaleString()}
                </span>
              )}
            </div>
            
            {product.averageRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-xs text-gray-400">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2 rounded-lg transition ${
              product.stock === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
            title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          >
            <FaShoppingCart />
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