import React from "react";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  isInCart,
  addToCart,
  isInWishlist,
  handleWishlistToggle,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-indigo-600 font-bold">${product.price}</p>
        <div className="flex items-center text-yellow-500 text-sm">
          <Star size={16} className="fill-yellow-500" />
          <span className="ml-1">{product.rating}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={isInCart(product.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              isInCart(product.id)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <ShoppingBag size={18} />
            {isInCart(product.id) ? "In Cart" : "Add to Cart"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleWishlistToggle(product);
            }}
            className={`p-2 rounded-full transition ${
              isInWishlist(product.id)
                ? "bg-pink-100 text-pink-500"
                : "bg-gray-100 text-gray-500 hover:text-pink-500"
            }`}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
