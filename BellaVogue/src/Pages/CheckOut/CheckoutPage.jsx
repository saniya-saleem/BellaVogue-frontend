import React, { useContext, useState } from "react";
import { CartContext } from "../../ContextAPI/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    payment: "COD",
  });

  const navigate = useNavigate();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handlePlaceOrder = async () => {
  const { name, email, phone, city, state, pincode, address } = formData;

  if (!name || !email || !phone || !city || !state || !pincode || !address) {
    toast.error("⚠️ Please fill in all required fields.");
    return;
  }

  const order = {
    id: "o" + Date.now(),
    customer: formData.name,
    amount: total,
    phone:formData.phone,
    city:formData.city,
    state:formData.state,
    pincode:formData.pincode,
    address: formData.address,
    payment:formData.payment,
    date: new Date().toISOString().split("T")[0],
    status: "Pending", // ✅ match OrdersPage casing
    items: cartItems,
    total: total,
  };

  try {
    await axios.post("http://localhost:5000/orders", order);

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    clearCart();
    toast.success("Order placed successfully!");
    setTimeout(() => {
      navigate("/order"); // ✅ make sure path matches your route
    }, 1200);
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("Failed to place order. Try again.");
  }
};
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 md:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <p>
                {item.name} (x{item.quantity})
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        )}
        <hr className="my-4" />
        <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg p-3"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border rounded-lg p-3"
          />

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Punjab">Punjab</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border rounded-lg p-3"
        />

        <div>
          <h4 className="font-semibold mb-2">Payment Method</h4>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="NetBanking">Net Banking</option>
          </select>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition w-full"
      >
        Place Order
      </button>
    </div>
  );
}
