/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₦';
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();


  const [orderProcessing, setOrderProcessing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]); 


  const api = axios.create({
    baseURL: backendUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });


  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );


  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.data.success) {
        const { token: authToken, user: userData } = response.data;
        setToken(authToken);
        localStorage.setItem('token', authToken);
        setUser(userData);
        await getUserData(authToken);
        await getCart(authToken);
        toast.success('Login successful');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/user/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        const { token: authToken } = response.data;
        setToken(authToken);
        localStorage.setItem('token', authToken);
        toast.success('Registration successful');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setCartItems({});
    setWishlist([]);
    setAddresses([]);
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logged out successfully');
  };

  // Get user data
  const getUserData = async (authToken = token) => {
    if (!authToken) return;

    try {
      const response = await api.get('/user/me');
      if (response.data) {
        setUser(response.data);
        setWishlist(response.data.wishlist || []);
        setAddresses(response.data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const addToCart = async (
    productId,
    quantity = 1,
    variantId = null,
    selectedAttributes = {},
    isPreorder = false // Add this parameter
  ) => {
    if (!token) {
      toast.error('Please log in to add items to cart');
      navigate('/login');
      return false;
    }

    setLoading(true);
    try {
      const response = await api.post('/user/cart/add', {
        productId,
        quantity,
        variantId,
        selectedAttributes,
        isPreorder, // Include this in the request
      });

      if (response.data.success) {
        await getCart();

        // Show appropriate message based on inventory status
        if (response.data.inventoryStatus?.type === 'preorder') {
          toast.success('Pre-order item added to cart');
        } else if (response.data.inventoryStatus?.type === 'partial_preorder') {
          toast.success('Item added to cart (some items as preorder)');
        } else {
          toast.success('Item added to cart');
        }

        return true;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Could not add to cart';
      if (error.response?.data?.availableStock !== undefined) {
        toast.error(
          `Only ${error.response.data.availableStock} items available`
        );
      } else {
        toast.error(message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCart = async (authToken = token) => {
    if (!authToken) return;

    try {
      const response = await api.get('/user/cart');
      if (response.data) {
        const cartData = {};
        response.data.cartItems.forEach((item) => {
          // Clean up selectedAttributes to remove empty objects
          const cleanedAttributes = {};
          if (item.selectedAttributes) {
            Object.entries(item.selectedAttributes).forEach(([key, value]) => {
              // Only include attributes that have actual values (not empty objects)
              if (
                value &&
                typeof value === 'object' &&
                Object.keys(value).length === 0
              ) {
                // Skip empty objects
                return;
              }
              cleanedAttributes[key] = value;
            });
          }

          cartData[item.key] = {
            ...item,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            selectedAttributes: cleanedAttributes, // Use cleaned attributes
            title: item.product.title,
            image: item.product.image,
            price: item.product.price,
            finalPrice: item.product.finalPrice || item.product.price,
            availableStock: item.product.availableStock,
            isAvailable: item.product.isAvailable,
          };
        });
        setCartItems(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (cartKey, quantity) => {
    if (!token || quantity < 0) return;

    try {
      const response = await api.put('/user/cart/quantity', {
        cartKey,
        quantity,
      });

      if (response.data.success) {
        await getCart();
        toast.success('Cart updated');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeFromCart = async (cartKey) => {
    if (!token) return;

    try {
      const response = await api.post('/user/cart/remove', { cartKey });

      if (response.data.success) {
        await getCart();
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    setCartItems({});
  };

  // Wishlist functions
  const addToWishlist = async (
    productId,
    variantId = null,
    selectedAttributes = {}
  ) => {
    if (!token) {
      toast.error('Please log in to add items to wishlist');
      navigate('/login');
      return false;
    }

    try {
      const response = await api.post('/user/wishlist/add', {
        productId,
        variantId,
        selectedAttributes,
      });

      if (response.data.success) {
        await getUserData();
        toast.success('Added to wishlist');
        return true;
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId, variantId = null) => {
    try {
      const response = await api.post('/user/wishlist/remove', {
        productId,
        variantId,
      });

      if (response.data.success) {
        await getUserData();
        toast.success('Removed from wishlist');
        return true;
      }
    } catch (error) {
      toast.error('Failed to remove from wishlist');
      return false;
    }
  };

  const isInWishlist = (productId, variantId = null) => {
    return wishlist.some(
      (item) =>
        item.productId?._id === productId &&
        (variantId ? item.variantId === variantId : true)
    );
  };

  // Address management
  const addAddress = async (addressData) => {
    try {
      const response = await api.post('/user/address', addressData);
      if (response.data.success) {
        await getUserData();
        toast.success('Address added successfully');
        return true;
      }
    } catch (error) {
      toast.error('Failed to add address');
      return false;
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      const response = await api.put(`/user/address/${addressId}`, addressData);
      if (response.data.success) {
        await getUserData();
        toast.success('Address updated successfully');
        return true;
      }
    } catch (error) {
      toast.error('Failed to update address');
      return false;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await api.delete(`/user/address/${addressId}`);
      if (response.data.success) {
        await getUserData();
        toast.success('Address deleted successfully');
        return true;
      }
    } catch (error) {
      toast.error('Failed to delete address');
      return false;
    }
  };


  const createOrder = async (
    addressData,
    shippingMethod = 'standard',
    notes = ''
  ) => {
    if (Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    setOrderProcessing(true);
    try {
      
      const items = Object.values(cartItems).map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        selectedAttributes: item.selectedAttributes,
        isPreorder: item.isPreorder || false, 
      }));

   
      const hasPreorderItems = items.some((item) => item.isPreorder);

      const orderData = {
        items,
        shippingAddress: addressData,
        billingAddress: addressData,
        paymentMethod: 'paystack',
        shippingMethod,
        notes,
      };

      const response = await api.post('/order/create', orderData);

      if (response.data.success) {
        setCurrentOrder(response.data.order);

        // Show appropriate success message
        if (response.data.hasPreorderItems) {
          toast.success(
            'Order created successfully! Some items are preorders and will require additional processing time.'
          );
        } else {
          toast.success('Order created successfully!');
        }

        return response.data.order;
      }
    } catch (error) {
      console.error('Order creation error:', error);

      // Handle specific error cases
      if (error.response?.data?.canPreorder) {
        toast.error(
          `${error.response.data.message}. You can enable preorder for out-of-stock items.`
        );
      } else {
        toast.error(error.response?.data?.message || 'Failed to create order');
      }

      return null;
    } finally {
      setOrderProcessing(false);
    }
  };

  // Payment functions
  const initializePayment = async (orderId) => {
    setLoading(true);
    try {
      const response = await api.post('/payment/initialize', {
        orderId,
        callbackUrl: `${window.location.origin}/payment/status`,
      });

      if (response.data.success) {
        window.location.href = response.data.data.authorization_url;
        return true;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Payment initialization failed'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    setLoading(true);
    try {
      const response = await api.get(`/payment/verify/${reference}`);

      if (response.data.success) {
        if (response.data.data.status === 'success') {
          await getCart();
          toast.success('Payment successful');
        }
        return response.data.data;
      }
    } catch (error) {
      toast.error('Payment verification failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatus = async (reference) => {
    try {
      const response = await api.get(`/payment/status/${reference}`);
      return response.data.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  };

  // Order management
  const fetchOrders = async (status = null, page = 1, limit = 10) => {
    setOrdersLoading(true);
    try {
      const params = { page, limit };
      if (status) params.status = status;

      const response = await api.get('/order/my-orders', { params });

      if (response.data.success) {
        setOrders(response.data.orders);
        if (response.data.orders.length > 0 && !selectedOrder) {
          setSelectedOrder(response.data.orders[0]);
        }
        return response.data;
      }
    } catch (error) {
      toast.error('Failed to load orders');
      return { orders: [], pagination: {} };
    } finally {
      setOrdersLoading(false);
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/order/${orderId}`);
      if (response.data.success) {
        return response.data.order;
      }
    } catch (error) {
      toast.error('Failed to load order details');
      return null;
    }
  };

  const cancelOrder = async (orderId, reason) => {
    try {
      const response = await api.post(`/order/${orderId}/cancel`, { reason });

      if (response.data.success) {
        await fetchOrders();
        toast.success('Order cancelled successfully');
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
      return false;
    }
  };

  // Bulk order operations
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      }
      return [...prev, orderId];
    });
  };

  const selectAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order._id));
    }
  };

  const exportSelectedOrders = async () => {
    if (selectedOrders.length === 0) {
      toast.error('Please select orders to export');
      return;
    }

    try {
      const orderDetails = await Promise.all(
        selectedOrders.map((orderId) => getOrderDetails(orderId))
      );

      // Create CSV content
      const csvContent = generateOrdersCSV(orderDetails);
      downloadCSV(
        csvContent,
        `orders_${new Date().toISOString().split('T')[0]}.csv`
      );
      toast.success('Orders exported successfully');
    } catch (error) {
      toast.error('Failed to export orders');
    }
  };

  // Product review functions
  const addProductReview = async (productId, rating, comment) => {
    if (!token) {
      toast.error('Please log in to add a review');
      navigate('/login');
      return false;
    }

    try {
      const response = await api.post('/product/review', {
        productId,
        rating,
        comment,
      });

      if (response.data.success) {
        toast.success('Review added successfully');
        return true;
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('You have already reviewed this product');
      } else {
        toast.error('Failed to add review');
      }
      return false;
    }
  };


  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);

      if (response.data.success) {
        await getUserData();
        setUser(response.data.user);
        toast.success('Profile updated successfully');
        return true;
      }
      return false;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return false;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await api.put('/user/change-password', passwordData);

      if (response.data.success) {
        toast.success('Password changed successfully');
        return true;
      }
      return false;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to change password';
      toast.error(message);
      return false;
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      const response = await api.put('/user/preferences', preferences);
      if (response.data.success) {
        await getUserData();
        toast.success('Preferences updated successfully');
        return true;
      }
    } catch (error) {
      toast.error('Failed to update preferences');
      return false;
    }
  };

  // Track product views
  const trackProductView = async (productId) => {
    if (!token) return;

    try {
      await api.post('/user/recently-viewed', { productId });
    } catch (error) {
      console.error('Failed to track product view:', error);
    }
  };

  // Helper functions
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  const getCartAmount = () => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0
    );
  };

  const formatOrderDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getOrderStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      processing: 'bg-purple-500',
      shipped: 'bg-indigo-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500',
      returned: 'bg-orange-500',
      refunded: 'bg-pink-500',
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-500';
  };

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      success: 'bg-green-500',
      pending: 'bg-yellow-500',
      failed: 'bg-red-500',
      refunded: 'bg-purple-500',
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-500';
  };

  // CSV generation helper
  const generateOrdersCSV = (orders) => {
    const headers = [
      'Order ID',
      'Date',
      'Status',
      'Payment Status',
      'Amount',
      'Items',
    ];
    const rows = orders.map((order) => [
      order._id,
      formatOrderDate(order.date),
      order.status,
      order.paymentStatus,
      `₦${order.amount.toLocaleString()}`,
      order.items.map((item) => `${item.title} (x${item.quantity})`).join('; '),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetOrdersLoading = () => {
    setOrdersLoading(false);
  };

  // Checkout helper
  const checkout = async (
    addressData,
    shippingMethod = 'standard',
    notes = ''
  ) => {
    const order = await createOrder(addressData, shippingMethod, notes);
    if (order) {
      return await initializePayment(order._id);
    }
    return false;
  };

  // Initialize
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
      getCart();
    } else {
      setUser(null);
      setCartItems({});
      setWishlist([]);
      setAddresses([]);
    }
  }, [token]);

  const value = {
    // State
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    token,
    loading,
    user,
    wishlist,
    addresses,

    // Auth functions
    login,
    register,
    logout,
    setToken,

    // Cart functions
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartAmount,

    // Wishlist functions
    addToWishlist,
    removeFromWishlist,
    isInWishlist,

    // Address functions
    addAddress,
    updateAddress,
    deleteAddress,

    // Order functions
    createOrder,
    fetchOrders,
    getOrderDetails,
    cancelOrder,
    orderProcessing,
    currentOrder,
    orders,
    ordersLoading,
    selectedOrder,
    setSelectedOrder,
    selectedOrders,
    toggleOrderSelection,
    selectAllOrders,
    exportSelectedOrders,
    resetOrdersLoading,

    // Payment functions
    initializePayment,
    verifyPayment,
    getPaymentStatus,
    checkout,

    // Profile functions
    updateProfile,
    updatePreferences,
    changePassword,

    // Product functions
    addProductReview,
    trackProductView,

    // Helper functions
    navigate,
    backendUrl,
    formatOrderDate,
    getOrderStatusColor,
    getPaymentStatusColor,
    setLoading,
  };

  return (
    <ShopContext.Provider value={value}>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        </div>
      )}
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
