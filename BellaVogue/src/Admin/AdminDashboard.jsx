import React, { useContext, useEffect, useState } from "react";
import { Users, Package, ShoppingCart, BarChart3, LogOut, DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextAPI/AuthContext";
import { motion } from "framer-motion";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,LineElement,PointElement,} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,LineElement,PointElement);

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const categoryCounts = products.reduce((acc, prod) => {
    acc[prod.category] = (acc[prod.category] || 0) + 1;
    return acc;
  }, {});
  const productCategoryData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Products by Category",
        data: Object.values(categoryCounts),
        backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#facc15"],
      },
    ],
  };
  const ordersByDate = orders.reduce((acc, order) => {
    acc[order.date] = (acc[order.date] || 0) + order.amount;
    return acc;
  }, {});
  const ordersOverTimeData = {
    labels: Object.keys(ordersByDate),
    datasets: [
      {
        label: "Revenue Over Time",
        data: Object.values(ordersByDate),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.5)",
      },
    ],
  };
  const blockedUsers = users.filter(u => u.status === "blocked").length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const userStatusData = {
    labels: ["Active Users", "Blocked Users"],
    datasets: [
      {
        label: "Users",
        data: [activeUsers, blockedUsers],
        backgroundColor: ["#10b981", "#f87171"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col fixed h-screen">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <BarChart3 className="h-5 w-5" /> Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <Users className="h-5 w-5" /> Users
          </Link>
          <Link
            to="/product"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <Package className="h-5 w-5" /> Products
          </Link>
          <Link
            to="/aorders"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <ShoppingCart className="h-5 w-5" /> Orders
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded hover:bg-red-100 hover:text-red-700 transition"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
        {/* sidebar */}
      </aside>
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6">Welcome, Admin 🎉</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Users</p>
              <Users className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">{users.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Products</p>
              <Package className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">{products.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Orders</p>
              <ShoppingCart className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">{orders.length}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Revenue</p>
              <DollarSign className="h-6 w-6 opacity-80" />
            </div>
           <p className="text-2xl font-bold mt-2">
           ${orders.reduce((sum, o) => sum + Number(o.amount || 0), 0).toFixed(2)}
          </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Products by Category</h2>
            <div className="h-56"> {/* medium size */}
              <Pie data={productCategoryData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Revenue Over Time</h2>
            <div className="h-56">
              <Line data={ordersOverTimeData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">User Status</h2>
            <div className="h-56">
              <Doughnut data={userStatusData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
