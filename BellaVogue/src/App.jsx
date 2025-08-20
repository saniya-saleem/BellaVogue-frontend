import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import HomePage from "./Pages/Home/HomePage";
import Navbar from "./Components/Common/Navbar";
// import CartPage from "./Pages/User/CartPage";


export default function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/home" element={<HomePage />} />
         <Route path="/navbar" element={<Navbar/>}/>
         {/* <Route path="/cart" element={<CartPage/>}/> */}
         


      </Routes>
    </Router>
  );
}
