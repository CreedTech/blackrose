import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem('token');

const productsAPI = {
  fetchProducts: async () => {
    // const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.get(`${API_URL}/product/list`, {
      //   headers,
    });
    console.log(data);
    return data;
  },
  fetchProductById: async (productId) => {
    // const headers = token ? { Authorization: `Bearer ${token}` } : {};
    if (!productId) return null;
    const { data } = await axios.get(`${API_URL}/product/single/${productId}`, {
      //   headers,
    });
    console.log(data);
    return data;
  },
  fetchSimilarProducts: async (productId) => {
    const { data } = await axios.get(`${API_URL}/product/similar/${productId}`);
    return data.products;
  },
};

export const useProducts = () => {
  //   const queryClient = useQueryClient();

  const useLists = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: productsAPI.fetchProducts,
      // Only fetch if user is authenticated
      //   enabled: !!localStorage.getItem('token'),
    });
  };
  const useGetSingleProduct = (productId) => {
    return useQuery({
      queryKey: ['product', productId],
      queryFn: () => productsAPI.fetchProductById(productId),
      enabled: !!productId,
    });
  };
  const useSimilarProducts = (productId) => {
    return useQuery({
      queryKey: ['similarProducts', productId],
      queryFn: () => productsAPI.fetchSimilarProducts(productId),
      enabled: !!productId,
    });
  };

  return {
    useLists,
    useGetSingleProduct,
    useSimilarProducts,
  };
};
