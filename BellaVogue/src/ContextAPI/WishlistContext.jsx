import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);  
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);
    } else {
      setWishlistItems([]);
    }
  }, [user]);   

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = (product) => {
    if (!user) {
      alert("Please login to add items to wishlist");
      return;
    }
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    if (!user) return;
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    if (!user) return;
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
