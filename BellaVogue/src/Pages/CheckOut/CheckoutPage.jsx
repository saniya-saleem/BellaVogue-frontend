import React, { useState, useContext } from "react";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  User,
  Home,
} from "lucide-react";
import { CartContext } from "../../ContextAPI/CartContext";
import Navbar from "../../Components/Common/Navbar";
import { toast } from "react-toastify";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

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

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const validateForm = () => {
    const { name, email, phone, city, state, pincode, address } = formData;

    if (!name || !email || !phone || !city || !state || !pincode || !address) {
      toast.error("⚠️ Please fill all required fields");
      return false;
    }

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
  if (!validateForm()) return;

  try {
    await API.post("checkout/", {
      ...formData,
      payment_method: "COD",
      items: cartItems,
    });

    await clearCart(); 
    toast.success("Order placed successfully!");

    navigate("/orders"); 

  } catch (err) {
    console.error("ORDER ERROR:", err);
    toast.error("Order failed");
  }
};



  const handleRazorpay = async () => {
  if (!validateForm()) return;

  try {
    const res = await API.post("razorpay/order/", {
      amount: Math.round(total * 100),
    });

    const options = {
      key: res.data.key,
      amount: res.data.amount,
      currency: "INR",
      order_id: res.data.razorpay_order_id, 

      handler: async function (response) {
        try {
          await API.post("razorpay/verify/", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          await API.post("checkout/", {
            ...formData,
            payment_method: "RAZORPAY",
            razorpay_payment_id: response.razorpay_payment_id,
            items: cartItems,
          });

          await clearCart();
          toast.success("Payment successful!");
          navigate("/orders");

        } catch (err) {
          console.error("VERIFY ERROR:", err.response?.data || err);
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("RAZORPAY ERROR:", err.response?.data || err);
    toast.error("Payment failed");
  }
};



  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            
            <div className="lg:col-span-2 space-y-6">

              
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-blue-600" />
                  <h2 className="text-2xl font-semibold">Shipping Details</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name"
                      className="w-full pl-11 py-3 border rounded-lg" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                        className="w-full pl-11 py-3 border rounded-lg" />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone"
                        className="w-full pl-11 py-3 border rounded-lg" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City"
                      className="w-full px-4 py-3 border rounded-lg" />
                    <input name="state" value={formData.state} onChange={handleChange} placeholder="State"
                      className="w-full px-4 py-3 border rounded-lg" />
                    <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode"
                      className="w-full px-4 py-3 border rounded-lg" />
                  </div>

                  <div className="relative">
                    <Home className="absolute left-3 top-3 text-gray-400" />
                    <textarea name="address" value={formData.address} onChange={handleChange}
                      placeholder="House no., Street, Landmark"
                      className="w-full pl-11 py-3 border rounded-lg resize-none" />
                  </div>
                </div>
              </div>

              
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-purple-600" />
                  <h2 className="text-2xl font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                    <input type="radio" name="payment" value="COD"
                      checked={formData.payment === "COD"} onChange={handleChange} />
                    <span className="ml-4">Cash on Delivery</span>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                    <input type="radio" name="payment" value="RAZORPAY"
                      checked={formData.payment === "RAZORPAY"} onChange={handleChange} />
                    <span className="ml-4">UPI / Razorpay</span>
                  </label>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="text-green-600" />
                <h2 className="text-2xl font-semibold">Order Summary</h2>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between mb-3 border-b pb-3">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p>₹{item.product_price * item.quantity}</p>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {formData.payment === "COD" ? (
                <button onClick={handlePlaceOrder}
                  className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg">
                  Place Order
                </button>
              ) : (
                <button onClick={handleRazorpay}
                  className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-lg">
                  Proceed to Payment
                </button>
              )}

              <p className="text-xs text-center mt-4">🔒 Secure checkout</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
