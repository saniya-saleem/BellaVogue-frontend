import React, { useContext } from "react";
import { Star } from "lucide-react";
import { WishlistContext } from "../../ContextAPI/WishlistContext";
import { CartContext } from "../../ContextAPI/CartContext";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <h2 className="text-center text-2xl mt-10">
          Your wishlist is empty !!
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>

        <div className="space-y-4">
          {wishlistItems.map((item) => {
            const outOfStock = item.product_stock === 0;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl p-4 shadow"
              >
                {/* PRODUCT INFO */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {item.product_name}
                    </h4>

                    <p className="text-indigo-600 font-bold">
                      ₹{item.product_price}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        4.5
                      </span>
                    </div>

                    <p className="text-sm mt-1">
                      {outOfStock ? (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          In Stock
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={async () => {
                      if (outOfStock) return;

                      try {
                        await addToCart({
                          product_id: item.product,
                        });

                        await removeFromWishlist(item.id);
                      } catch (err) {
                        alert(
                          err?.response?.data?.error ||
                            "Unable to add to cart"
                        );
                      }
                    }}
                    disabled={outOfStock}
                    className={`px-4 py-2 rounded-xl font-semibold transition ${
                      outOfStock
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {outOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
