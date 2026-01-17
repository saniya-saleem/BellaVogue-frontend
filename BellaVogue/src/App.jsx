import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// CONTEXT
import { AuthProvider } from "./ContextAPI/AuthContext";
import { CartProvider } from "./ContextAPI/CartContext";
import { WishlistProvider } from "./ContextAPI/WishlistContext";

// TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AUTH
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";

// HOME
import HomePage from "./Pages/Home/HomePage";
import About from "./Pages/Home/About";

// USER
import CartPage from "./Pages/User/CartPage";
import WishlistPage from "./Pages/User/WishlistPage";
import OrdersPage from "./Pages/User/OrdersPage";

// SHOP  ✅ lowercase products (VERY IMPORTANT)
import ProductsPage from "./Pages/User/Shop/products";
import ProductDetail from "./Pages/User/Shop/ProductDetail";

// CHECKOUT
import CheckoutPage from "./Pages/CheckOut/CheckoutPage";

// ADMIN
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUserpage from "./Admin/AdminUserpage";
import AdminOrderpage from "./Admin/AdminOrderpage";
import AdminProductspage from "./Admin/AdminProductspage";
import AdminUserDetail from "./Admin/AdminUserDetail";

// COMMON
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar />

            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* AUTH */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* HOME */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<About />} />

              {/* SHOP */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              {/* USER */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />

              {/* ADMIN */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute role="admin">
                    <AdminUserpage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/aorders"
                element={
                  <ProtectedRoute role="admin">
                    <AdminOrderpage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product"
                element={
                  <ProtectedRoute role="admin">
                    <AdminProductspage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users/:id"
                element={
                  <ProtectedRoute role="admin">
                    <AdminUserDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <ToastContainer position="top-center" autoClose={3000} />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
