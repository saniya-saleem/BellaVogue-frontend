import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../../../ContextAPI/CartContext";
import { WishlistContext } from "../../../ContextAPI/WishlistContext";
import Navbar from "../../../Components/Common/Navbar";
import Footer from "../../../Components/Common/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, isInCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  if (!product) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-12 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:underline"
        >
          Back to Products
        </button>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2 capitalize">{product.category}</p>

            <p className="text-2xl font-semibold text-indigo-600 mt-4">
              ${product.price}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {/* Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-lg shadow-md transition font-semibold ${
                  isInCart(product.id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? "In Cart" : "Add to Cart"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 rounded-lg shadow-md transition font-semibold ${
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {isInWishlist(product.id)
                  ? "Remove Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
