import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserById,
  getUserOrders,
  toggleUserStatus,
} from "../api/adminApi";
import { Ban, CheckCircle, ArrowLeft } from "lucide-react";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserById(id).then((res) => setUser(res.data));
    getUserOrders(id).then((res) => setOrders(res.data));
  }, [id]);

  const handleToggleStatus = async () => {
    const res = await toggleUserStatus(id);
    setUser((prev) => ({
      ...prev,
      is_active: res.data.is_active,
    }));
  };

  if (!user) {
    return <div className="p-10 text-gray-500">Loading user details...</div>;
  }

  return (
    <div className="p-10 bg-slate-100 min-h-screen">
     
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft size={16} /> Back
      </button>

     
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          👤 User Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p>
            <b>Status:</b>{" "}
            {user.is_active ? (
              <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs inline-flex items-center gap-1">
                <CheckCircle size={14} /> Active
              </span>
            ) : (
              <span className="ml-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs inline-flex items-center gap-1">
                <Ban size={14} /> Blocked
              </span>
            )}
          </p>
        </div>

        <button
          onClick={handleToggleStatus}
          className={`mt-6 px-5 py-2 rounded-xl text-sm font-semibold text-white transition ${
            user.is_active
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {user.is_active ? "Block User" : "Unblock User"}
        </button>
      </div>

      {/* ORDERS SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🧾 Orders
        </h2>

        {orders.length > 0 ? (
          <table className="w-full text-sm overflow-hidden rounded-xl">
            <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4 text-gray-700">₹{order.total}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No orders found for this user</p>
        )}
      </div>
    </div>
  );
}
