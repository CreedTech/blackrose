import { useState, useEffect } from 'react';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';

const ProductFilters = ({ filters, onFilterChange, onClose }) => {
  const { useCategories } = useProducts();
  const { data: categoriesData } = useCategories();
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: false,
    size: false,
    material: false,
    features: false,
    stock: true,
  });

  const priceRanges = [
    { label: 'Under ₦10,000', min: 0, max: 10000 },
    { label: '₦10,000 - ₦50,000', min: 10000, max: 50000 },
    { label: '₦50,000 - ₦100,000', min: 50000, max: 100000 },
    { label: '₦100,000 - ₦500,000', min: 100000, max: 500000 },
    { label: 'Above ₦500,000', min: 500000, max: null },
  ];

  const colors = [
    'Black',
    'White',
    'Gray',
    'Brown',
    'Blue',
    'Red',
    'Green',
    'Gold',
    'Silver',
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const materials = [
    'Fabric',
    'Paper',
    'Plastic',
    'Wood',
    'Metal',
    'Vinyl',
    'Canvas',
  ];
  const features = [
    'Waterproof',
    'Foldable',
    'Heat Resistant',
    'Travel-friendly',
    'Magnetic',
    'Reusable',
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = {
      ...localFilters,
      priceMin: range.min,
      priceMax: range.max || '',
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleArrayFilterChange = (key, value) => {
    const currentValues = localFilters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    handleFilterChange(key, newValues);
  };

  const clearFilters = () => {
    const clearedFilters = {
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
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.category) count++;
    if (localFilters.priceMin || localFilters.priceMax) count++;
    if (localFilters.color?.length > 0) count++;
    if (localFilters.size?.length > 0) count++;
    if (localFilters.material?.length > 0) count++;
    if (localFilters.features?.length > 0) count++;
    return count;
  };

  const FilterSection = ({ title, sectionKey, children, className = '' }) => {
    const isExpanded = expandedSections[sectionKey];

    return (
      <div className={`border-b border-gray-700 last:border-b-0 relative ${className}`}>
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex justify-between items-center py-3 md:py-4 text-left hover:text-gray-300 transition"
        >
          <h4 className="font-medium text-sm md:text-base">{title}</h4>
          <div className="flex items-center gap-2">
            {/* Show active count for array filters */}
            {localFilters[sectionKey]?.length > 0 && (
              <span className="bg-white text-black text-xs px-1.5 py-0.5 rounded-full">
                {localFilters[sectionKey].length}
              </span>
            )}
            {isExpanded ? (
              <FaChevronUp className="text-xs text-gray-400" />
            ) : (
              <FaChevronDown className="text-xs text-gray-400" />
            )}
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-200 ${
            isExpanded ? 'max-h-96 pb-3 md:pb-4' : 'max-h-0'
          }`}
        >
          <div className={`${isExpanded ? 'block' : 'hidden'}`}>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-semibold">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-white text-black text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={clearFilters}
            className="text-xs md:text-sm text-gray-400 hover:text-white transition px-2 py-1 rounded"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </div>

      {/* Filters Content */}
      <div className="max-h-[calc(100vh-200px)] lg:max-h-none overflow-y-auto">
        <div className="p-4 md:p-6 space-y-0">
          {/* Categories */}
          {categoriesData && (
            <FilterSection title="Category" sectionKey="category">
              <div className="space-y-2 md:space-y-3">
                {categoriesData
                  ?.filter((cat) => !cat.parentCategory)
                  .map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center cursor-pointer hover:text-gray-300 transition"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category._id}
                        checked={localFilters.category === category._id}
                        onChange={(e) =>
                          handleFilterChange('category', e.target.value)
                        }
                        className="mr-3 w-4 h-4 accent-white"
                      />
                      <span className="text-sm md:text-base">
                        {category.title}
                      </span>
                    </label>
                  ))}
              </div>
            </FilterSection>
          )}

          {/* Price Range */}
          <FilterSection title="Price Range" sectionKey="price">
            <div className="space-y-2 md:space-y-3">
              {priceRanges.map((range, index) => {
                const filterMin = Number(localFilters.priceMin) || 0;
                const filterMax =
                  localFilters.priceMax === ''
                    ? null
                    : Number(localFilters.priceMax);

                const isChecked =
                  filterMin === range.min &&
                  (range.max === null
                    ? filterMax === null
                    : filterMax === range.max);

                return (
                  <label
                    key={index}
                    className="flex items-center cursor-pointer hover:text-gray-300 transition"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={isChecked}
                      onChange={() => handlePriceRangeChange(range)}
                      className="mr-3 w-4 h-4 accent-white"
                    />
                    <span className="text-sm md:text-base">{range.label}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Colors */}
          <FilterSection title="Color" sectionKey="color">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {colors.map((color) => (
                <label
                  key={color}
                  className="flex items-center cursor-pointer hover:text-gray-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.color?.includes(color) || false}
                    onChange={() => handleArrayFilterChange('color', color)}
                    className="mr-2 md:mr-3 w-4 h-4 accent-white"
                  />
                  <span className="text-sm md:text-base">{color}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Sizes */}
          <FilterSection title="Size" sectionKey="size">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {sizes.map((size) => (
                <label
                  key={size}
                  className={`flex items-center justify-center min-w-12 h-10 md:h-12 border-2 rounded-lg cursor-pointer transition ${
                    localFilters.size?.includes(size)
                      ? 'border-white bg-white text-black'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={localFilters.size?.includes(size) || false}
                    onChange={() => handleArrayFilterChange('size', size)}
                    className="sr-only"
                  />
                  <span className="text-sm md:text-base font-medium">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Materials */}
          <FilterSection title="Material" sectionKey="material">
            <div className="space-y-2 md:space-y-3">
              {materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center cursor-pointer hover:text-gray-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.material?.includes(material) || false}
                    onChange={() =>
                      handleArrayFilterChange('material', material)
                    }
                    className="mr-3 w-4 h-4 accent-white"
                  />
                  <span className="text-sm md:text-base">{material}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection title="Features" sectionKey="features">
            <div className="space-y-2 md:space-y-3">
              {features.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center cursor-pointer hover:text-gray-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.features?.includes(feature) || false}
                    onChange={() =>
                      handleArrayFilterChange('features', feature)
                    }
                    className="mr-3 w-4 h-4 accent-white"
                  />
                  <span className="text-sm md:text-base">{feature}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* In Stock */}
          <FilterSection title="Availability" sectionKey="stock">
            <label className="flex items-center cursor-pointer hover:text-gray-300 transition">
              <input
                type="checkbox"
                checked={localFilters.inStock}
                onChange={(e) =>
                  handleFilterChange('inStock', e.target.checked)
                }
                className="mr-3 w-4 h-4 accent-white"
              />
              <span className="text-sm md:text-base">In Stock Only</span>
            </label>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden border-t border-gray-700 p-4">
        <button
          onClick={onClose}
          className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Apply Filters{' '}
          {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
