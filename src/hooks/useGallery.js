import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem('token');
// Separate API calls
const galleryApi = {
  fetchImages: async ({ page = 1, category, search }) => {
    const { data } = await axios.get(`${API_URL}/gallery`, {
      params: { page, category, search },
    });
    return data;
  },
  fetchcategories: async () => {
    const { data } = await axios.get(`${API_URL}/category`);
    return data;
  },
  fetchFeaturedCategories: async () => {
    const { data } = await axios.get('/category/featured');
    return data;
  },

  fetchCategoryBySlug: async (slug) => {
    if (!slug) return null;
    const { data } = await axios.get(`/category/${slug}`);
    return data;
  },
  fetchImageById: async (imageId) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    if (!imageId) return null;
    const { data } = await axios.get(`${API_URL}/gallery/${imageId}`, {
      headers,
    });
    console.log(data);
    return data;
  },

  likeImage: async (imageId) => {
    const token = localStorage.getItem('token'); // Retrieve the auth token from localStorage (or wherever it's stored)

    if (!token) {
      console.log('No token found, user may not be logged in.');
      return; // Optionally handle this case, e.g., show a message to the user
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/gallery/images/${imageId}/like`,
        {}, // No body is needed for like/unlike action, so pass an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      return data; // Return the response data from the backend
    } catch (error) {
      console.error('Error liking image:', error);
      // Optionally handle the error (show an alert or message to the user)
    }
  },

  fetchCollections: async () => {
    const { data } = await axios.get(`${API_URL}/gallery/collections`);
    return data;
  },

  createCollection: async (collectionData) => {
    const { data } = await axios.post(
      `${API_URL}/gallery/collections`,
      collectionData
    );
    return data;
  },

  addToCollection: async ({ collectionId, imageId }) => {
    const { data } = await axios.post(
      `${API_URL}/gallery/collections/${collectionId}/images/${imageId}`
    );
    return data;
  },

  downloadImage: async (imageId) => {
    const { data } = await axios.get(`${API_URL}/gallery/${imageId}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.downloadUrl;
  },
};

export const useGallery = () => {
  const queryClient = useQueryClient();

  // Images queries and mutations
  const useImages = (options = {}) => {
    const { page = 1, category, search } = options;

    return useQuery({
      queryKey: ['images', page, category, search],
      queryFn: () => galleryApi.fetchImages({ page, category, search }),
      keepPreviousData: true,
    });
  };

  const useLikeImage = () => {
    return useMutation({
      mutationFn: galleryApi.likeImage,
      // Update cache optimistically
      onMutate: async (imageId) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries(['image', imageId]);

        // Snapshot the previous value
        const previousImage = queryClient.getQueryData(['image', imageId]);

        // Optimistically update to the new value
        queryClient.setQueryData(['image', imageId], (old) => ({
          ...old,
          isLiked: !old.isLiked,
          likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
        }));

        return { previousImage };
      },
      // If mutation fails, roll back to the previous value
      onError: (err, imageId, context) => {
        queryClient.setQueryData(['image', imageId], context.previousImage);
      },
      // After success or failure, refetch
      onSettled: (imageId) => {
        queryClient.invalidateQueries(['image', imageId]);
      },
    });
  };
  const useCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: galleryApi.fetchcategories,
    });
  };
  const useFeaturedCategories = () => {
    return useQuery({
      queryKey: ['categories', 'featured'],
      queryFn: galleryApi.fetchFeaturedCategories,
    });
  };

  const useCategoryBySlug = (slug) => {
    return useQuery({
      queryKey: ['categories', slug],
      queryFn: galleryApi.fetchCategoryBySlug(slug),
      enabled: !!slug,
    });
  };
  const useGetSingleImage = (imageId) => {
    return useQuery({
      queryKey: ['image', imageId],
      queryFn: () => galleryApi.fetchImageById(imageId),
      enabled: !!imageId, // Only run query if imageId exists
    });
  };
  const useDownloadImage = () => {
    return useMutation({
      mutationFn: galleryApi.downloadImage,
      onSuccess: (data, imageId) => {
        // Optionally update image stats after download
        queryClient.invalidateQueries(['image', imageId]);
      },
    });
  };
  // Collections queries and mutations
  const useCollections = () => {
    return useQuery({
      queryKey: ['collections'],
      queryFn: galleryApi.fetchCollections,
    });
  };

  const useCreateCollection = () => {
    return useMutation({
      mutationFn: galleryApi.createCollection,
      onSuccess: () => {
        queryClient.invalidateQueries(['collections']);
      },
    });
  };

  const useAddToCollection = () => {
    return useMutation({
      mutationFn: galleryApi.addToCollection,
      onSuccess: () => {
        queryClient.invalidateQueries(['collections']);
      },
    });
  };

  return {
    useImages,
    useLikeImage,
    useCollections,
    useCreateCollection,
    useAddToCollection,
    useCategories,
    useFeaturedCategories,
    useCategoryBySlug,
    useGetSingleImage,
    useDownloadImage,
  };
};
