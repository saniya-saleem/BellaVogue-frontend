import React, { useContext } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { WishlistContext } from "../../ContextAPI/WishlistContext";
import { CartContext } from "../../ContextAPI/CartContext";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0)
    return <h2 className="text-center text-2xl mt-10">Your wishlist is empty !!</h2>;

  return (
    <>
    <Navbar/>
    <div className="px-6 md:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>
      <div className="space-y-4">
        {wishlistItems.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow">
            <div className="flex items-center gap-4">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={clearWishlist}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Clear Wishlist
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
