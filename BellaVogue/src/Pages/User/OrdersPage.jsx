import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-lg text-gray-600">🛒 No orders placed yet.</p>
          <a
            href="/products"
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Shop Now
          </a>
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
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 mb-1">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Date:</strong> {order.date}
              </p>

              <h4 className="font-semibold mb-2">Items:</h4>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="py-2 flex justify-between text-gray-700"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="font-bold text-lg mt-4 text-right">
                Total: ${Number(order.total || 0).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
