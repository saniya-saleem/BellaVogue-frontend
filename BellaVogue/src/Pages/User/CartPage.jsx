import React, { useContext } from "react";
import { CartContext } from "../../ContextAPI/CartContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 md:px-12 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <h3 className="text-center text-xl mt-10">Your cart is empty !!!</h3>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => {
                const price = Number(item.price) || 0; 
                const lineTotal = price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4 w-full md:w-2/3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-indigo-600 font-bold mt-1">
                          ${price.toFixed(2)} x {item.quantity} = $
                          {lineTotal.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition mt-4 md:mt-0"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow gap-4">
              <h3 className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </h3>

              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
