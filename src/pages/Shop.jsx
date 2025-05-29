// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Parallax, EffectFade } from 'swiper/modules';
// import 'swiper/css/effect-fade';
// import { Link } from 'react-router-dom';
// import { useProducts } from '../hooks/useProducts';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const Shop = () => {
//   const { useLists } = useProducts();
//   const { data, isLoading, error } = useLists();
//   const { addToCart } = useContext(ShopContext);

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
//   return (
//     <div className="container">
//       <section className="blackrose-section-slider pb-0 md:mt-10 mt-0">
//         <div className="next-container-center">
//           <Swiper
//             effect={'cards'}
//             grabCursor={true}
//             // modules={[EffectCards]}
//             modules={[Navigation, Parallax, EffectFade]}
//             speed={3000}
//             parallax={true}
//             loop={true}
//             // effect="fade"
//             navigation={{
//               nextEl: '.swiper-button-next',
//               prevEl: '.swiper-button-prev',
//             }}
//             className="swiper-container h-full"
//           >
//             {data?.products.map((slide, index) => (
//               <SwiperSlide key={slide._id}>
//                 <div className="swiper-slide-block">
//                   <div
//                     className="swiper-slide-block-img animate-box"
//                     data-animate-effect="fadeInLeft"
//                     data-swiper-parallax-y="100%"
//                   >
//                     <Link to={`/shop/${slide._id}`}>
//                       <img
//                         src={slide.images[0]}
//                         alt={slide.title}
//                         className="w-full object-cover md:h-full h-[300px]"
//                       />
//                     </Link>
//                   </div>
//                   <div
//                     className="swiper-slide-block-text animate-box"
//                     data-animate-effect="fadeInRight"
//                   >
//                     <h2
//                       data-swiper-parallax-x="-60%"
//                       className="next-main-title"
//                     >
//                       {slide.title}
//                     </h2>
//                     <h3
//                       data-swiper-parallax-x="-50%"
//                       className="next-main-subtitle"
//                     >
//                       {slide.subtitle}
//                     </h3>
//                     {/* <p data-swiper-parallax-x="-40%" className="next-paragraph">
//                       {slide.description}
//                     </p> */}
//                     <a
//                       data-swiper-parallax-x="-30%"
//                       className="next-link"
//                       href="#"
//                     >
//                       View Details
//                     </a>
//                     <span data-swiper-parallax-y="60%" className="next-number">
//                       {index + 1}
//                     </span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}

//             {/* Navigation buttons */}
//             <div
//               className="swiper-button-next animate-box"
//               data-animate-effect="fadeInRight"
//             >
//               <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
//             </div>
//             <div
//               className="swiper-button-prev animate-box"
//               data-animate-effect="fadeInLeft"
//             >
//               <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
//             </div>
//           </Swiper>
//         </div>
//       </section>
//       <section className="max-w-7xl mx-auto  py-10 relative">
//         <div className="flex justify-center items-center mb-8">
//           <h2 className="text-2xl font-bold">All Products</h2>
//           {/* <a
//             href="/products"
//             className="flex items-center hover:underline relative"
//           >
//             Shop All Products
//             <span className="ml-2">+</span>
//           </a> */}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
//           {data?.products?.map((product) => (
//             <div
//               key={product._id}
//               className=" py-4 rounded cursor-pointer relative"
//             >
//               <Link to={`/shop/${product._id}`} className="w-full mx-auto">
//                 <div className="relative w-full h-64 mb-4">
//                   <img
//                     src={product.images[0]}
//                     alt={product.title}
//                     className="w-full h-full object-cover mb-4 "
//                   />
//                 </div>
//               </Link>
//               <div className="flex justify-between items-center mb-2">
//                 <h3>{product.title}</h3>
//                 <span>₦{product.price.toFixed(2)}</span>
//               </div>
//               <div className="flex items-center mb-4">
//                 <div className="flex">
//                   {[1, 2, 3, 4, 5].map((star) => {
//                     const full = star <= Math.floor(product.rating);
//                     const half = !full && star - product.rating < 1;

//                     return (
//                       <svg
//                         key={star}
//                         className={`w-4 h-4 ${
//                           full
//                             ? 'text-yellow-400'
//                             : half
//                             ? 'text-yellow-300'
//                             : 'text-gray-400'
//                         }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     );
//                   })}
//                 </div>

//                 <span className="ml-2 text-sm">({product.reviews.length})</span>
//               </div>
//               <button
//                 onClick={() => addToCart(product._id, 1)}
//                 className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Shop;

// pages/Shop.jsx
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaFilter, FaTh, FaThList } from 'react-icons/fa';
import ProductCard from '../component/ProductCard';
import ProductFilters from '../component/ProductFilters';

const Shop = () => {
  const { useFilteredProducts } = useProducts();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    productType: '',
    brand: '',
    priceMin: '',
    priceMax: '',
    color: [],
    size: [],
    material: [],
    features: [],
    inStock: true,
    sortBy: 'newest',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, isLoading, error } = useFilteredProducts(
    filters,
    currentPage,
    itemsPerPage
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading products</h2>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Photography Equipment</h1>
          <p className="text-gray-400">
            Professional gear for photographers and content creators
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-6 bg-gray-900 rounded-lg p-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:border-white transition md:hidden"
          >
            <FaFilter />
            Filters
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 hidden md:inline">
              {data?.pagination?.totalProducts || 0} products
            </span>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleFilterChange({ ...filters, sortBy: e.target.value })
              }
              className="px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition relative"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition ${
                  viewMode === 'list'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FaThList />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64`}
          >
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <div
                  className={`${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }`}
                >
                  {data?.products?.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data?.pagination && data.pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!data.pagination.hasPrevPage}
                        className={`px-4 py-2 rounded-lg transition ${
                          data.pagination.hasPrevPage
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        Previous
                      </button>

                      {[...Array(data.pagination.totalPages)].map(
                        (_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === data.pagination.totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg transition ${
                                  page === currentPage
                                    ? 'bg-white text-black'
                                    : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 3 ||
                            page === currentPage + 3
                          ) {
                            return (
                              <span key={page} className="px-2">
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!data.pagination.hasNextPage}
                        className={`px-4 py-2 rounded-lg transition ${
                          data.pagination.hasNextPage
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* No Results */}
                {data?.products?.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-400">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
