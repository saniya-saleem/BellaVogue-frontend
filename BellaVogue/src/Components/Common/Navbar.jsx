// import React, { useContext } from "react";
// import { ShoppingBag, Heart, Menu, X, User, LogOut,LucideLogIn } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../ContextAPI/AuthContext";
// import { CartContext } from "../../ContextAPI/CartContext";
// import { WishlistContext } from "../../ContextAPI/WishlistContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const { user, logout,login } = useContext(AuthContext);
//   const { cartItems } = useContext(CartContext);
//   const { wishlistItems } = useContext(WishlistContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleLogin=()=>{
//    login();
//    navigate("/login")
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-900 bg-clip-text text-transparent">
//           BellaVogue
//         </h1>
//         <div className="hidden md:flex items-center gap-8">
//           <nav className="flex gap-8 text-gray-700 font-medium">
//             <NavLink to="/home" className="hover:text-indigo-600 transition">
//               Home
//             </NavLink>
//             <NavLink to="/products" className="hover:text-indigo-600 transition">
//               Shop
//             </NavLink>
//             <NavLink to="/about" className="hover:text-indigo-600 transition">
//               About
//             </NavLink>
//           </nav>
//         </div>
//         <div className="flex gap-5 items-center">
//         <NavLink to="/wishlist" className="relative">
//           <Heart className="w-6 h-6 text-indigo-500 cursor-pointer hover:scale-110 transition" />
//           {wishlistItems.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
//               {wishlistItems.length}
//             </span>
//           )}
//         </NavLink>
//         <NavLink to="/cart" className="relative">
//           <ShoppingBag className="w-6 h-6 text-indigo-700 cursor-pointer hover:scale-110 transition" />
//           {cartItems.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
//               {cartItems.length}
//             </span>
//           )}
//         </NavLink>

//           {user ? (
//             <div className="relative group">
//               <button className="flex items-center gap-1">
//                 <User className="w-6 h-6 text-indigo-700 cursor-pointer hover:scale-110 transition" />
//               </button>
//               <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition">
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 w-full text-gray-700 hover:text-indigo-600 transition"
//                 >
//                   <LogOut className="w-4 h-4" /> Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="relative group">
//               <button className="flex items-center gap-1">
//                 <User className="w-6 h-6 text-indigo-700 cursor-pointer hover:scale-110 transition" />
//               </button>
//               <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition">
//                 <button
//                   onClick={handleLogin}
//                   className="flex items-center gap-2 w-full text-gray-700 hover:text-indigo-600 transition"
//                 >
//                   <LucideLogIn className="w-4 h-4" /> Login
//                 </button>
//               </div>
//             </div>
           
//           )}
//           <button
//             className="md:hidden text-gray-700"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-r from-indigo-50 to-indigo-100 backdrop-blur-sm px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium shadow-lg">
//           <NavLink to="/home" className="hover:text-indigo-600 transition">
//             Home
//           </NavLink>
//           <NavLink to="/products" className="hover:text-indigo-600 transition">
//             Shop
//           </NavLink>
//           <NavLink to="/about" className="hover:text-indigo-600 transition">
//             About
//           </NavLink>
//           <NavLink to="/contact" className="hover:text-indigo-600 transition">
//             Contact
//           </NavLink>
//         </div>
//       )}
//     </header>
//   );
// }


import React, { useContext, useState } from "react";
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  LogOut,
  LucideLogIn,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextAPI/AuthContext";
import { CartContext } from "../../ContextAPI/CartContext";
import { WishlistContext } from "../../ContextAPI/WishlistContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-900 bg-clip-text text-transparent">
          BellaVogue
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-gray-700 font-medium">
            <NavLink to="/home" className="hover:text-indigo-600 transition">
              Home
            </NavLink>
            <NavLink to="/products" className="hover:text-indigo-600 transition">
              Shop
            </NavLink>
            <NavLink to="/about" className="hover:text-indigo-600 transition">
              About
            </NavLink>
          </nav>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex gap-5 items-center">
          {/* Wishlist */}
          <NavLink to="/wishlist" className="relative">
            <Heart className="w-6 h-6 text-indigo-500 hover:scale-110 transition" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {wishlistItems.length}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-indigo-700 hover:scale-110 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {/* USER DROPDOWN */}
          {user ? (
            <div className="relative group">
              <User className="w-6 h-6 text-indigo-700 cursor-pointer hover:scale-110 transition" />

              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition">
                <NavLink
                  to="/orders"
                  className="block px-2 py-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  📦 My Orders
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-2 py-1 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <User className="w-6 h-6 text-indigo-700 cursor-pointer hover:scale-110 transition" />

              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 w-full px-2 py-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  <LucideLogIn className="w-4 h-4" /> Login
                </button>
              </div>
            </div>
          )}

          {/* MOBILE MENU */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium shadow-lg">
          <NavLink to="/home" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
          {user && (
            <NavLink to="/orders" onClick={() => setIsOpen(false)}>
              My Orders
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
