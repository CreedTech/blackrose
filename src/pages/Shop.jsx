

import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { FaFilter, FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa';
import { HiSparkles, HiViewGrid, HiViewList } from 'react-icons/hi';
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.color?.length > 0) count++;
    if (filters.size?.length > 0) count++;
    if (filters.material?.length > 0) count++;
    if (filters.features?.length > 0) count++;
    return count;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-black/50 to-black/90 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-white text-2xl" />
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          {/* <p className="text-gray-600 text-lg">{error.message}</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/20"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary rounded-full px-4 py-2 mb-6">
              <HiSparkles className="text-light animate-pulse" />
              <span className="text-light font-semibold text-sm">
                Premium Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-4">
              Photography Equipment
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Professional gear for photographers and content creators
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl overflow-y-auto">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>
        )}

        {/* Modern Controls Bar */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 p-6 mb-8 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-pink-50/50 opacity-60"></div>

          <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* Left section */}
            <div className="flex items-center justify-between lg:justify-start gap-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="group relative flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl lg:hidden overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <FaFilter className="relative z-10" />
                <span className="relative z-10 font-semibold">Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="relative z-10 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-bold text-lg">
                  {data?.pagination?.totalProducts || 0}{' '}
                  <span className="font-normal text-gray-600">
                    product{data?.pagination?.totalProducts !== 1 ? 's' : ''}
                  </span>
                </span>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center justify-between lg:justify-end gap-4">
              {/* Sort Dropdown */}
              <div className="relative group">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, sortBy: e.target.value })
                  }
                  className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-300 font-semibold text-gray-700 hover:bg-white cursor-pointer min-w-[200px]"
                >
                  <option value="newest"> Newest First</option>
                  <option value="price_low"> Price: Low to High</option>
                  <option value="price_high"> Price: High to Low</option>
                  <option value="popular"> Most Popular</option>
                  <option value="rating"> Highest Rated</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`group relative p-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-lg text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {viewMode === 'grid' && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl"></div>
                  )}
                  <HiViewGrid className="text-lg relative z-10" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`group relative p-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list'
                      ? 'bg-white shadow-lg text-primary'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {viewMode === 'list' && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl"></div>
                  )}
                  <HiViewList className="text-lg relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 xl:w-96">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
                </div>
                <p className="mt-6 text-lg text-gray-600 font-medium">
                  Loading amazing products...
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6 lg:gap-8'
                      : 'space-y-6'
                  }`}
                >
                  {data?.products?.map((product, index) => (
                    <div
                      key={product._id}
                      className="animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both',
                      }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </div>
                  ))}
                </div>

                {/* Premium Pagination */}

                {data?.pagination && data.pagination.totalPages > 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="mt-40 mb-60 text-center animate-box">
                      <ul className="flex items-center blackrose-pagination-wrap align-center relative">
                        <li>
                          <a
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={` text-gray-700 hover:text-gray-900 ${
                              data.pagination.hasPrevPage
                                ? ' cursor-pointer'
                                : 'cursor-not-allowed pointer-events-none '
                            }`}
                          >
                            {data.pagination.hasPrevPage && (
                              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                            )}
                            <i className="fa fa-angle-left"></i>
                          </a>
                        </li>

                        <div className="">
                          {[...Array(data.pagination.totalPages)].map(
                            (_, index) => {
                              const page = index + 1;
                              const showPage =
                                page === 1 ||
                                page === data.pagination.totalPages ||
                                (page >= currentPage - 1 &&
                                  page <= currentPage + 1);

                              if (showPage) {
                                return (
                                  <li
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`p-0.5  transition-all rounded-full duration-300 ${
                                      page === currentPage
                                        ? 'bg-primary text-white'
                                        : 'border border-gray-700 text-white hover:bg-gray-800 hover:text-dark'
                                    }`}
                                  >
                                    <span className="inline-block w-10 h-10 leading-10 text-center text-[#999] font-light border border-[#222] rounded-full hover:bg-light">
                                      <span className=" font-thin hover:text-dark ">
                                        {page}
                                      </span>
                                    </span>
                                  </li>
                                );
                              } else if (
                                page === currentPage - 2 ||
                                page === currentPage + 2
                              ) {
                                return (
                                  <span key={page} className="text-gray-700">
                                    ...
                                  </span>
                                );
                              }
                              return null;
                            }
                          )}
                        </div>
                        <li>
                          <a
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!data.pagination.hasNextPage}
                            className={`text-gray-700 hover:text-gray-900${
                              data.pagination.hasNextPage
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed pointer-events-none '
                            }`}
                          >
                            <i className="fa fa-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* No Results State */}
                {data?.products?.length === 0 && (
                  <div className="text-center py-16">
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-12 max-w-md mx-auto">
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaSearch className="text-gray-500 text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your filters or search criteria to find
                        what you&apos;re looking for.
                      </p>
                      <button
                        onClick={() =>
                          handleFilterChange({
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
                          })
                        }
                        className="group relative px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:from-primary/20 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        <span className="relative z-10">Clear All Filters</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Shop;
