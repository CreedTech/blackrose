import { createContext, useEffect, useState } from 'react';
import { assets } from '../assets/images/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '£';
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addToCart = async (itemId, totalPrice, spiceLevel, size, protein) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    setLoading(true);
    try {
      // console.log(cartItems);
      let cartData = structuredClone(cartItems);
      // Create a string of protein names separated by commas
      const proteinNames = protein.map((p) => p.name).join(', ');

      // Generate a unique key for the combination of size, protein, and spiceLevel
      const selectionKey = `${size.size}-${proteinNames}-${spiceLevel}`;

      // Check if the item already exists in the cart
      if (cartData[itemId]) {
        // Check if the item with the same size, protein, and spiceLevel exists
        const existingSelection = cartData[itemId][selectionKey];

        if (existingSelection) {
          // If the same item exists, increase the quantity
          existingSelection.quantity += 1;
        } else {
          // If the item with selected options does not exist, add it
          cartData[itemId][selectionKey] = {
            quantity: 1,
            size,
            protein,
            spiceLevel,
            totalPrice,
          };
        }
      } else {
        // If the item is not in the cart, add it
        cartData[itemId] = {
          [selectionKey]: {
            quantity: 1,
            size,
            protein,
            spiceLevel,
            totalPrice,
          },
        };
      }

      // Update the cart state with new data
      setCartItems(cartData);

      toast.success('Item added to cart!');

      // If a token exists, sync with backend
      if (token) {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, totalPrice, spiceLevel, size, protein },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Hide the overlay
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    // Loop through cart items to calculate total count
    Object.keys(cartItems).forEach((itemId) => {
      Object.keys(cartItems[itemId]).forEach((selectionKey) => {
        const item = cartItems[itemId][selectionKey];
        totalCount += item.quantity; // sum of quantities
      });
    });

    return totalCount;
  };

  const updateQuantity = async (
    itemId,
    size,
    proteinName,
    spiceLevel,
    quantity,
    price
  ) => {
    let cartData = structuredClone(cartItems);
    const selectionKey = `${size}-${proteinName}-${spiceLevel}`;

    if (quantity === 0) {
      // Remove the item if quantity is 0
      if (cartData[itemId] && cartData[itemId][selectionKey]) {
        delete cartData[itemId][selectionKey];
      }

      // If no items are left for this itemId, delete the entire item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // If the item exists, update the quantity
      if (cartData[itemId] && cartData[itemId][selectionKey]) {
        cartData[itemId][selectionKey].quantity = quantity;
      } else {
        // If the item doesn't exist in the cart, add it
        cartData[itemId] = {
          [selectionKey]: {
            quantity,
            size,
            proteinName,
            spiceLevel,
            totalPrice: price * quantity, // Update totalPrice based on quantity
          },
        };
      }
    }

    // Update the cart state
    setCartItems(cartData);
    toast.success('Item Updated Successfully!');

    // If a token exists, sync with backend
    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, selectionKey, quantity, price },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // Loop through cart items to calculate total
    Object.keys(cartItems).forEach((itemId) => {
      Object.keys(cartItems[itemId]).forEach((selectionKey) => {
        const item = cartItems[itemId][selectionKey];
        totalAmount += item.totalPrice * item.quantity; // price * quantity
      });
    });

    return totalAmount;
  };

  const getProductsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getUserCart = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
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
    // if (token) {
    //   getUserCart(token);
    // }
  }, [token]);

  const value = {
    products,
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
    navigate,
    backendUrl,
    setToken,
    token,
    loading,
    setLoading,
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
