import React, { useState } from "react";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Rose Gold Bracelet", price: 950, img: "https://via.placeholder.com/80" },
    { id: 2, name: "Silver Anklet", price: 500, img: "https://via.placeholder.com/80" },
    { id: 3, name: "Emerald Earrings", price: 1500, img: "https://via.placeholder.com/80" },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-pink-600 flex items-center gap-2">
        <Heart className="w-7 h-7 text-pink-500" /> My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-lg">Your wishlist is empty 💔</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition">
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
