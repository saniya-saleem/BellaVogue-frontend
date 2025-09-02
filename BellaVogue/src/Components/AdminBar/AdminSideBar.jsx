import React, { useContext } from 'react'
import {Users,Package,ShoppingCart,BarChart3,LogOut,DollarSign,} from "lucide-react";
import { AuthContext } from '../../ContextAPI/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
 const {logout}=useContext(AuthContext)
 const navigate=useNavigate()

 const handleLogout=()=>{
    logout();
    navigate("/login")
 }
  return (
    <>
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
      </div>
    </>
  )
}

export default AdminSidebar