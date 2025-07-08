import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // ✅ Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Add Order
  const addOrder = () => {
    const tempOrders = structuredClone(orders);
    const newOrder = [];

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          newOrder.push({
            _id: item,
            size,
            quantity: cartItems[item][size],
          });
        }
      }
    }

    setOrders([...tempOrders, ...newOrder]);
     setCartItems({}); // Optional: Clear cart after placing order
  };

  // ✅ Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      const productExists = products.find((product) => product._id === item);
      if (productExists) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        }
      }
    }
    return totalCount;
  };

  // ✅ Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
         { headers: { Authorization: `Bearer ${token}` } } 

        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  // ✅ Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const productInfo = products.find((product) => product._id === item);
      if (productInfo) {
        for (const size in cartItems[item]) {
          try {
            if (cartItems[item][size] > 0) {
              totalAmount += productInfo.price * cartItems[item][size];
            }
          } catch (error) {
            console.error("Error in calculating amount", error);
          }
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch All Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Fetch User Cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendUrl + "/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // 🔁 Load Products Initially
  useEffect(() => {
    getProductsData();
  }, []);

  // 🔁 Set token from localStorage and load user cart
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []);

  // 🧠 Context Value
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    addOrder,
    orders,
    navigate,
    backendUrl,
    token,
    setToken,
    getProductsData,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
