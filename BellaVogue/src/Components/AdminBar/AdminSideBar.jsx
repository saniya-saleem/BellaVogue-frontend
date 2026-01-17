// import React, { useContext } from 'react'
// import {Users,Package,ShoppingCart,BarChart3,LogOut,DollarSign,} from "lucide-react";
// import { AuthContext } from '../../ContextAPI/AuthContext'
// import { Link, useNavigate } from 'react-router-dom'

// const AdminSidebar = () => {
//  const {logout}=useContext(AuthContext)
//  const navigate=useNavigate()

//  const handleLogout=()=>{
//     logout();
//     navigate("/login")
//  }
//   return (
//     <>
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex">
//       <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//         <nav className="flex-1 space-y-2">
//           <Link
//             to="/admin"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
//           >
//             <BarChart3 className="h-5 w-5" /> Dashboard
//           </Link>
//           <Link
//             to="/users"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
//           >
//             <Users className="h-5 w-5" /> Users
//           </Link>
//           <Link
//             to="/product"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
//           >
//             <Package className="h-5 w-5" /> Products
//           </Link>
//           <Link
//             to="/aorders"
//             className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 hover:text-blue-700 transition"
//           >
//             <ShoppingCart className="h-5 w-5" /> Orders
//           </Link>
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 p-2 rounded hover:bg-red-100 hover:text-red-700 transition"
//         >
//           <LogOut className="h-5 w-5" /> Logout
//         </button>
//       </aside>
//       </div>
//     </>
//   )
// }

// export default AdminSidebar



import React, { useContext } from 'react'
import { Users, Package, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import { AuthContext } from '../../ContextAPI/AuthContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  const menuItems = [
    { path: '/admin', icon: BarChart3, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/product', icon: Package, label: 'Products' },
    { path: '/aorders', icon: ShoppingCart, label: 'Orders' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Admin Panel
        </h2>
        <p className="text-gray-500 text-sm mt-1">Manage your platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar