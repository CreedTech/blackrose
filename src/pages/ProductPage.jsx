// // pages/ProductPage.jsx
// import { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useProducts } from '../hooks/useProducts';
// import { Helmet } from 'react-helmet';
// import { ShopContext } from '../context/ShopContext';
// import {
//   FaHeart,
//   FaRegHeart,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
// } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import ProductReviews from '../component/ProductReviews';

// const ProductPage = () => {
//   const { productId } = useParams();
//   const {
//     currency,
//     addToCart,
//     addToWishlist,
//     removeFromWishlist,
//     isInWishlist,
//     trackProductView,
//     token,
//   } = useContext(ShopContext);

//   const [currentMedia, setCurrentMedia] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   const [isPreorder, setIsPreorder] = useState(false);
//   const [showReviews, setShowReviews] = useState(false);

//   const { useGetSingleProduct, useSimilarProducts, useProductVariants } =
//     useProducts();
//   const {
//     data: productData,
//     isLoading,
//     error,
//   } = useGetSingleProduct(productId);
//   const { data: similarProducts = [], isLoading: loadingSimilar } =
//     useSimilarProducts(productId);
//   const { data: variantData } = useProductVariants(
//     productId,
//     selectedAttributes
//   );

//   const product = productData?.product;

//   useEffect(() => {
//     if (product?.images?.length) {
//       setCurrentMedia(product.images[0]);
//     }
//     if (productId && token) {
//       trackProductView(productId);
//     }
//   }, [product, productId, token]);

//   useEffect(() => {
//     if (variantData?.exactMatch) {
//       setSelectedVariant(variantData.exactMatch);
//     }
//   }, [variantData]);

//   const handleAttributeChange = (attributeType, value) => {
//     setSelectedAttributes((prev) => ({
//       ...prev,
//       [attributeType]: value,
//     }));
//   };

//   const handleAddToCart = async () => {
//     if (product.hasVariants && !selectedVariant) {
//       toast.error('Please select product options');
//       return;
//     }

//     const success = await addToCart(
//       product._id,
//       quantity,
//       selectedVariant?._id,
//       selectedAttributes,
//       isPreorder // Add this parameter
//     );

//     if (success && isPreorder) {
//       toast.info('Pre-order item added. Estimated delivery: 7-14 days');
//     }
//   };

//   const handleWishlistToggle = async () => {
//     if (!token) {
//       toast.error('Please login to add to wishlist');
//       return;
//     }

//     if (isInWishlist(product._id, selectedVariant?._id)) {
//       await removeFromWishlist(product._id, selectedVariant?._id);
//     } else {
//       await addToWishlist(
//         product._id,
//         selectedVariant?._id,
//         selectedAttributes
//       );
//     }
//   };

//   const getPrice = () => {
//     if (selectedVariant) {
//       return {
//         price: selectedVariant.price,
//         finalPrice: selectedVariant.finalPrice,
//         discount: selectedVariant.discount,
//       };
//     }
//     return {
//       price: product.price,
//       finalPrice: product.finalPrice,
//       discount: product.discount,
//     };
//   };

//   const getStock = () => {
//     if (selectedVariant) {
//       return selectedVariant.stock;
//     }
//     return product.stock;
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//       } else {
//         stars.push(<FaRegStar key={i} className="text-yellow-400" />);
//       }
//     }
//     return stars;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Product not found</h2>
//           <Link to="/shop" className="text-white hover:underline">
//             Return to shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const currentPrice = getPrice();
//   const currentStock = getStock();

//   return (
//     <div className=" text-primary min-h-screen">
//       <Helmet>
//         <title>{product.title} | BlackRose Photography</title>
//         <meta
//           name="description"
//           content={product.seoDescription || product.description}
//         />
//         <meta name="keywords" content={product.seoKeywords?.join(', ')} />
//       </Helmet>

//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="mb-6 text-sm">
//           <Link to="/" className="text-gray-800 hover:text-primary">
//             Home
//           </Link>
//           <span className="mx-2 text-gray-600">/</span>
//           <Link to="/shop" className="text-gray-800 hover:text-primary">
//             Shop
//           </Link>
//           <span className="mx-2 text-gray-600">/</span>
//           <span>{product.title}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <div>
//             <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
//               {currentMedia && (
//                 <img
//                   src={currentMedia}
//                   alt={product.title}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               {currentStock === 0 && !isPreorder && (
//                 <div className="absolute inset-0 bg-light/20 bg-opacity-50 flex items-center justify-center">
//                   <span className="text-2xl font-bold">Out of Stock</span>
//                 </div>
//               )}
//               {product.bestseller && (
//                 <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                   Bestseller
//                 </span>
//               )}
//             </div>

