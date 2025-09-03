import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./ContextAPI/AuthContext";
import { CartProvider } from "./ContextAPI/CartContext";
import { WishlistProvider } from "./ContextAPI/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";//
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import HomePage from "./Pages/Home/HomePage";
import CartPage from "./Pages/User/CartPage";
import WishlistPage from "./Pages/User/WishlistPage";
import ProductsPage from "./Pages/User/Shop/products";
import CheckoutPage from "./Pages/CheckOut/CheckoutPage";
import OrdersPage from "./Pages/User/OrdersPage";
import ProductDetail from "./Pages/User/Shop/Productdetail";
import About from "./Pages/Home/About";//
import AdminDashboard from './Admin/AdminDashboard';
import AdminUserpage from "./Admin/AdminUserpage";
import AdminOrderpage from "./Admin/AdminOrderpage";
import AdminProductspage from "./Admin/AdminProductspage";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>

            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart"element={<CartPage />}/>
              <Route path="/wishlist"element={<WishlistPage />}/>
              <Route path="/checkout" element={<CheckoutPage />}/>
              <Route path="/order"element={<OrdersPage />}/>
                
              <Route path="/admin"element={<ProtectedRoute role="admin"> <AdminDashboard /> </ProtectedRoute>}/>
              <Route path="/users" element={<ProtectedRoute role="admin"><AdminUserpage /></ProtectedRoute>}/>
              <Route path="/aorders"element={<ProtectedRoute role="admin"> <AdminOrderpage /></ProtectedRoute>}/>
              <Route path="/product"element={<ProtectedRoute role="admin"><AdminProductspage /></ProtectedRoute>}/>
            </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
