import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';

const ProductFilters = ({ filters, onFilterChange, onClose }) => {
  const { useCategories } = useProducts();
  const { data: categoriesData } = useCategories();
  const [localFilters, setLocalFilters] = useState(filters);
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

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handlePriceRangeChange = (range) => {
    // Use a batch update to ensure both values are set together
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

  return (
    <div className="bg-gray-900 rounded-lg p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="space-y-6 relative">
        {/* Categories */}
        {categoriesData && (
          <div>
            <h4 className="font-medium mb-3">Category</h4>
            <div className="space-y-2">
              {categoriesData
                ?.filter((cat) => !cat.parentCategory)
                .map((category) => (
                  <label key={category._id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category._id}
                      checked={localFilters.category === category._id}
                      onChange={(e) =>
                        handleFilterChange('category', e.target.value)
                      }
                      className="mr-2 relative"
                    />
                    <span className="text-sm">{category.title}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2 relative">
            {priceRanges.map((range, index) => {
              // Convert filter values to numbers for comparison
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
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={isChecked}
                    onChange={() => handlePriceRangeChange(range)}
                    className="mr-2 relative"
                  />
                  <span className="text-sm">{range.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className="font-medium mb-3">Color</h4>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.color?.includes(color) || false}
                  onChange={() => handleArrayFilterChange('color', color)}
                  className="mr-2"
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-medium mb-3">Size</h4>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.size?.includes(size) || false}
                  onChange={() => handleArrayFilterChange('size', size)}
                  className="mr-2"
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className="font-medium mb-3">Material</h4>
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.material?.includes(material) || false}
                  onChange={() => handleArrayFilterChange('material', material)}
                  className="mr-2"
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-medium mb-3">Features</h4>
          <div className="space-y-2">
            {features.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.features?.includes(feature) || false}
                  onChange={() => handleArrayFilterChange('features', feature)}
                  className="mr-2"
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localFilters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
