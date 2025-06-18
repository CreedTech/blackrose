/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Helmet } from 'react-helmet';
import { ShopContext } from '../context/ShopContext';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEye,
  FaCheck,
} from 'react-icons/fa';
import ProductReviews from '../component/ProductReviews';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';

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
  const [allVariants, setAllVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isPreorder, setIsPreorder] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { useGetSingleProduct, useSimilarProducts, useProductVariants } =
    useProducts();

  const {
    data: productData,
    isLoading,
    error,
  } = useGetSingleProduct(productId);
  const { data: similarProducts = [], isLoading: loadingSimilar } =
    useSimilarProducts(productId);
  const product = productData?.product;
  const { data: allVariantsData } = useProductVariants(
    productId,
    {},
    { enabled: product?.hasVariants } // Only fetch if product has variants
  );

  const { data: variantData } = useProductVariants(
    productId,
    selectedAttributes,
    {
      enabled:
        product?.hasVariants && Object.keys(selectedAttributes).length > 0,
    }
  );
  // const { data: allVariantsData } = useProductVariants(productId, {});
  // const { data: variantData } = useProductVariants(
  //   productId,
  //   selectedAttributes
  // );
  useEffect(() => {
    if (allVariantsData?.filteredVariants?.length && allVariants.length === 0) {
      setAllVariants(allVariantsData.filteredVariants);
    }
  }, [allVariantsData?.filteredVariants, allVariants.length]);

  const handleVariantSelect = (variant) => {
    const isSame = selectedVariant?._id === variant._id;
    console.log(selectedVariant?._id);

    if (!isSame) {
      setSelectedVariant(variant);
      setSelectedAttributes({
        color: variant.color,
        size: variant.size,
        material: variant.material,
        finish: variant.finish,
      });
    } else {
      // Allow deselecting
      setSelectedVariant(null);
      setSelectedAttributes({});
    }
  };

  useEffect(() => {
    if (product?.images?.length) {
      setCurrentMedia(product.images[0]);
    }
    if (productId && token) {
      trackProductView(productId);
    }
  }, [product, productId, token]);

  useEffect(() => {
    if (selectedVariant?.images?.length > 0) {
      setCurrentMedia(selectedVariant.images[0]);
    } else if (product?.images?.length > 0) {
      setCurrentMedia(product.images[0]);
    }
  }, [selectedVariant, product?.images]);

  // useEffect(() => {
  //   // 🎯 Smart auto-selection for single variants
  //   if (
  //     variantData?.autoSelected &&
  //     variantData?.exactMatch &&
  //     !selectedVariant
  //   ) {
  //     console.log('🚀 Auto-selecting single variant');
  //     setSelectedVariant(variantData.exactMatch);
  //     console.log(variantData.exactMatch);
  //     setSelectedAttributes({
  //       color: variantData.exactMatch.color || '',
  //       size: variantData.exactMatch.size || '',
  //       material: variantData.exactMatch.material || '',
  //       finish: variantData.exactMatch.finish || '',
  //     });
  //   }
  // }, [variantData, selectedVariant]);
  useEffect(() => {
    // Only auto-select if no variant is currently selected and we have exactly one variant
    if (
      !selectedVariant &&
      variantData?.exactMatch &&
      allVariants.length === 1
    ) {
      console.log('🚀 Auto-selecting single variant');
      setSelectedVariant(variantData.exactMatch);
      setSelectedAttributes({
        color: variantData.exactMatch.color || '',
        size: variantData.exactMatch.size || '',
        material: variantData.exactMatch.material || '',
        finish: variantData.exactMatch.finish || '',
      });
    }
  }, [variantData?.exactMatch, selectedVariant, allVariants.length]);
  useEffect(() => {
    if (variantData?.exactMatch) {
      setSelectedVariant(variantData.exactMatch);
    }
  }, [variantData]);

  const VariantSelector = ({
    allVariants,
    selectedVariant,
    onVariantSelect,
  }) => {
    const [showAll, setShowAll] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const groupedVariants = useMemo(() => {
      return allVariants.map((variant) => ({
        ...variant,
        displayLabel: `${variant.color} • ${variant.size} • ${variant.material} • ${variant.finish}`,
        shortLabel: `${variant.color} ${variant.size}`,
      }));
    }, [allVariants]);

    // Show limited variants initially
    const displayVariants = showAll
      ? groupedVariants
      : groupedVariants.slice(0, 6);
    const hasMoreVariants = groupedVariants.length > 6;

    return (
      <div className="variant-selector space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
            Available Options ({groupedVariants.length})
          </h3>

          {/* View Mode Toggle */}
          {groupedVariants.length > 3 && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {displayVariants.map((variant) => {
              const isSelected = selectedVariant?._id === variant._id;
              const isLowStock = variant.stock <= 5 && variant.stock > 0;
              const isOutOfStock = variant.stock <= 0;

              return (
                <motion.div
                  key={variant._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isOutOfStock && onVariantSelect(variant)}
                  className={`
                  relative cursor-pointer border-2 rounded-xl p-3 lg:p-4 transition-all duration-200
                  ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}
                  ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }
                `}
                >
                  {/* Variant Image */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                      w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden flex-shrink-0
                      ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                    `}
                    >
                      {variant.images && variant.images.length > 0 ? (
                        <img
                          src={variant.images[0]}
                          alt={variant.shortLabel}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Variant Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm lg:text-base truncate ${
                          isSelected ? 'text-primary' : 'text-gray-900'
                        }`}
                      >
                        {variant.shortLabel}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 truncate">
                        {variant.material} • {variant.finish}
                      </p>

                      {/* Stock Status */}
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isOutOfStock
                              ? 'bg-red-400'
                              : isLowStock
                              ? 'bg-yellow-400'
                              : 'bg-green-400'
                          }`}
                        />
                        <span className="text-xs text-gray-600">
                          {isOutOfStock
                            ? 'Out of stock'
                            : isLowStock
                            ? `${variant.stock} left`
                            : 'In stock'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`font-bold text-sm lg:text-base ${
                        isSelected ? 'text-primary' : 'text-gray-900'
                      }`}
                    >
                      {currency}
                      {variant.finalPrice.toLocaleString()}
                    </span>

                    {isSelected && (
                      <div className="text-primary">
                        <svg
                          className="w-5 h-5"
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
                      </div>
                    )}
                  </div>

                  {/* Out of stock overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-gray-100/80 rounded-xl flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-2">
            {displayVariants.map((variant) => {
              const isSelected = selectedVariant?._id === variant._id;
              const isOutOfStock = variant.stock <= 0;

              return (
                <motion.div
                  key={variant._id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => !isOutOfStock && onVariantSelect(variant)}
                  className={`
                  flex items-center justify-between p-3 lg:p-4 border rounded-lg cursor-pointer transition-all
                  ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}
                  ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                  }
                `}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ${
                        isSelected ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      {variant.images?.[0] ? (
                        <img
                          src={variant.images[0]}
                          alt={variant.shortLabel}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold truncate ${
                          isSelected ? 'text-primary' : 'text-gray-900'
                        }`}
                      >
                        {variant.displayLabel}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {variant.stock} • {currency}
                        {variant.finalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="text-primary ml-2">
                      <svg
                        className="w-5 h-5"
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
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Show More/Less Button */}
        {hasMoreVariants && (
          <div className="text-center pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-700"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>Show {groupedVariants.length - 6} More Options</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  // Add this debug code to see what's missing:
  // useEffect(() => {
  //   console.log('🔍 Debug Selected Attributes:', selectedAttributes);
  //   console.log('🔍 Required for exact match:');
  //   console.log('  - Color:', selectedAttributes.color, '(should be Yellow)');
  //   console.log('  - Size:', selectedAttributes.size, '(should be L)');
  //   console.log(
  //     '  - Material:',
  //     selectedAttributes.material,
  //     '(should be Wood)'
  //   );
  //   console.log('  - Finish:', selectedAttributes.finish, '(should be Modern)');
  //   console.log('🔍 Exact Match Result:', variantData?.exactMatch);
  // }, [selectedAttributes, variantData]);

  const handleAddToCart = async () => {
    const variantToUse = selectedVariant || variantData?.exactMatch;
    if (product.hasVariants && product.variants.length > 1 && !variantToUse) {
      toast.error('Please select product options');
      return;
    }

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

  // const handleWishlistToggle = async () => {
  //   if (!token) {
  //     toast.error('Please login to add to wishlist');
  //     return;
  //   }

  //   if (isInWishlist(product._id, selectedVariant?._id)) {
  //     await removeFromWishlist(product._id, selectedVariant?._id);
  //   } else {
  //     await addToWishlist(
  //       product._id,
  //       selectedVariant?._id,
  //       selectedAttributes
  //     );
  //   }
  // };

  const handleWishlistToggle = async () => {
    if (!token) {
      toast.error('Please login to add to wishlist');
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist(product._id, selectedVariant?._id)) {
        await removeFromWishlist(product._id, selectedVariant?._id);
        // toast.success('Removed from wishlist');
      } else {
        await addToWishlist(
          product._id,
          selectedVariant?._id,
          selectedAttributes
        );
        // toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setWishlistLoading(false);
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

        <div className="grid grid-cols-1 xl:grid-cols-2  lg:gap-16">
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
            <div className="  p-6   ">
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
                    <div className="flex gap-2">
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
            {product.hasVariants && allVariants.length > 0 && (
              <VariantSelector
                allVariants={allVariants}
                selectedVariant={selectedVariant}
                onVariantSelect={handleVariantSelect}
              />
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
              <div className="flex items-center gap-4">
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

              <div className="flex  gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock <= 0 && !isPreorder}
                  className={`px-10 py-3  flex-1 relative overflow-hidden border rounded-xl border-white group transition-all duration-300 bg-black ${
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
                {/* <button
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
                </button> */}
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading} // Add this state
                  className={`min-w-[44px] h-11 px-3 border rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isInWishlist(product._id, selectedVariant?._id)
                      ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {wishlistLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
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
                  )}
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
