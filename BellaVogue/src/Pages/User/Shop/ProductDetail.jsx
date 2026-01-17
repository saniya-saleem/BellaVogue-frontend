import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/api";

import { CartContext } from "../../../ContextAPI/CartContext";
import { WishlistContext } from "../../../ContextAPI/WishlistContext";
import Navbar from "../../../Components/Common/Navbar";
import Footer from "../../../Components/Common/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, isInCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    API
      .get(`products/${id}/`)
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
    if (!product || product.stock === 0) return;
    addToCart(product);
  };

  if (!product) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-12 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:underline"
        >
          Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2 capitalize">{product.category?.name}</p>

            <p className="text-2xl font-semibold text-indigo-600 mt-4">
              ${product.price}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <p className="mt-4 text-lg">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-lg shadow-md transition font-semibold ${
                  isInCart(product.id) || product.stock === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                disabled={isInCart(product.id) || product.stock === 0}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : isInCart(product.id)
                  ? "In Cart"
                  : "Add to Cart"}
              </button>
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
