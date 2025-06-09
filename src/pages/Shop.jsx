import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { FaFilter, FaTh, FaThList, FaTimes } from 'react-icons/fa';
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Error loading products
          </h2>
          <p className="text-gray-400 text-sm md:text-base">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Photography Equipment
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Professional gear for photographers and content creators
          </p>
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-gray-900 shadow-xl overflow-y-auto">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            {/* Left section - Filter button and product count */}
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-700 rounded-lg hover:border-white transition lg:hidden text-sm md:text-base"
              >
                <FaFilter />
                Filters
              </button>

              <span className="text-gray-400 text-xs md:text-sm lg:text-base">
                {data?.pagination?.totalProducts || 0} products
              </span>
            </div>

            {/* Right section - Sort and view controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 relative">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  handleFilterChange({ ...filters, sortBy: e.target.value })
                }
                className="px-3 md:px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white transition text-sm md:text-base flex-1 sm:flex-none min-w-0"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition text-sm md:text-base ${
                    viewMode === 'grid'
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition text-sm md:text-base ${
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
        </div>

        <div className="flex gap-4 md:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-64 xl:w-72">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-32 md:h-64">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <div
                  className={`${
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6'
                      : 'space-y-3 md:space-y-4'
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
                  <div className="mt-6 md:mt-8 flex justify-center">
                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!data.pagination.hasPrevPage}
                        className={`px-3 md:px-4 py-2 rounded-lg transition text-sm md:text-base ${
                          data.pagination.hasPrevPage
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        Prev
                      </button>

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
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 md:px-4 py-2 rounded-lg transition text-sm md:text-base ${
                                  page === currentPage
                                    ? 'bg-white text-black'
                                    : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span
                                key={page}
                                className="px-1 md:px-2 text-sm md:text-base"
                              >
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
                        className={`px-3 md:px-4 py-2 rounded-lg transition text-sm md:text-base ${
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
                  <div className="text-center py-8 md:py-12">
                    <h3 className="text-lg md:text-xl font-medium mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
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
