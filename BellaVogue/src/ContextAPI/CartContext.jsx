import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const API_URL = "http://localhost:5000/users";

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    } else {
      setCartItems([]); // clear cart when logged out
    }
  }, [user]);   // 👈 re-run whenever user changes

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error("❌ Error fetching cart:", err.message);
      setCartItems([]);
    }
  };

  const addToCart = async (product) => {
    if (!user) return alert("Please login to add to cart");

    const exists = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    await axios.patch(`${API_URL}/${user.id}`, { cart: updatedCart });
    setCartItems(updatedCart);
  };

  const removeFromCart = async (id) => {
    if (!user) return;
    const updatedCart = cartItems.filter((item) => item.id !== id);
    await axios.patch(`${API_URL}/${user.id}`, { cart: updatedCart });
    setCartItems(updatedCart);
  };

  const updateQuantity = async (id, quantity) => {
    if (!user) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    await axios.patch(`${API_URL}/${user.id}`, { cart: updatedCart });
    setCartItems(updatedCart);
  };

  const clearCart = async () => {
    if (!user) return;
    await axios.patch(`${API_URL}/${user.id}`, { cart: [] });
    setCartItems([]);
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