//             {/* Thumbnail Images */}
//             <div className="grid grid-cols-5 gap-2">
//               {product.images?.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentMedia(img)}
//                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
//                     currentMedia === img ? 'border-white' : 'border-transparent'
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.title} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-6 font-medium">
//               <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center">
//                   {renderStars(product.averageRating || 0)}
//                   <span className="ml-2 text-gray-900 font-medium">
//                     ({product.reviewCount || 0} reviews)
//                   </span>
//                 </div>
//                 <span className="text-gray-900">SKU: {product.sku}</span>
//               </div>
//               <p className="text-gray-700">{product.description}</p>
//             </div>

//             {/* Price */}
//             <div className="mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="text-3xl font-bold">
//                   {currency}
//                   {currentPrice.finalPrice.toLocaleString()}
//                 </span>
//                 {currentPrice.discount > 0 && (
//                   <>
//                     <span className="text-xl text-gray-800 line-through">
//                       {currency}
//                       {currentPrice.price.toLocaleString()}
//                     </span>
//                     <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
//                       {currentPrice.discount}% OFF
//                     </span>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Variants */}
//             {product.hasVariants && variantData && (
//               <div className="space-y-4 mb-6">
//                 {variantData.availableOptions.colors.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Color
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {variantData.availableOptions.colors.map((color) => (
//                         <button
//                           key={color}
//                           onClick={() => handleAttributeChange('color', color)}
//                           className={`px-4 py-2 rounded-lg border transition ${
//                             selectedAttributes.color === color
//                               ? 'border-white bg-primary text-light '
//                               : 'border-gray-600 hover:bg-primary hover:text-light'
//                           }`}
//                           disabled={
//                             !variantData.nextAvailableOptions.colors.includes(
//                               color
//                             )
//                           }
//                         >
//                           {color}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {variantData.availableOptions.sizes.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Size
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {variantData.availableOptions.sizes.map((size) => (
//                         <button
//                           key={size}
//                           onClick={() => handleAttributeChange('size', size)}
//                           className={`px-4 py-2 rounded-lg border transition ${
//                             selectedAttributes.size === size
//                               ? 'border-white bg-primary text-light '
//                               : 'border-gray-600 hover:bg-primary hover:text-light'
//                           }`}
//                           disabled={
//                             !variantData.nextAvailableOptions.sizes.includes(
//                               size
//                             )
//                           }
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {variantData.availableOptions.materials.length > 0 && (
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Material
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {variantData.availableOptions.materials.map(
//                         (material) => (
//                           <button
//                             key={material}
//                             onClick={() =>
//                               handleAttributeChange('material', material)
//                             }
//                             className={`px-4 py-2 rounded-lg border transition ${
//                               selectedAttributes.material === material
//                                 ? 'border-white bg-primary text-light '
//                                 : 'border-gray-600 hover:bg-primary hover:text-light'
//                             }`}
//                             disabled={
//                               !variantData.nextAvailableOptions.materials.includes(
//                                 material
//                               )
//                             }
//                           >
//                             {material}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Stock Status */}
//             <div className="mb-6 relative">
//               {currentStock > 0 ? (
//                 <p className="text-green-400">
//                   In Stock ({currentStock} available)
//                 </p>
//               ) : (
//                 <div>
//                   <p className="text-red-400 mb-2">Out of Stock</p>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={isPreorder}
//                       onChange={(e) => setIsPreorder(e.target.checked)}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-300">
//                       Pre-order this item (7-14 days delivery)
//                     </span>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Quantity and Actions */}
//             <div className="space-y-4 mb-8">
//               <div className="flex items-center gap-4">
//                 <label className="text-sm font-medium">Quantity:</label>
//                 <div className="flex items-center border border-gray-600 rounded-lg">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="px-4 py-2 hover:bg-gray-800 transition"
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) =>
//                       setQuantity(
//                         Math.max(
//                           1,
//                           Math.min(
//                             currentStock || 99,
//                             parseInt(e.target.value) || 1
//                           )
//                         )
//                       )
//                     }
//                     className="w-16 text-center bg-transparent"
//                   />
//                   <button
//                     onClick={() =>
//                       setQuantity(Math.min(currentStock || 99, quantity + 1))
//                     }
//                     className="px-4 py-2 hover:bg-gray-800 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={!currentStock && !isPreorder}
//                   className={`${
//                     currentStock || isPreorder
//                       ? 'border border-white px-10 py-3 flex-1 relative overflow-hidden group transition-all duration-300'
//                       : 'border border-white px-10 py-3 flex-1 relative overflow-hidden group transition-all duration-300 cursor-not-allowed'
//                   } `}
//                 >
//                   <span
//                     className={` ${
//                       currentStock || isPreorder
//                         ? 'absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0'
//                         : 'bg-white cursor-not-allowed'
//                     } `}
//                   ></span>
//                   <span
//                     className={`relative text-white group-hover:text-black transition-colors duration-300 z-10 ${
//                       currentStock || isPreorder
//                         ? 'relative text-white group-hover:text-black transition-colors duration-300 z-10 '
//                         : ' text-white-400  cursor-not-allowed'
//                     }`}
//                   >
//                     {isPreorder ? 'Pre-order Now' : 'Add to Cart'}
//                   </span>
//                 </button>

//                 <button
//                   onClick={handleWishlistToggle}
//                   className="p-3 border border-gray-600 rounded-lg hover:border-white transition"
//                 >
//                   {isInWishlist(product._id, selectedVariant?._id) ? (
//                     <FaHeart className="text-red-500" size={20} />
//                   ) : (
//                     <FaRegHeart size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Product Features */}
//             {product.features && product.features.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold mb-3">Features</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {product.features.map((feature, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-800 px-3 py-1 rounded-full text-sm"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Additional Info */}
//             <div className="border-t border-gray-800 pt-6 space-y-4">
//               {product.brand && (
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Brand:</span>
//                   <span>{product.brand}</span>
//                 </div>
//               )}
//               {product.category && (
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Category:</span>
//                   <span>{product.category}</span>
//                 </div>
//               )}
//               {product.shippingOptions && (
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Shipping:</span>
//                   <span>{product.shippingOptions.join(', ')}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="mt-12">
//           <div className="border-b border-gray-800">
//             <div className="flex gap-8">
//               <button
//                 onClick={() => setShowReviews(false)}
//                 className={`pb-4 px-2 font-medium transition ${
//                   !showReviews
//                     ? 'text-white border-b-2 border-white'
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Description
//               </button>
//               <button
//                 onClick={() => setShowReviews(true)}
//                 className={`pb-4 px-2 font-medium transition ${
//                   showReviews
//                     ? 'text-white border-b-2 border-white'
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Reviews ({product.reviewCount || 0})
//               </button>
//             </div>
//           </div>

//           <div className="py-8">
//             {!showReviews ? (
//               <div className="prose prose-invert max-w-none">
//                 <p className="text-gray-300">{product.description}</p>

//                 {/* Category-specific attributes */}
//                 {product.cameraAttributes && (
//                   <div className="mt-6">
//                     <h3 className="text-xl font-semibold mb-4">
//                       Camera Specifications
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {Object.entries(product.cameraAttributes).map(
//                         ([key, value]) => (
//                           <div key={key} className="flex justify-between">
//                             <span className="text-gray-400 capitalize">
//                               {key.replace(/([A-Z])/g, ' $1').trim()}:
//                             </span>
//                             <span>{value}</span>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <ProductReviews product={product} />
//             )}
//           </div>
//         </div>

//         {/* Similar Products */}
//         <section className="mt-16">
//           <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
//           {loadingSimilar ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {similarProducts.slice(0, 4).map((product) => (
//                 <Link
//                   key={product._id}
//                   to={`/shop/${product._id}`}
//                   className="group"
//                 >
//                   <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
//                     <img
//                       src={product.images?.[0] || product.image}
//                       alt={product.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                     />
//                     {product.discount > 0 && (
//                       <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
//                         -{product.discount}%
//                       </span>
//                     )}
//                   </div>
//                   <h3 className="font-medium mb-2 group-hover:text-gray-300 transition">
//                     {product.title}
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold">
//                       {currency}
//                       {product.finalPrice.toLocaleString()}
//                     </span>
//                     {product.rating > 0 && (
//                       <div className="flex items-center text-sm">
//                         <FaStar className="text-yellow-400 mr-1" />
//                         <span>{product.rating.toFixed(1)}</span>
//                       </div>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

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
  FaShoppingCart,
  FaEye,
  FaShare,
  FaCheck,
  FaTruck,
  // FaShield,
  FaUndo,
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiPhotograph } from 'react-icons/hi';
import { toast } from 'react-toastify';
import ProductReviews from '../component/ProductReviews';
import { FaShield } from 'react-icons/fa6';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

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
    // if (product.hasVariants && !selectedVariant) {
    //   toast.error('Please select product options');
    //   return;
    // }

    const success = await addToCart(
      product._id,
      quantity,
      selectedVariant?._id,
      selectedAttributes,
      isPreorder
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
  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  // if (!isLoading) {
  //   return (
  //     <div className="min-h-screen  flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="relative mb-8">
  //           <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
  //           <div className="absolute inset-0 w-20 h-20 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
  //         </div>
  //         <p className="text-xl text-gray-600 font-medium">
  //           Loading product details...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-xl text-gray-600 font-medium">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-black/20 to-black/80 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEye className="text-white text-2xl opacity-50" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            to="/shop"
            className="group relative px-8 py-4 bg-primary text-white rounded-md font-semibold hover:from-black/20 hover:to-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <span className="relative z-10">Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = getPrice();
  const currentStock = getStock();

  return (
    <div className="min-h-screen b">
      <Helmet>
        <title>{product.title} | BlackRose Photography</title>
        <meta
          name="description"
          content={product.seoDescription || product.description}
        />
        <meta name="keywords" content={product.seoKeywords?.join(', ')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Modern Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <span className="text-gray-700">/</span>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Shop
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-900 font-semibold truncate">
              {product.title}
            </span>
          </div>
        </nav>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
          {/* Premium Image Gallery */}
          <div className="space-y-6">
            <div className="group relative">
              <div className="relative aspect-square bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-white/20">
                {currentMedia && (
                  <img
                    src={currentMedia}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-all duration-700 cursor-zoom-in ${
                      isImageZoomed
                        ? 'scale-150'
                        : 'scale-100 group-hover:scale-105'
                    }`}
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                  />
                )}

                {/* Gradient overlay for out of stock */}
                {currentStock <= 0 && (
                  <div className="absolute inset-0 bg-light/50 bg-opacity-50 flex items-center justify-center">
                    <span className="text-2xl text-primary font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Floating badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {product.bestseller && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                      <span className="relative bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-xl flex items-center gap-2 border border-white/20">
                        <HiSparkles className="animate-spin" />
                        Bestseller
                      </span>
                    </div>
                  )}
                  {currentPrice.discount > 0 && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-75"></div>
                      <span className="relative bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-xl border border-white/20">
                        <HiLightningBolt className="inline mr-1" />
                        {currentPrice.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMedia(img)}
                  className={`group relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                    currentMedia === img
                      ? 'ring-2 ring-primary shadow-xl scale-105'
                      : 'hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                      currentMedia === img
                        ? 'opacity-0'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Product Information */}
          <div className="">
            {/* Product Header */}
            <div className=" p-8   ">
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-primary  mb-4 leading-tight">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(product.averageRating || 0)}
                    </div>
                    <span className="text-gray-700 font-semibold">
                      ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">SKU:</span>
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-400 text-sm ">
                      {product.sku}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Premium Price Display */}
              <div className="bg-gradient-to-r from-black/90 to-black/40 rounded-2xl p-6 border">
                <div className="flex items-baseline flex-col md:flex-row gap-4 mb-2">
                  <span className="text-3xl font-black text-light">
                    {currency}
                    {currentPrice.finalPrice.toLocaleString()}
                  </span>
                  {currentPrice.discount > 0 && (
                    <div className='flex gap-2'>
                      <span className="text-xl text-gray-300 line-through font-medium">
                        {currency}
                        {currentPrice.price.toLocaleString()}
                      </span>
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 text-primary px-3 py-1 rounded-full text-sm font-bold">
                        Save {currency}
                        {(
                          currentPrice.price - currentPrice.finalPrice
                        ).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                {currentPrice.discount > 0 && (
                  <p className="text-emerald-300 font-semibold">
                    🎉 You save {currentPrice.discount}% on this item!
                  </p>
                )}
              </div>
            </div>

            {/* Product Variants */}
            {product.hasVariants && variantData && (
              <div className=" space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Customize Your Product
                </h3>
                {variantData.availableOptions.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2 font-medium text-primary">
                      {variantData.availableOptions.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleAttributeChange('color', color)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedAttributes.color === color
                              ? 'border-white bg-primary text-light '
                              : 'border-gray-900 hover:bg-primary hover:text-light'
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
                    <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2 font-medium text-primary">
                      {variantData.availableOptions.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleAttributeChange('size', size)}
                          disabled={
                            !variantData.nextAvailableOptions.sizes.includes(
                              size
                            )
                          }
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedAttributes.size === size
                              ? 'border-white bg-primary text-light '
                              : 'border-gray-900 hover:bg-primary hover:text-light'
                          } ${
                            !variantData.nextAvailableOptions.sizes.includes(
                              size
                            )
                              ? ' cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {selectedAttributes.size === size && (
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl"></div>
                          )}
                          <span className="relative z-10">{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {variantData.availableOptions.materials.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                      Material
                    </label>
                    <div className="flex flex-wrap gap-2 font-medium text-primary">
                      {variantData.availableOptions.materials.map(
                        (material) => (
                          <button
                            key={material}
                            onClick={() =>
                              handleAttributeChange('material', material)
                            }
                            disabled={
                              !variantData.nextAvailableOptions.materials.includes(
                                material
                              )
                            }
                            className={`px-4 py-2 rounded-lg border border-primary transition ${
                              selectedAttributes.material === material
                                ? 'border-white bg-primary text-light '
                                : 'border-gray-900 hover:bg-primary hover:text-light'
                            } ${
                              !variantData.nextAvailableOptions.materials.includes(
                                material
                              )
                                ? ' cursor-not-allowed'
                                : ''
                            }`}
                          >
                            {selectedAttributes.material === material && (
                              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl"></div>
                            )}
                            <span className="relative z-10">{material}</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stock & Availability */}
            <div className="mt-4 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    currentStock > 0
                      ? 'bg-green-400 animate-pulse'
                      : 'bg-red-400'
                  }`}
                ></div>
                <span className="text-base font-bold">
                  {currentStock > 0 ? (
                    <span className="text-primary">
                      In Stock ({currentStock} available)
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </span>
              </div>

              {currentStock === 0 && (
                <div className="bg-gradient-to-r from-black/20-50 to-black/20 rounded-lg p-4 border border-primary">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isPreorder}
                        onChange={(e) => setIsPreorder(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                          isPreorder
                            ? 'border-primary bg-gradient-to-r from-black/20-50 to-black/20'
                            : 'border-gray-700'
                        }`}
                      >
                        {isPreorder && (
                          <FaCheck className="text-primary text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">
                        Pre-order this item
                      </span>
                      <p className="text-sm text-primary">
                        Estimated delivery: 7-14 days
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className=" space-y-6 mb-6 mt-4">
              <div className="flex items-center gap-6">
                <label className="text-base font-bold text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center  rounded-lg border-2 border-gray-600 overflow-hidden text-primary">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-800 transition-colors font-bold text-lg"
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
                    className="w-16 text-center bg-transparent text-lg font-bold focus:outline-none "
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(currentStock || 99, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-gray-800 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock <= 0 && !isPreorder}
                  className={`px-10 py-3 flex-1 relative overflow-hidden border rounded-xl border-white group transition-all duration-300 bg-black ${
                    currentStock <= 0 && !isPreorder
                      ? 'cursor-not-allowed opacity-50'
                      : 'border border-transparent hover:border-black'
                  }`}
                >
                  {/* Expanding white background layer */}
                  {currentStock > 0 && (
                    <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0"></span>
                  )}
                  {isPreorder && (
                    <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0 hover:text-primary"></span>
                  )}
                  {/* <span className="absolute inset-0 w-0 group-hover:w-full h-full bg-white transition-all duration-300 ease-in-out z-0"></span> */}
                  {/* <span
                    className={`absolute inset-0 bg-white transform scale-x-0 origin-left border border-primary transition-transform duration-300 ease-in-out group-hover:scale-x-100 ${
                      currentStock <= 0 && !isPreorder ? 'hidden' : ''
                    }`}
                  ></span> */}

                  {/* Button text */}
                  <span
                    className={`relative z-10 transition-colors duration-300 font-bold ${
                      currentStock <= 0 && !isPreorder
                        ? 'cursor-not-allowed text-white group-hover:text-light '
                        : 'text-light hover:text-primary'
                    }`}
                  >
                    {isPreorder ? 'Pre-order Now' : 'Add to Cart'}
                  </span>
                </button>
                <button
                  //  onLike={() => likeMutation.mutate(image._id)}
                  onClick={handleWishlistToggle}
                  className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                    isInWishlist(product._id, selectedVariant?._id)
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-primary hover:bg-primary/90'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      isInWishlist(product._id, selectedVariant?._id)
                        ? 'fill-current'
                        : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <HiSparkles className="text-primary" />
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-3 bg-primary rounded-lg p-4 border border-primary hover:from-primary hover:to-purple-100 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-light rounded-full group-hover:scale-150 transition-transform"></div>
                      <span className="font-semibold text-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Specifications */}
            <div className="mt-4 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Product Information
              </h3>
              <div className="space-y-4">
                {product.brand && (
                  <div className="flex items-center justify-between py-3 ">
                    <span className="font-semibold text-primary">Brand</span>
                    <span className="font-bold text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                )}
                {/* {product.category && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-primary">
                      Category
                    </span>
                    <span className="font-bold text-gray-900">
                      {product.category}
                    </span>
                  </div>
                )}
                {product.shippingOptions && (
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="font-semibold text-primary">
                      Shipping
                    </span>
                    <span className="font-bold text-gray-900">
                      {product.shippingOptions.join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-gray-600">
                    Availability
                  </span>
                  <span
                    className={`font-bold ${
                      currentStock > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {currentStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Premium Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <button
                onClick={() => setActiveTab('description')}
                className={`group relative px-8 py-6 font-bold text-base transition-all duration-300 ${
                  activeTab === 'description'
                    ? 'text-primary bg-white '
                    : 'text-gray-600 hover:text-primary hover:bg-white/50'
                }`}
              >
                <span className="relative z-10">Description</span>
                {activeTab === 'description' && (
                  <div className="absolute inset-0  opacity-50"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`group relative px-8 py-6 font-bold text-base transition-all duration-300 ${
                  activeTab === 'reviews'
                    ? 'text-primary bg-white border-b-4 '
                    : 'text-gray-600 hover:text-primary hover:bg-white/50'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Reviews
                  <span className="bg-primary text-light px-2 py-1 rounded-full text-sm">
                    {product.reviewCount || 0}
                  </span>
                </span>
                {activeTab === 'reviews' && (
                  <div className="absolute inset-0  opacity-50"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8 lg:p-12">
              {activeTab === 'description' && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-primary text-lg leading-relaxed mb-6 font-medium">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && <ProductReviews product={product} />}
            </div>
          </div>
        </div>
        {/* Premium Similar Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
          {loadingSimilar ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product._id}
                  className="py-4 rounded cursor-pointer relative"
                  variants={scaleIn}
                  custom={index}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/shop/${product._id}`} className="w-full mx-auto">
                    <motion.div
                      className="relative w-full h-64 mb-4 overflow-hidden rounded-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={product?.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover aspect-square rounded-md"
                        initial={{ scale: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  </Link>
                  <motion.div
                    className="flex justify-between items-center mb-2 text-lg text-darker font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3>{product.title}</h3>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      ₦{product.price.toFixed(2)}
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const full = star <= Math.floor(product.rating);
                        const half = !full && star - product.rating < 1;

                        return (
                          <motion.svg
                            key={star}
                            className={`w-4 h-4 ${
                              full
                                ? 'text-yellow-400'
                                : half
                                ? 'text-yellow-300'
                                : 'text-gray'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.1 * star,
                              type: 'spring',
                              stiffness: 200,
                            }}
                            viewport={{ once: true }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        );
                      })}
                    </div>

                    <span className="ml-2 text-sm text-darker font-medium">
                      ({product.reviews.length})
                    </span>
                  </motion.div>
                  <motion.button
                    onClick={() => addToCart(product._id, 1)}
                    className="w-1/2 bg-black text-white py-2 hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Add to Cart
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
