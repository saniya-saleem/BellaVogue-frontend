import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminBar/AdminSidebar";

export default function AdminOrderpage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateOrderStatus = async (orderId, currentStatus) => {
    let newStatus =
      currentStatus === "Pending"
        ? "Shipped"
        : currentStatus === "Shipped"
        ? "Delivered"
        : "Delivered";

    try {
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="w-64 h-screen fixed">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-6 py-3">{order.customer}</td>
                    <td className="px-6 py-3">{order.date}</td>
                    <td className="px-6 py-3">₹{order.amount}</td>
                    <td
                      className={`px-6 py-3 font-semibold ${
                        order.status === "Pending"
                          ? "text-yellow-600"
                          : order.status === "Shipped"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() =>
                          updateOrderStatus(order.id, order.status)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
