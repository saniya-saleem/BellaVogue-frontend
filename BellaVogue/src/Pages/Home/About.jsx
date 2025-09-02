import React from "react";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";

export default function About() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 md:px-12 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6">About BellaVogue</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-indigo-600">BellaVogue</span> – 
          your ultimate destination for elegant and timeless fashion accessories.  
          Our mission is to bring you high-quality jewelry and lifestyle products 
          that complement your style and add a touch of sophistication to your everyday look.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          From <span className="font-medium">earrings, rings, watches, bracelets, necklaces, and clips</span>, 
          every piece in our collection is carefully curated to ensure a blend of beauty and durability.  
          Whether you’re looking for a gift or treating yourself, BellaVogue has something special for everyone.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To inspire confidence and elegance through timeless accessories that never go out of style.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              Deliver premium quality products at affordable prices while ensuring exceptional customer service.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Quality, trust, and customer satisfaction are at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
