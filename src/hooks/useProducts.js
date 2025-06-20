
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const productsAPI = {

  fetchProducts: async (filters = {}, page = 1, limit = 12) => {
    const params = new URLSearchParams();

    // Add filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.append(key, value.join(','));
          }
        } else if (key === 'priceMin' || key === 'priceMax') {
          // Ensure price values are sent as numbers
          params.append(key, String(Number(value) || 0));
        } else if (typeof value === 'boolean') {
          params.append(key, value.toString());
        } else {
          params.append(key, value);
        }
      }
    });

    params.append('page', page);
    params.append('limit', limit);

    const { data } = await axios.get(
      `${API_URL}/product/list?${params.toString()}`
    );
    return data;
  },

  fetchProductById: async (productId) => {
    if (!productId) return null;
    const { data } = await axios.get(`${API_URL}/product/single/${productId}`);
    return data;
  },

  fetchSimilarProducts: async (productId) => {
    const { data } = await axios.get(`${API_URL}/product/similar/${productId}`);
    return data.products;
  },

  fetchProductVariants: async (productId, selectedAttributes = {}) => {
    const params = new URLSearchParams(selectedAttributes);
    const { data } = await axios.get(
      `${API_URL}/product/variants/${productId}?${params.toString()}`
    );
    return data;
  },

  checkAvailability: async (productId, variantId, quantity) => {
    const params = new URLSearchParams({ quantity });
    if (variantId) params.append('variantId', variantId);

    const { data } = await axios.get(
      `${API_URL}/product/check-availability/${productId}?${params.toString()}`
    );
    return data;
  },

  fetchCategories: async () => {
    const { data } = await axios.get(`${API_URL}/category`);
    return data;
  },

  fetchProductsByCategory: async (categoryId, page = 1, limit = 12) => {
    const { data } = await axios.get(
      `${API_URL}/product/category/${categoryId}?page=${page}&limit=${limit}`
    );
    return data;
  },
};

export const useProducts = () => {

  const useLists = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: () => productsAPI.fetchProducts(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useFilteredProducts = (filters, page, limit) => {
    return useQuery({
      queryKey: ['products', 'filtered', filters, page, limit],
      queryFn: () => productsAPI.fetchProducts(filters, page, limit),
      keepPreviousData: true,
    });
  };

  const useGetSingleProduct = (productId) => {
    return useQuery({
      queryKey: ['product', productId],
      queryFn: () => productsAPI.fetchProductById(productId),
      enabled: !!productId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const useSimilarProducts = (productId) => {
    return useQuery({
      queryKey: ['similarProducts', productId],
      queryFn: () => productsAPI.fetchSimilarProducts(productId),
      enabled: !!productId,
    });
  };

  const useProductVariants = (productId, selectedAttributes) => {
    return useQuery({
      queryKey: ['productVariants', productId, selectedAttributes],
      queryFn: () =>
        productsAPI.fetchProductVariants(productId, selectedAttributes),
      enabled: !!productId,
    });
  };

  const useCheckAvailability = (productId, variantId, quantity) => {
    return useQuery({
      queryKey: ['availability', productId, variantId, quantity],
      queryFn: () =>
        productsAPI.checkAvailability(productId, variantId, quantity),
      enabled: !!productId && !!quantity,
    });
  };

  const useCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: productsAPI.fetchCategories,
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };

  const useProductsByCategory = (categoryId, page, limit) => {
    return useQuery({
      queryKey: ['products', 'category', categoryId, page, limit],
      queryFn: () =>
        productsAPI.fetchProductsByCategory(categoryId, page, limit),
      enabled: !!categoryId,
    });
  };

  return {
    useLists,
    useFilteredProducts,
    useGetSingleProduct,
    useSimilarProducts,
    useProductVariants,
    useCheckAvailability,
    useCategories,
    useProductsByCategory,
  };
};
