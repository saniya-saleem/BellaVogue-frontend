import React, { useContext } from "react";
import { CartContext } from "../../ContextAPI/CartContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.product_price) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <h3 className="text-center text-xl mt-10">
            Your cart is empty !!!
          </h3>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => {
                const price = Number(item.product_price);
                const lineTotal = price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row justify-between bg-white p-4 rounded-xl shadow"
                  >
                    <div>
                    <div className="flex items-center gap-4">
                    {/* ✅ PRODUCT IMAGE */}
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />

                    <div>
                      <h4 className="font-semibold text-lg">
                        {item.product_name}
                      </h4>

                      <p className="text-indigo-600 font-bold">
                        ${price.toFixed(2)} × {item.quantity} = $
                        {lineTotal.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.quantity === 1}
                          className="bg-gray-200 px-3 py-1 rounded"
                        >
                          −
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                          onClick={() => increaseQty(item.product)}
                          className="bg-gray-200 px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  </div>

                    <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center bg-white p-6 rounded-xl shadow">
              <h3 className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </h3>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
