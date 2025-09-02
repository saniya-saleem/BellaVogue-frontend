import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-t border-indigo-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
      
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            BellaVogue
          </h2>
          <p className="text-gray-600 mt-3 text-sm">
            Elegant accessories that define your style.  
            Shop the latest trends in women’s jewelry & fashion.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><a href="/home" className="hover:text-indigo-600 transition">Home</a></li>
            <li><NavLink to="/products" className="hover:text-indigo-600 transition">Shop</NavLink></li>
            <li><a href="/wishlist" className="hover:text-indigo-600 transition">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-indigo-600 transition">Cart</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Support</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><a href="/about" className="hover:text-indigo-600 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-600 transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-indigo-600 transition">FAQs</a></li>
            <li><a href="/returns" className="hover:text-indigo-600 transition">Returns</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Get in Touch</h3>
          <ul className="mt-3 space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" /> support@bellavogue.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-indigo-600" /> +91 98765 43210
            </li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

     
      <div className="bg-white border-t border-gray-200 text-center py-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BellaVogue. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
