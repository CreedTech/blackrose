// import { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useProducts } from '../hooks/useProducts';
// import { Helmet } from 'react-helmet';
// import { ShopContext } from '../context/ShopContext';

// const ProductPage = () => {
//   const { productId } = useParams();
//   // console.log(productId);
//   const { addToCart } = useContext(ShopContext);
//   // const firstImage = assets.blogFour;
//   const [currentMedia, setCurrentMedia] = useState(null);
//   // const [selectedColor, setSelectedColor] = useState('black');
//   // const [selectedSize, setSelectedSize] = useState(37);
//   const [quantity, setQuantity] = useState(1);
//   const { useGetSingleProduct, useSimilarProducts } = useProducts();
//   const { data: product, isLoading, error } = useGetSingleProduct(productId);
//   const { data: similarProducts = [], isLoading: loadingSimilar } =
//     useSimilarProducts(productId);

//   useEffect(() => {
//     if (product?.image?.length) {
//       setCurrentMedia(product.image[0]);
//     }
//   }, [product]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         Product not found
//       </div>
//     );
//   }
//   return (
//     <div className="bg-black text-white min-h-screen p-4 md:mt-10 mt-0">
//       <Helmet>
//         <title>{product.title} | BlackRose</title>
//         <meta name="description" content={product.description} />
//       </Helmet>
//       <div className="max-w-5xl mx-auto">
//         <nav className=" mb-4">
//           <a href="#" className="hover:text-white text-white font-bold">
//             Home /
//           </a>{' '}
//           <a href="#" className="hover:text-white text-white font-bold">
//             {' '}
//             Shop /
//           </a>{' '}
//           {/* <a href="#" className="hover:text-white text-white font-bold">
//             {' '}
//             Shoes
//           </a>{' '} */}
//           {/* / */}
//           {product.title}
//         </nav>

//         <div className="flex flex-col md:flex-row mb-8 relative">
//           <div className="md:w-1/2">
//             <div className="w-full  max-w-[600px] mx-auto">
//               <div className="relative w-full h-[400px] mb-4">
//                 {currentMedia ? (
//                   <img
//                     className="w-full h-full object-cover rounded-md"
//                     src={currentMedia}
//                     alt={currentMedia}
//                   />
//                 ) : (
//                   <div className="bg-gray-800 text-gray-400 p-6 text-center rounded">
//                     No Image Available
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* // )} */}
//             <div className="flex space-x-4 justify-start sm:w-[18.7%]">
//               {product.image?.map((img, index) => (
//                 <div
//                   key={index}
//                   onMouseEnter={() => setCurrentMedia(img)}
//                   className="relative w-[75px] h-[75px] sm:w-full sm:h-[100px] mb-2 md:mx-0 mx-2 flex-shrink-0 cursor-pointer"
//                 >
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${img} ${index}`}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="md:w-1/2 md:pl-8">
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
//             <p className="text-2xl font-bold mb-2 text-white">
//               ₦{Number(product.finalPrice).toLocaleString()}
//             </p>

//             {product.discount > 0 && (
//               <div className="flex items-center space-x-2">
//                 <span className="line-through text-white font-medium">
//                   ₦{Number(product.price).toLocaleString()}
//                 </span>
//                 <span className="text-green-400 font-medium">
//                   ({product.discount}% off)
//                 </span>
//               </div>
//             )}

//             {/* <hr className="my-5" />
//             <div className="mb-4">
//               <h3 className="font-bold mb-2">Choose a Color</h3>
//               <div className="flex space-x-2">
//                 {colors.map((color) => (
//                   <button
//                     key={color}
//                     className={`w-8 h-8 rounded-full ${
//                       selectedColor === color ? 'ring-2 ring-white p-2 ' : ''
//                     }`}
//                     style={{ backgroundColor: color }}
//                     onClick={() => setSelectedColor(color)}
//                   ></button>
//                 ))}
//               </div>
//             </div> */}
//             {/* <hr className="my-5" />
//             <div className="mb-4">
//               <h3 className="font-bold mb-2">Select Size</h3>
//               <div className="flex space-x-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     className={`px-4 py-2 rounded-full ${
//                       selectedSize === size
//                         ? 'bg-white text-black'
//                         : 'bg-gray-700'
//                     }`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div> */}
//             <hr className="my-5" />
//             <div className="mb-4">
//               <h3 className="font-bold mb-2">Quantity</h3>
//               <div className=" flex flex-row items-center gap-3">
//                 <input
//                   type="number"
//                   className="w-32 p-2 bg-white text-black font-medium text-xl"
//                   min="1"
//                   max="12"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                 />
//                 <span className="text-gray-400 mt-2 text-xs">
//                   <strong>Only {product.stock} Items Left!</strong> <br />{' '}
//                   Don&apos;t miss it
//                 </span>
//               </div>
//             </div>
//             <hr className="my-5" />
//             <div className="flex space-x-4">
//               {/* <button className="bg-white  text-black font-medium px-10 py-3">
//                 Buy Now
//               </button> */}
//               <button
//                 onClick={() => addToCart(product._id, quantity)}
//                 className="border border-white px-10 py-3 relative overflow-hidden group transition-all duration-300"
//               >
//                 <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span>
//                 <span className="relative text-white group-hover:text-black transition-colors duration-300 z-10">
//                   Add to Cart
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="py-6 ">
//           <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//           <p className="mb-4 font-medium text-white">{product.description}</p>
//           {/* Add more content as needed */}
//         </div>
//         <section className="max-w-full mx-auto  py-10 relative">
//           <h2 className="text-2xl font-bold text-center">
//             Similar Items You Might Like
//           </h2>
//           <section className="py-10">
//             <section className="py-10">
//               {loadingSimilar ? (
//                 <p className="text-gray-400">Loading similar products...</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   {similarProducts.map((product) => (
//                     <div key={product._id} className=" py-4 rounded">
//                       <Link
//                         to={`/shop/${product._id}`}
//                         className="w-full mx-auto"
//                       >
//                         <div className="relative w-full h-64 mb-4">
//                           <img
//                             src={
//                               Array.isArray(product.image)
//                                 ? product.image[0]
//                                 : product.image
//                             }
//                             alt={product.title}
//                             className="w-full h-full object-cover mb-4"
//                           />
//                         </div>
//                       </Link>
//                       <div className="flex justify-between items-center mb-2">
//                         <h3>{product.title}</h3>
//                         <span>₦{product.finalPrice.toLocaleString()}</span>
//                       </div>
//                       <div className="flex items-center mb-4">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => {
//                             const full = star <= Math.floor(product.rating);
//                             const half = !full && star - product.rating < 1;

//                             return (
//                               <svg
//                                 key={star}
//                                 className={`w-4 h-4 ${
//                                   full
//                                     ? 'text-yellow-400'
//                                     : half
//                                     ? 'text-yellow-300'
//                                     : 'text-gray-400'
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             );
//                           })}
//                         </div>

