/* eslint-disable react/prop-types */

import { useState } from 'react';
import {
  FaTimes,
  FaChevronDown,
  FaTag,
  FaPalette,
  FaRuler,
  FaCheck,
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiCurrencyDollar } from 'react-icons/hi';
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
    { label: 'Under ₦10,000', min: 0, max: 10000, icon: '💰' },
    { label: '₦10,000 - ₦50,000', min: 10000, max: 50000, icon: '💎' },
    { label: '₦50,000 - ₦100,000', min: 50000, max: 100000, icon: '🏆' },
    { label: '₦100,000 - ₦500,000', min: 100000, max: 500000, icon: '👑' },
    { label: 'Above ₦500,000', min: 500000, max: null, icon: '✨' },
  ];

  const colors = [
    { name: 'Black', value: 'Black', color: 'bg-black' },
    {
      name: 'White',
      value: 'White',
      color: 'bg-white border-2 border-gray-300',
    },
    { name: 'Gray', value: 'Gray', color: 'bg-gray-500' },
    { name: 'Brown', value: 'Brown', color: 'bg-amber-800' },
    { name: 'Blue', value: 'Blue', color: 'bg-blue-500' },
    { name: 'Red', value: 'Red', color: 'bg-red-500' },
    { name: 'Green', value: 'Green', color: 'bg-green-500' },
    {
      name: 'Gold',
      value: 'Gold',
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    },
    {
      name: 'Silver',
      value: 'Silver',
      color: 'bg-gradient-to-r from-gray-300 to-gray-500',
    },
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
    const hasActiveFilters =
      localFilters[sectionKey]?.length > 0 ||
      (sectionKey === 'price' &&
        (localFilters.priceMin || localFilters.priceMax)) ||
      (sectionKey === 'category' && localFilters.category);

    return (
      <div className={`group relative ${className}`}>
        {/* Section Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex justify-between items-center py-4 px-6 text-left hover:bg-gray-50/50 rounded-2xl transition-all duration-300 group/header"
        >
          <div className="flex items-center gap-3">
            {/* <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                hasActiveFilters
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 group-hover/header:bg-gray-200'
              }`}
            >
              {icon}
            </div> */}
            <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {/* <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {Array.isArray(localFilters[sectionKey])
                    ? localFilters[sectionKey].length
                    : '1'}
                </span> */}
              </div>
            )}
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                isExpanded
                  ? 'rotate-180 bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <FaChevronDown className="text-sm" />
            </div>
          </div>
        </button>

        {/* Section Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6">{children}</div>
        </div>

        {/* Section Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="relative bg-primary/90 p-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-light text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearFilters}
              className="group relative px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10 font-semibold">Clear All</span>
            </button>

            <button
              onClick={onClose}
              className="lg:hidden p-2 bg-white/20 backdrop-blur-sm rounded-2xl text-white hover:bg-white/30 transition-all duration-300"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      <div className="max-h-[calc(100vh-200px)] lg:max-h-none overflow-y-auto">
        <div className="p-2 space-y-2">
          {/* Categories */}
          {categoriesData && (
            <FilterSection
              title="Category"
              sectionKey="category"
              icon={<FaTag className="text-sm" />}
            >
              <div className="space-y-3">
                {categoriesData
                  ?.filter((cat) => !cat.parentCategory)
                  .map((category) => (
                    <label
                      key={category._id}
                      className="group/item flex items-center cursor-pointer p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 transition-all duration-300"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="category"
                          value={category._id}
                          checked={localFilters.category === category._id}
                          onChange={(e) =>
                            handleFilterChange('category', e.target.value)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                            localFilters.category === category._id
                              ? 'border-indigo-500 bg-primary'
                              : 'border-gray-300 group-hover/item:border-indigo-300'
                          }`}
                        >
                          {localFilters.category === category._id && (
                            <FaCheck className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                      </div>
                      <span className="ml-4 font-semibold text-gray-800 group-hover/item:text-primary transition-colors">
                        {category.title}
                      </span>
                    </label>
                  ))}
              </div>
            </FilterSection>
          )}

          {/* Price Range */}
          <FilterSection
            title="Price Range"
            sectionKey="price"
            icon={<HiCurrencyDollar className="text-sm" />}
          >
            <div className="space-y-3">
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
                    className="group/price flex items-center cursor-pointer p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/20 transition-all duration-300"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={isChecked}
                        onChange={() => handlePriceRangeChange(range)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          isChecked
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover/price:border-primary/20'
                        }`}
                      >
                        {isChecked && (
                          <FaCheck className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <span className="font-semibold text-gray-800 group-hover/price:text-primary transition-colors">
                        {range.label}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Colors */}
          <FilterSection
            title="Color"
            sectionKey="color"
            icon={<FaPalette className="text-sm" />}
          >
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color) => {
                const isSelected =
                  localFilters.color?.includes(color.value) || false;
                return (
                  <label
                    key={color.value}
                    className="group/color flex flex-col items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleArrayFilterChange('color', color.value)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`relative w-10 h-10 rounded-full ${
                        color.color
                      } transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-primary scale-110'
                          : 'group-hover/color:scale-105'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaCheck
                            className={`text-sm ${
                              color.value === 'White'
                                ? 'text-gray-800'
                                : 'text-white'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'text-primary'
                          : 'text-gray-600 group-hover/color:text-gray-800'
                      }`}
                    >
                      {color.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Sizes */}
          <FilterSection
            title="Size"
            sectionKey="size"
            icon={<FaRuler className="text-sm" />}
          >
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => {
                const isSelected = localFilters.size?.includes(size) || false;
                return (
                  <label
                    key={size}
                    className={`group/size cursor-pointer flex items-center justify-center min-w-[3rem] h-12 rounded-lg font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleArrayFilterChange('size', size)}
                      className="sr-only"
                    />
                    <span>{size}</span>
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                    )}
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Materials */}
          <FilterSection
            title="Material"
            sectionKey="material"
            icon={<HiSparkles className="text-sm" />}
          >
            <div className="space-y-2">
              {materials.map((material) => {
                const isSelected =
                  localFilters.material?.includes(material) || false;
                return (
                  <label
                    key={material}
                    className={`group/material flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary/10 to-primary/20 '
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          handleArrayFilterChange('material', material)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover/material:border-primary/30'
                        }`}
                      >
                        {isSelected && (
                          <FaCheck className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span
                      className={`ml-4 font-semibold transition-colors ${
                        isSelected
                          ? 'text-primary'
                          : 'text-gray-800 group-hover/material:text-primary/80'
                      }`}
                    >
                      {material}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection
            title="Features"
            sectionKey="features"
            icon={<HiLightningBolt className="text-sm" />}
          >
            <div className="space-y-2">
              {features.map((feature) => {
                const isSelected =
                  localFilters.features?.includes(feature) || false;
                return (
                  <label
                    key={feature}
                    className={`group/feature flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary/10 to-primary/20'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          handleArrayFilterChange('features', feature)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover/material:border-primary/30'
                        }`}
                      >
                        {isSelected && (
                          <FaCheck className="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>
                    <span
                      className={`ml-4 font-semibold transition-colors ${
                        isSelected
                          ? 'text-primary'
                          : 'text-gray-800 group-hover/feature:text-primary/60'
                      }`}
                    >
                      {feature}
                    </span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* In Stock */}
          <FilterSection
            title="Availability"
            sectionKey="stock"
            icon={<FaCheck className="text-sm" />}
          >
            <label
              className={`group/stock flex items-center cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                localFilters.inStock
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={localFilters.inStock}
                  onChange={(e) =>
                    handleFilterChange('inStock', e.target.checked)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-xl border-2 transition-all duration-300 ${
                    localFilters.inStock
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover/stock:border-primary/30'
                  }`}
                >
                  {localFilters.inStock && (
                    <FaCheck className="text-white text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="ml-4">
                <span
                  className={`font-bold text-lg transition-colors ${
                    localFilters.inStock
                      ? 'text-primary'
                      : 'text-gray-800 group-hover/stock:text-primary/60'
                  }`}
                >
                  In Stock Only
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Show only available products
                </p>
              </div>
            </label>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-100">
        <button
          onClick={onClose}
          className="group relative w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
          <span className="relative z-10 flex items-center justify-center gap-3">
            <FaCheck />
            Apply Filters
            {getActiveFiltersCount() > 0 && (
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                {getActiveFiltersCount()}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Add custom CSS for slow spin animation */}
      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductFilters;
