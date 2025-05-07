/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { assets } from '../assets/images/assets';
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
  // const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // New checkout-related state
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast.error('Please log in to add items to cart');
      return;
    }

    setLoading(true);
    try {
      // const userId = localStorage.getItem('userId'); // you can decode token instead
      const response = await axios.post(
        `${backendUrl}/cart/add`,
        {
          // userId,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cart); // update local cart
        toast.success('Item added to cart');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.message || 'Could not add to cart');
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    Object.values(cartItems).forEach((item) => {
      totalCount += Number(item.quantity) || 0; // Ensure it's a number
    });

    return totalCount;
  };

  const updateQuantity = async (productId, quantity) => {
    // Create a shallow copy of cartItems
    let cartData = { ...cartItems };

    if (quantity === 0) {
      // ✅ Remove the item completely if quantity is 0
      if (cartData[productId]) {
        delete cartData[productId];
      }
    } else {
      // ✅ Update quantity or add the product if not already present
      cartData[productId] = {
        ...cartData[productId],
        quantity,
      };
    }

    // Update state
    setCartItems(cartData);
    toast.success('Cart updated');

    // ✅ Sync with backend if token is available
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/update`,
          {
            // userId: localStorage.getItem('userId'),
            productId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error('Failed to update cart');
      }
    }
  };

  const getCartAmount = () => {
    return Object.values(cartItems).reduce(
      (sum, item) => sum + item.quantity * item.finalPrice,
      0
    );
  };

  const getUserCart = async () => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    if (!token) return;

    setLoading(true);
    try {
      // const userId = localStorage.getItem('userId');
      const res = await axios.get(`${backendUrl}/cart/get`, { headers });
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      toast.error('Could not fetch cart');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    let cartData = { ...cartItems };

    if (cartData[productId]) {
      delete cartData[productId];
      setCartItems(cartData);
      toast.success('Item removed from cart');
    }

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/remove`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // or { token } based on your backend
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error('Failed to remove item');
      }
    }
  };
  const clearCart = async () => {
    setCartItems({}); // Clear cart locally
    toast.success('Cart cleared');

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/cart/clear`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error('Failed to clear cart');
      }
    }
  };

  // New checkout and payment functions
  /**
   * Creates an order from the current cart
   * @param {Object} addressData - The delivery information
   * @returns {Promise<Object>} - The created order
   */
  const createOrder = async (addressData) => {
    if (Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    if (!token) {
      toast.error('Please log in to place an order');
      return null;
    }

    setOrderProcessing(true);
    try {
      // Format cart items for order creation
      const orderItems = Object.entries(cartItems).map(([productId, item]) => ({
        productId,
        title: item.title,
        price: item.finalPrice,
        quantity: item.quantity,
        image: item.image,
      }));

      // Calculate total amount
      const amount = getCartAmount();

      // Create order request
      const orderData = {
        items: orderItems,
        amount,
        address: addressData,
        paymentMethod: 'paystack',
        date: Date.now(),
      };

      // Send order creation request
      const response = await axios.post(
        `${backendUrl}/order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCurrentOrder(response.data.order);
        toast.success('Order created successfully');
        return response.data.order;
      } else {
        toast.error(response.data.message || 'Failed to create order');
        return null;
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
      return null;
    } finally {
      setOrderProcessing(false);
    }
  };

  /**
   * Initializes a Paystack payment for the given order
   * @param {string} orderId - The ID of the order to pay for
   * @returns {Promise<boolean>} - Whether payment initialization was successful
   */
  const initializePayment = async (orderId) => {
    if (!token) {
      toast.error('Please log in to make payment');
      return false;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/payment/initialize`,
        {
          orderId,
          callbackUrl: `${window.location.origin}/payment/callback`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Redirect to Paystack payment page
        window.location.href = response.data.data.authorization_url;
        return true;
      } else {
        toast.error(response.data.message || 'Failed to initialize payment');
        return false;
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to initialize payment'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifies a payment using the reference from Paystack callback
   * @param {string} reference - The payment reference
   * @returns {Promise<Object>} - The verification result
   */
  const verifyPayment = async (reference) => {
    if (!token) {
      toast.error('Please log in to verify payment');
      return null;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/payment/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // If payment was successful, clear the cart
        if (response.data.data.status === 'success') {
          await clearCart();
          toast.success('Payment successful');
        }
        return response.data.data;
      } else {
        toast.error(response.data.message || 'Payment verification failed');
        return null;
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error(
        error.response?.data?.message || 'Payment verification failed'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initiates the checkout process
   * @param {Object} addressData - The delivery information
   */
  const checkout = async (addressData) => {
    const order = await createOrder(addressData);
    if (order) {
      return await initializePayment(order._id);
    }
    return false;
  };

  /**
   * Gets the payment status for a reference
   * @param {string} reference - The payment reference
   */
  const getPaymentStatus = async (reference) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/payment/status/${reference}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      toast.error('Failed to check payment status');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      //   getUserCart(localStorage.getItem('token'));
    }
    if (token) {
      getUserCart();
    }
  }, [token]);

  const value = {
    // products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    removeFromCart,
    clearCart,
    navigate,
    backendUrl,
    setToken,
    token,
    loading,
    setLoading,

    // New checkout values
    createOrder,
    initializePayment,
    verifyPayment,
    checkout,
    orderProcessing,
    currentOrder,
    getPaymentStatus,
  };

  return (
    <>
      {loading && (
        <div id="Lfa-page-loading" className="blackrose-pageloading">
          <div className="blackrose-pageloading-inner">
            <img src={assets.logo} className="logo" alt="" />
          </div>
        </div>
      )}
      {/* <LoadingOverlay isLoading={loading} /> */}
      <ShopContext.Provider value={value}>
        {props.children}
      </ShopContext.Provider>
    </>
  );
};

export default ShopContextProvider;
