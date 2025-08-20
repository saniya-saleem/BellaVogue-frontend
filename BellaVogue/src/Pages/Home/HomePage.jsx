import React from "react";
import { ShoppingBag, Heart, Star, Sparkles } from "lucide-react";
import Navbar from "../../Components/Common/Navbar";




export default function HomePage() {
  const products = [
    { id: 1, name: "Elegant Necklace", price: "$49.99", img: "https://salty.co.in/cdn/shop/files/DazzlingBeehiveNecklace_1.png?v=1690709687&width=1800", rating: 4.5 },
    { id: 2, name: "Stylish Handbag", price: "$89.99", img: "https://via.placeholder.com/150", rating: 5 },
    { id: 3, name: "Luxury Watch", price: "$129.99", img: "https://via.placeholder.com/150", rating: 4 },
    { id: 4, name: "Trendy Earrings", price: "$29.99", img: "https://via.placeholder.com/150", rating: 4.7 },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Discover Your Perfect Style ✨
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Handpicked accessories to make you shine everyday!
        </p>
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="px-6 md:px-12 py-12">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-10">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-700">{product.name}</h4>
              <p className="text-pink-500 font-bold">{product.price}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
              <button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-xl font-medium shadow hover:shadow-lg transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white/70 backdrop-blur-md mt-12">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Bella Accessories. All rights reserved.
        </p>
        <p className="text-pink-500 text-sm mt-1 flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-pink-500" /> & <Sparkles className="w-4 h-4 text-purple-500" />
        </p>
      </footer>
    </div>
    </>

  );
}
