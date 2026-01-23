import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/login");
  };

  const handleLogin = () => {
    setShowUserMenu(false);
    navigate("/login");
  };

  // ✅ close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-900 bg-clip-text text-transparent">
          BellaVogue
        </h1>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <NavLink to="/home" className="hover:text-indigo-600">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-indigo-600">
            Shop
          </NavLink>
          <NavLink to="/about" className="hover:text-indigo-600">
            About
          </NavLink>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <NavLink to="/wishlist" className="relative">
            <Heart className="w-6 h-6 text-indigo-500" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-indigo-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {/* USER MENU */}
          <div ref={userMenuRef} className="relative">
            <button
              className="p-2 rounded-full active:bg-indigo-100"
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              <User className="w-6 h-6 text-indigo-700" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 md:right-0 max-md:left-1/2 max-md:-translate-x-1/2 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
                {user ? (
                  <>
                    <NavLink
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-2 py-1 hover:text-indigo-600"
                    >
                      📦 My Orders
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-2 py-1 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 w-full px-2 py-1 hover:text-indigo-600"
                  >
                    <LucideLogIn className="w-4 h-4" /> Login
                  </button>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
              setShowUserMenu(false);
            }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden bg-indigo-50 px-6 py-4 flex flex-col gap-4 shadow-lg">
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