//                         <span className="ml-2 text-sm">
//                           ({product.reviews.length})
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => addToCart(product._id, 1)}
//                         className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors"
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </section>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// pages/ProductPage.jsx
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Helmet } from 'react-helmet';
import { ShopContext } from '../context/ShopContext';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProductReviews from '../component/ProductReviews';

const ProductPage = () => {
  const { productId } = useParams();
  const {
    currency,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    trackProductView,
    token,
  } = useContext(ShopContext);

  const [currentMedia, setCurrentMedia] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isPreorder, setIsPreorder] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const { useGetSingleProduct, useSimilarProducts, useProductVariants } =
    useProducts();
  const {
    data: productData,
    isLoading,
    error,
  } = useGetSingleProduct(productId);
  const { data: similarProducts = [], isLoading: loadingSimilar } =
    useSimilarProducts(productId);
  const { data: variantData } = useProductVariants(
    productId,
    selectedAttributes
  );

  const product = productData?.product;

  useEffect(() => {
    if (product?.images?.length) {
      setCurrentMedia(product.images[0]);
    }
    if (productId && token) {
      trackProductView(productId);
    }
  }, [product, productId, token]);

  useEffect(() => {
    if (variantData?.exactMatch) {
      setSelectedVariant(variantData.exactMatch);
    }
  }, [variantData]);

  const handleAttributeChange = (attributeType, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeType]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (product.hasVariants && !selectedVariant) {
      toast.error('Please select product options');
      return;
    }

    const success = await addToCart(
      product._id,
      quantity,
      selectedVariant?._id,
      selectedAttributes
    );

    if (success && isPreorder) {
      toast.info('Pre-order item added. Estimated delivery: 7-14 days');
    }
  };

  const handleWishlistToggle = async () => {
    if (!token) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (isInWishlist(product._id, selectedVariant?._id)) {
      await removeFromWishlist(product._id, selectedVariant?._id);
    } else {
      await addToWishlist(
        product._id,
        selectedVariant?._id,
        selectedAttributes
      );
    }
  };

  const getPrice = () => {
    if (selectedVariant) {
      return {
        price: selectedVariant.price,
        finalPrice: selectedVariant.finalPrice,
        discount: selectedVariant.discount,
      };
    }
    return {
      price: product.price,
      finalPrice: product.finalPrice,
      discount: product.discount,
    };
  };

  const getStock = () => {
    if (selectedVariant) {
      return selectedVariant.stock;
    }
    return product.stock;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop" className="text-white hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = getPrice();
  const currentStock = getStock();

  return (
    <div className="bg-black text-white min-h-screen">
      <Helmet>
        <title>{product.title} | BlackRose Photography</title>
        <meta
          name="description"
          content={product.seoDescription || product.description}
        />
        <meta name="keywords" content={product.seoKeywords?.join(', ')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-gray-600">/</span>
          <Link to="/shop" className="text-gray-400 hover:text-white">
            Shop
          </Link>
          <span className="mx-2 text-gray-600">/</span>
          <span>{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
              {currentMedia && (
                <img
                  src={currentMedia}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
              {currentStock === 0 && !isPreorder && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-2xl font-bold">Out of Stock</span>
                </div>
              )}
              {product.bestseller && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Bestseller
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMedia(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                    currentMedia === img ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.averageRating || 0)}
                  <span className="ml-2 text-gray-400">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
                <span className="text-gray-400">SKU: {product.sku}</span>
              </div>
              <p className="text-gray-300">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">
                  {currency}
                  {currentPrice.finalPrice.toLocaleString()}
                </span>
                {currentPrice.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {currency}
                      {currentPrice.price.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                      {currentPrice.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.hasVariants && variantData && (
              <div className="space-y-4 mb-6">
                {variantData.availableOptions.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variantData.availableOptions.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleAttributeChange('color', color)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedAttributes.color === color
                              ? 'border-white bg-white text-black'
                              : 'border-gray-600 hover:border-gray-400'
                          }`}
                          disabled={
                            !variantData.nextAvailableOptions.colors.includes(
                              color
                            )
                          }
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {variantData.availableOptions.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variantData.availableOptions.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleAttributeChange('size', size)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedAttributes.size === size
                              ? 'border-white bg-white text-black'
                              : 'border-gray-600 hover:border-gray-400'
                          }`}
                          disabled={
                            !variantData.nextAvailableOptions.sizes.includes(
                              size
                            )
                          }
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {variantData.availableOptions.materials.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Material
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variantData.availableOptions.materials.map(
                        (material) => (
                          <button
                            key={material}
                            onClick={() =>
                              handleAttributeChange('material', material)
                            }
                            className={`px-4 py-2 rounded-lg border transition ${
                              selectedAttributes.material === material
                                ? 'border-white bg-white text-black'
                                : 'border-gray-600 hover:border-gray-400'
                            }`}
                            disabled={
                              !variantData.nextAvailableOptions.materials.includes(
                                material
                              )
                            }
                          >
                            {material}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {currentStock > 0 ? (
                <p className="text-green-400">
                  In Stock ({currentStock} available)
                </p>
              ) : (
                <div>
                  <p className="text-red-400 mb-2">Out of Stock</p>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPreorder}
                      onChange={(e) => setIsPreorder(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-gray-300">
                      Pre-order this item (7-14 days delivery)
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-800 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          1,
                          Math.min(
                            currentStock || 99,
                            parseInt(e.target.value) || 1
                          )
                        )
                      )
                    }
                    className="w-16 text-center bg-transparent"
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(currentStock || 99, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-gray-800 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!currentStock && !isPreorder}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    currentStock || isPreorder
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isPreorder ? 'Pre-order Now' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className="p-3 border border-gray-600 rounded-lg hover:border-white transition"
                >
                  {isInWishlist(product._id, selectedVariant?._id) ? (
                    <FaHeart className="text-red-500" size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-6 space-y-4">
              {product.brand && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Brand:</span>
                  <span>{product.brand}</span>
                </div>
              )}
              {product.category && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span>{product.category}</span>
                </div>
              )}
              {product.shippingOptions && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping:</span>
                  <span>{product.shippingOptions.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-800">
            <div className="flex gap-8">
              <button
                onClick={() => setShowReviews(false)}
                className={`pb-4 px-2 font-medium transition ${
                  !showReviews
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setShowReviews(true)}
                className={`pb-4 px-2 font-medium transition ${
                  showReviews
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Reviews ({product.reviewCount || 0})
              </button>
            </div>
          </div>

          <div className="py-8">
            {!showReviews ? (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{product.description}</p>

                {/* Category-specific attributes */}
                {product.cameraAttributes && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Camera Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.cameraAttributes).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ProductReviews product={product} />
            )}
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
          {loadingSimilar ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((product) => (
                <Link
                  key={product._id}
                  to={`/shop/${product._id}`}
                  className="group"
                >
                  <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.images?.[0] || product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium mb-2 group-hover:text-gray-300 transition">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      {currency}
                      {product.finalPrice.toLocaleString()}
                    </span>
                    {product.rating > 0 && (
                      <div className="flex items-center text-sm">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
