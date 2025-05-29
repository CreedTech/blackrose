// components/Wishlist.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart,
    currency 
  } = useContext(ShopContext);

  const handleMoveToCart = async (item) => {
    const success = await addToCart(
      item.productId._id, 
      1, 
      item.variantId, 
      item.selectedAttributes
    );
    
    if (success) {
      await removeFromWishlist(item.productId._id, item.variantId);
    }
  };

  const handleRemove = async (item) => {
    await removeFromWishlist(item.productId._id, item.variantId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <FaHeart className="text-4xl text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
        <p className="text-gray-400 mb-6">
          Save items you love for later
        </p>
        <Link
          to="/shop"
          className="bg-white text-black px-6 py-2 rounded-lg inline-block hover:bg-gray-200 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">
        My Wishlist ({wishlist.length} items)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item, index) => {
          const product = item.productId;
          
          if (!product) return null;
          
          return (
            <div
              key={`${product._id}-${item.variantId || index}`}
              className="bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition"
            >
              <Link
                to={`/shop/${product._id}`}
                className="block relative aspect-square overflow-hidden"
              >
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </Link>
              
              <div className="p-4">
                <Link
                  to={`/shop/${product._id}`}
                  className="font-medium hover:text-gray-300 transition line-clamp-1"
                >
                  {product.title}
                </Link>
                
                {/* Variant Details */}
                {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                  <div className="text-xs text-gray-400 mt-1">
                    {Object.entries(item.selectedAttributes)
                      .filter(([key, value]) => value)
                      .map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                  </div>
                )}
                
                <div className="mt-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {currency}{product.finalPrice?.toLocaleString() || product.price?.toLocaleString()}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        {currency}{product.price?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {product.stock === 0 && (
                    <p className="text-xs text-red-400 mt-1">Out of Stock</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={product.stock === 0}
                    className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                      product.stock === 0
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    <FaShoppingCart size={14} />
                    <span className="text-sm">Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-2 border border-gray-600 rounded-lg hover:border-red-500 hover:text-red-500 transition"
                    title="Remove from wishlist"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;