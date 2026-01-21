import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

 
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);


  const fetchWishlist = async () => {
    try {
      const res = await API.get("/api/wishlist/");
      setWishlistItems(res.data);
    } catch (error) {
      console.error("Fetch wishlist error:", error);
      setWishlistItems([]);
    }
  };

 
  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add wishlist");
      return;
    }

    try {
      await API.post("/api/wishlist/add/", {
        product_id: product.id,
      });
      fetchWishlist();
      toast.success("❤️ Added to wishlist!");
    } catch (error) {
      toast.info("Already in wishlist");
    }
  };

  
  const removeFromWishlist = async (wishlistItemId) => {
    try {
      await API.delete(`/api/wishlist/remove/${wishlistItemId}/`);
      fetchWishlist();
      toast.warn("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove wishlist item");
    }
  };

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.product === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
