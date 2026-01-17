import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

 
  const fetchCart = async () => {
    try {
      const res = await API.get("cart/");
      setCartItems(res.data);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  // 🔹 Add to cart
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      await API.post("cart/add/", { product_id: product.id });
      fetchCart();
      toast.success("🛒 Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

 
  const increaseQty = async (productId) => {
    try {
      await API.post("cart/add/", { product_id: productId });
      fetchCart();
      toast.info("Quantity increased");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };


  const decreaseQty = async (cartItemId) => {
    try {
      await API.post(`cart/decrease/${cartItemId}/`);
      fetchCart();
      toast.info("Quantity decreased");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };


  const removeFromCart = async (cartItemId) => {
    try {
      await API.delete(`cart/remove/${cartItemId}/`);
      fetchCart();
      toast.warn("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };


  const clearCart = async () => {
    try {
      await API.delete("cart/clear/");
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };


  const isInCart = (productId) =>
    cartItems.some((item) => item.product === productId);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
