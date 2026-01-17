import API from "../../api/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-lg text-gray-600">🛒 No orders placed yet.</p>
          <Link
            to="/products"
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                  {order.status}
                </span>
              </div>

              <p><strong>Name:</strong> {order.customer}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p>
                <strong>City:</strong> {order.city}, {order.state} - {order.pincode}
              </p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p><strong>Address:</strong> {order.address}</p>

              <p className="text-sm text-gray-500 mt-2">
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              {/* ITEMS */}
              <h4 className="font-semibold mt-4 mb-2">Items:</h4>
              <ul className="divide-y divide-gray-200">
                {order.items?.length > 0 ? (
                  order.items.map((item) => (
                    <li
                      key={item.id}
                      className="py-2 flex justify-between"
                    >
                      <span>
                        {item.product_name} (x{item.quantity})
                      </span>
                      <span>
                        ₹{Number(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="py-2 text-gray-500 italic">
                    No items found
                  </li>
                )}
              </ul>

              <p className="font-bold text-lg mt-4 text-right">
                Total: ₹{Number(order.total).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    
    </>
  );
}
