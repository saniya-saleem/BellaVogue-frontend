import React, { useContext } from "react";
import {Users,Package,ShoppingCart,BarChart3,LogOut,DollarSign,} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextAPI/AuthContext";
import { motion } from "framer-motion";


export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, Admin 🎉</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Users</p>
              <Users className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">1,245</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Products</p>
              <Package className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">482</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Orders</p>
              <ShoppingCart className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">932</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">Revenue</p>
              <DollarSign className="h-6 w-6 opacity-80" />
            </div>
            <p className="text-2xl font-bold mt-2">$24,580</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
